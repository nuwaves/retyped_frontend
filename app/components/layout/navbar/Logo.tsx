import Link from 'next/link';

const styles = {
  logo: "flex-shrink-0 font-bold text-[18px] leading-[115%] tracking-normal align-middle lining-nums proportional-nums"
};

export default function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      RETYPED
    </Link>
  );
}