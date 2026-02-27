/**
 * Centralized FontAwesome icon exports
 * Only includes icons actually used in the application to minimize bundle size
 */

// Export icon type
export type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Solid icons
export {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowUpFromBracket,
  faBookmark,
  faCalendar,
  faCaretDown,
  faChartLine,
  faCheckCircle,
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
  faSpinner,
  faStar,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

// Regular icons - export with "Regular" suffix to avoid naming conflicts
export {
  faBookmark as faBookmarkRegular,
  faClock as faClockRegular,
  faHeart as faHeartRegular,
  faUser as faUserRegular,
} from '@fortawesome/free-regular-svg-icons';

// Brand icons
export {
  faFacebook,
  faGoogle,
  faInstagram,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
