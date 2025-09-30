interface AuthHeroProps {
  title: string;
  description: string;
}

const styles = {
  container: "hidden lg:block flex-1",
  title: "font-medium text-gray-900 mb-4 text-[24.25px] leading-[31.5px]",
  description: "text-gray-600 font-normal text-[14.94px] leading-[24.5px]"
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