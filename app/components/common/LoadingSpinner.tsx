const styles = {
  container: "flex justify-center items-center py-8",
  spinner: "animate-spin rounded-full h-8 w-8 border-b-2 border-black"
};

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
}