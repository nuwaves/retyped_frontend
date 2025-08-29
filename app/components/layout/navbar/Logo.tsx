import Link from 'next/link';

const styles = {
  logo: "flex-shrink-0 font-inter font-bold text-[18px] leading-[115%] tracking-normal align-middle tabular-nums lining-nums"
};

export default function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      RETYPED
    </Link>
  );
}