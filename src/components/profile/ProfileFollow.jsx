import styles from '../../styles/profile/profileFollow.module.css'

export default function ProfileFollow({headerText,itemsList,closeFollowWindow}) {
    
  return (
    <div className={styles.container}>
        <div>
            <h1 className={styles.headerText}>{headerText}</h1>
        </div>
        <div className={styles.listContainer}>
            {itemsList?.map(item => (
                <div className={styles.itemContainer} key={item._id}>
                    <div className={styles.imageContainer}>
                        <img src="https://i.pinimg.com/736x/55/33/5c/55335c708ac05d8f469894d08e2671fa.jpg" alt="" />
                    </div>
                    <h2 className={styles.username}>{item?.username}</h2>
                </div>
            ))}
        </div>
        <i className={`far fa-window-close ${styles.closeIcon}`} onClick={closeFollowWindow}></i>
    </div>
  )
}