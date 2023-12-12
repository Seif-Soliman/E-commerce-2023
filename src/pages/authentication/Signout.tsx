// import { signOut } from "../../store/authenticate/thunk";
import { signOut } from "../../store/authNew/thunks";
import { useAppDispatch } from "../../store/hooks";
import styles from "./Link.module.css";

const Signout = () => {
  const dispatch = useAppDispatch();

  const handleSignout = () => {
    dispatch(signOut());
  };

  return (
    <div className={styles.link}>
      <span className={styles.text}>
        <button onClick={handleSignout} className={styles.button}>
          Sign Out
        </button>
      </span>
    </div>
  );
};

export default Signout;
