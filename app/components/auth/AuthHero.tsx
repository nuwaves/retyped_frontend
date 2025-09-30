interface AuthHeroProps {
  title: string;
  description: string;
}

const styles = {
  container: "hidden lg:block flex-1",
  title: "font-medium text-gray-900 mb-4 text-2xl leading-8",
  description: "text-gray-600 text-sm leading-6"
};

export default function AuthHero({ title, description }: AuthHeroProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {title}
      </h1>
      <p className={styles.description}>
        {description}
      </p>
    </div>
  );
}