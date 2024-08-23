import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
<footer className={styles.footer}>
    <div className={styles.footerContent}>
        <p className={styles.footerText}>
            &copy; 2024 StoryShare. All rights reserved.
        </p>
        <div className={styles.footerLinks}>
            <a href="/about" className={styles.footerLink}>About Us</a>
            <a href="/contact" className={styles.footerLink}>Contact</a>
            <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
        </div>
    </div>
</footer>

  )
}
