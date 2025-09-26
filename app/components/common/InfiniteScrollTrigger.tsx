interface InfiniteScrollTriggerProps {
  triggerRef: (node: HTMLElement | null) => void;
}

const styles = {
  trigger: "h-10 w-full"
};

export default function InfiniteScrollTrigger({ triggerRef }: InfiniteScrollTriggerProps) {
  return <div ref={triggerRef} className={styles.trigger} />;
}