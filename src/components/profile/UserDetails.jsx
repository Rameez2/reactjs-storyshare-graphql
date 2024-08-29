import styles from "../../styles/profile/userDetails.module.css";
import { useState } from "react";
import ProfileFollow from "./ProfileFollow";

export default function UserDetails({user}) {
    const [followWindow,setFollowWindow] = useState(null);
  const currentUser = localStorage.getItem("userId");

  function openFollowWindow(windowText) {
      setFollowWindow(windowText);
  }
  function closeFollowWindow() {
    setFollowWindow(null);
  }
  return (
    <>
    {user ?
      <div className={styles.container}>
        <table className={styles.userTable}>
        <tbody>
          <tr>
            <td className={styles.staticCell} onClick={() => openFollowWindow('Followers')}>Followers:</td>
            <td>{user?.followers?.length}</td>
          </tr>
          <tr>
            <td className={styles.staticCell} onClick={() => openFollowWindow('Followings')}>Followings:</td>
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
        {followWindow ? <ProfileFollow headerText="Followings" itemsList={followWindow === 'Followings' ? user.followings : user.followers} closeFollowWindow={closeFollowWindow} /> : null}
      </div>
    :
    <></>  
  }
    </>
  )
}
