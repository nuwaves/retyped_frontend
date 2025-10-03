const styles = {
  container: "hidden lg:block flex-1",
  title: "font-medium text-gray-900 mb-4 text-2xl leading-8",
  description: "text-gray-600 text-sm leading-6"
};

export default function LoginHero() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Discover amazing podcasts
      </h1>
      <p className={styles.description}>
        Sign in to access your personal library, transcript highlights, and 
        continue discovering amazing podcast content.
      </p>
    </div>
  );
}