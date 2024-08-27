import styles from "../../../styles/smallPieces/loader.module.css";

export default function Loader1() {
  return (

    <div className={styles.loader}>
    <span className={styles.loaderText}>loading</span>
      <span className={styles.load}></span>
  </div>

  )
}
