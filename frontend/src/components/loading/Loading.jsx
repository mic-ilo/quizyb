import LoadingBee from "../../assets/bee-loading.gif";
import styles from "./loading.module.css";

export default function Loading({ message = "" }) {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.loadingContainer}>
          <img
            src={LoadingBee}
            alt="loading bee"
            className={styles.loadingBee}
          />
          <p className={styles.message}>{message}</p>
        </div>
      </div>
    </>
  );
}
