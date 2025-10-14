'use client';

import { useCallback } from 'react';
import { useAppSelector } from '@/app/_store/hooks';
import {
  useCreateFollowMutation,
  useDeleteFollowMutation,
} from '@/app/_store/services/followsApi';
import {
  selectIsFollowing,
  selectFollowId,
  addFollowToMap,
  removeFollowFromMap,
} from '@/app/_store/features/follows/followsSlice';
import { selectIsAuthenticated } from '@/app/_store/features/auth/authSlice';
import { useDispatch } from 'react-redux';

export function useFollow(entity_type: 'tag' | 'podcast', entity_id: number) {
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isFollowing = useAppSelector((state) =>
    selectIsFollowing(state, entity_type, entity_id)
  );
  const followId = useAppSelector((state) =>
    selectFollowId(state, entity_type, entity_id)
  );

  const [createFollow, { isLoading: isCreating }] = useCreateFollowMutation();
  const [deleteFollow, { isLoading: isDeleting }] = useDeleteFollowMutation();

  const toggleFollow = useCallback(async () => {
    if (!isAuthenticated) {
      window.location.href = '/auth';
      return;
    }

    try {
      if (isFollowing && followId) {
        await deleteFollow(followId).unwrap();
        dispatch(removeFollowFromMap({ entity_type, entity_id }));
      } else {
        const result = await createFollow({ entity_type, entity_id }).unwrap();
        dispatch(addFollowToMap({ entity_type, entity_id, follow_id: result.id }));
      }
    } catch (error) {
      console.error('Follow toggle failed:', error);
      // Could add toast notification here
    }
  }, [
    isAuthenticated,
    isFollowing,
    followId,
    entity_type,
    entity_id,
    createFollow,
    deleteFollow,
    dispatch,
  ]);

  return {
    isFollowing,
    toggleFollow,
    isLoading: isCreating || isDeleting,
    isAuthenticated,
  };
}
