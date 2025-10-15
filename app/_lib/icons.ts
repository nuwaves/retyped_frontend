/**
 * Centralized FontAwesome icon exports
 * Only includes icons actually used in the application to minimize bundle size
 */

// Export icon type
export type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Solid icons (19 total)
export {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowUpFromBracket,
  faBookmark,
  faCalendar,
  faChartLine,
  faClock,
  faClockRotateLeft,
  faFileAlt,
  faHeart,
  faHeadphones,
  faLock,
  faMicrophone,
  faPause,
  faPen,
  faPlay,
  faQuoteLeft,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

// Regular icons (4 total) - export with "Regular" suffix to avoid naming conflicts
export {
  faBookmark as faBookmarkRegular,
  faClock as faClockRegular,
  faHeart as faHeartRegular,
  faUser as faUserRegular,
} from '@fortawesome/free-regular-svg-icons';

// Brand icons (4 total)
export {
  faFacebook,
  faGoogle,
  faInstagram,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
