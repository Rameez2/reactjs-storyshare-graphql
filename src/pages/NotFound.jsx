import styles from "../styles/pageNotFound.module.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={styles.pageNotFound}>
      <div>
        <h1>"This page is like a unicorn – it doesn't exist! 🦄"</h1>
        <p>It seems like you've discovered a mythical realm where this page just doesn’t exist.
           🦄✨ Don’t worry, though – the rest of our site is full of amazing content that’s definitely not made up.
            🧙‍♂️🌟 Use the navigation above or check out the links below to find your way back to
           something magical. 🗺️🔮</p>
      </div>
      <div className={styles.loaderContainer}>
        <span className={styles.loader}></span>
      </div>
           <p className={styles.toHome}>"Feeling lost? 🧭 Head back home and start your adventure anew! 🏠✨ <Link to="/">Return to Home</Link></p>
    </div>
  )
}
