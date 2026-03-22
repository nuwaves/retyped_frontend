import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Retyped',
  description: 'Read the Retyped privacy policy — how we collect, use, and protect your data when you use our podcast discovery and summary service.',
  openGraph: {
    title: 'Privacy Policy - Retyped',
    description: 'Read the Retyped privacy policy — how we collect, use, and protect your data when you use our podcast discovery and summary service.',
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Retyped' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Retyped',
    description: 'Read the Retyped privacy policy — how we collect, use, and protect your data when you use our podcast discovery and summary service.',
  },
};

const styles = {
  container: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16',
  title: 'text-3xl font-bold mb-3 text-gray-900',
  subtitle: 'text-sm text-gray-500 mb-12',
  section: 'mb-12',
  sectionTitle: 'text-xl font-bold mb-4 text-gray-900',
  subsectionTitle: 'text-lg font-semibold mb-3 mt-6 text-gray-800',
  paragraph: 'text-gray-600 mb-4 leading-relaxed text-base',
  list: 'list-disc pl-6 mb-4 text-gray-600 space-y-2',
  listItem: 'leading-relaxed',
};

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Retyped Privacy Policy</h1>
      <p className={styles.subtitle}>Last Updated: October 9, 2025</p>

      <p className={styles.paragraph}>
        Retyped.xyz ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Information We Collect</h2>

        <h3 className={styles.subsectionTitle}>a. Information You Provide</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>Email address and other contact info (e.g., via forms or account registration)</li>
          <li className={styles.listItem}>Messages or content submitted via chat or other user input</li>
        </ul>

        <h3 className={styles.subsectionTitle}>b. Automatically Collected Data</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>IP address, browser type, OS, referring URLs</li>
          <li className={styles.listItem}>Usage data (e.g., page views, time on site)</li>
          <li className={styles.listItem}>Cookies and similar technologies</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
        <p className={styles.paragraph}>We use your data to:</p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Provide and improve our services</li>
          <li className={styles.listItem}>Communicate with you (e.g., updates, support)</li>
          <li className={styles.listItem}>Analyze site usage and enhance performance</li>
          <li className={styles.listItem}>Ensure security and prevent abuse</li>
        </ul>
        <p className={styles.paragraph}>
          <strong>We do not sell your personal data.</strong>
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Sharing of Information</h2>
        <p className={styles.paragraph}>We may share information with:</p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Trusted service providers under confidentiality agreements (e.g., hosting, analytics)</li>
          <li className={styles.listItem}>Legal authorities if required by law or to protect our rights</li>
          <li className={styles.listItem}>Other users if you explicitly choose to share data (e.g., in public forums or chat)</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Your Rights & Choices</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Access/Correction:</strong> Contact us to review or update your data</li>
          <li className={styles.listItem}><strong>Opt-Out:</strong> You may unsubscribe from communications at any time</li>
          <li className={styles.listItem}><strong>Cookies:</strong> You can control cookie settings in your browser</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Data Retention</h2>
        <p className={styles.paragraph}>
          We retain personal data only as long as needed for its purpose or as required by law.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Security</h2>
        <p className={styles.paragraph}>
          We implement reasonable measures to protect your information but cannot guarantee absolute security.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Children's Privacy</h2>
        <p className={styles.paragraph}>
          Our services are not intended for children under 13. We do not knowingly collect data from them.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>8. International Users</h2>
        <p className={styles.paragraph}>
          By using our services, you consent to your data being transferred to and processed in the United States.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>9. Changes to This Policy</h2>
        <p className={styles.paragraph}>
          We may update this policy. Material changes will be announced via the site or email.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>10. Contact</h2>
        <p className={styles.paragraph}>
          For questions, contact us at: <a href="mailto:support@nuwaves.xyz" className="text-blue-600 hover:underline">support@nuwaves.xyz</a>
        </p>
      </section>
    </div>
  );
}
