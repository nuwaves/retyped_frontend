import Link from 'next/link';
import Logo from './navbar/Logo';

const styles = {
  footer: "border-t border-gray-200",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 lg:pt-16 lg:pb-12",
  wrapper: "flex flex-col sm:flex-row gap-12 lg:gap-24",
  brandSection: "flex-1 max-w-xs",
  brandDescription: "text-[14px] leading-[22px] font-normal text-gray-600 mt-4",
  navTitle: "sr-only",
  sectionTitle: "text-sm font-normal mb-4",
  linksList: "space-y-2",
  link: "text-sm text-gray-600 hover:text-gray-900"
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h2 className={styles.navTitle}>Site Navigation</h2>
        <div className={styles.wrapper}>
          <div className={styles.brandSection}>
            <Logo />
            <p className={styles.brandDescription}>
              {`(Dummy Text) Discover, listen, and connect with the stories that matter. Explore the world's best podcasts`}
            </p>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>Legal</h3>
            <ul className={styles.linksList}>
              <li>
                <Link href="/privacy" className={styles.link}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.link}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className={styles.link}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={styles.sectionTitle}>About Us</h3>
            <ul className={styles.linksList}>
              <li>
                <Link href="/categories" className={styles.link}>
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/library" className={styles.link}>
                  My Library
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;