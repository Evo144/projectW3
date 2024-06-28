import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './SigninPage.module.css';

export default function SigninPage({ setUser }) {
  return (
    <div className={styles.wrapper}>
      <AuthForm title='Signin' type='signin' setUser={setUser} />
    </div>
  );
}
