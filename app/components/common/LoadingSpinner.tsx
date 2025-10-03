const styles = {
  container: "flex justify-center items-center py-8",
  dotsWrapper: "flex justify-center items-center space-x-2"
};

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.dotsWrapper}>
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
}