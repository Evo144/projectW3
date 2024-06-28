import axiosInstance, { setAccessToken } from '../../axiosInstance';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const logoutHandler = async () => {
    const res = await axiosInstance(`${import.meta.env.VITE_API}/auth/logout`);

    if (res.status === 200) {
      setUser(null);
      setAccessToken('');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Link className={styles.homeLink} to='/'>Home</Link>
      </div>
      <div className={styles.right}>
        {user?.username ? (
          <>
            <Link className={styles.profileLink}  to='/profile'>{user.username}</Link>
            <Link className={styles.logoutLink} onClick={logoutHandler}>Logout</Link>
          </>
        ) : (
          <>
            <Link className={`${styles.signinLink} ${styles['signin-signup-link']}`} to='/signin'>Signin</Link>
            <Link className={`${styles.signupLink} ${styles['signin-signup-link']}`} to='/signup'>Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}
