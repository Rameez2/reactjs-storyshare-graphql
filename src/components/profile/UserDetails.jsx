import styles from "../../styles/profile/userDetails.module.css";

export default function UserDetails({user}) {

  return (
    <>
    {user ?
      <>
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
      <button>Edit</button>
        </table>
    </>
    :
    <></>  
  }
    </>
  )
}
