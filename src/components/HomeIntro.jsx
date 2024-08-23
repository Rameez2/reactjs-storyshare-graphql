import styles from "../styles/homeintro.module.css";

export default function HomeIntro() {
    return (
        <div className={styles.homeIntroContainer}>
            <div className={styles.firstdiv}>
                <h2>Welcome to StoryShare!</h2>
            </div>
            <div>
                <p>Discover a world of stories shared by our community. Whether you are looking for inspiration, moral lessons, or just a good read, you'll find it here. Dive into the stories and feel free to share your own experiences. Happy reading!</p>
            </div>
        </div>
    )
}
