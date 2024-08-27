import styles from "../../styles/profile/userDetails.module.css";

export default function UserDetails({user}) {
  const currentUser = localStorage.getItem("userId");
  return (
    <>
    {user ?
      <div className={styles.container}>
        <table className={styles.userTable}>
        <tbody>
          <tr>
            <td className={styles.staticCell}>Followers:</td>
            <td>{user?.followers?.length}</td>
          </tr>
          <tr>
            <td className={styles.staticCell}>Followings:</td>
            <td>{user?.followings?.length}</td>
          </tr>
          <tr>
            <td className={styles.staticCell}>Username:</td>
            <td>{user?.username}</td>
          </tr>
          <tr>
            <td className={styles.staticCell}>Email:</td>
            <td>{user?.email}</td>
          </tr>
        </tbody>
        </table>
        {currentUser === user._id && <button>Edit</button>}
        <img className={styles.profileImage} src="https://e0.pxfuel.com/wallpapers/114/1012/desktop-wallpaper-general-assassin-s-creed-star-wars-kylo-ren-thumbnail.jpg" alt="" />
      </div>
    :
    <></>  
  }
    </>
  )
}
