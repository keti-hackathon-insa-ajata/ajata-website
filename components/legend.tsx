import styles from '../styles/Legend.module.css';

export default function Legend() {
  return (
    <div className={styles.container}>
      <iframe
        src={'https://www.cyclosm.org/legend.html'}
        className={styles.frame}
      ></iframe>
    </div>
  );
}
