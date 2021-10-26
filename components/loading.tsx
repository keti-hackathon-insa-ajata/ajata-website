import styles from '../styles/Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <p className={styles.content}>Loading...</p>
    </div>
  );
}
