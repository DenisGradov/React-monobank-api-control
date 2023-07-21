import styles from "./noTimeHasPassed.module.css";
import { RiCloseCircleFill } from "react-icons/ri";
function NoTimeHasPassed({ notification, changeNotification }) {
  function close() {
    console.log("sss");
    changeNotification(false, "1", "2");
  }
  return (
    <div className={styles.mainBlock}>
      <div className={styles[notification.state]}>
        <div className={styles.div}>
          <div className={styles.top}>
            <h1 className={styles.title}>{notification.title}</h1>
            <RiCloseCircleFill
              onClick={() => {
                close();
              }}
              className={styles.close}
            />
          </div>
          <h2 className={styles.text}>{notification.text}</h2>
        </div>
      </div>
    </div>
  );
}

export default NoTimeHasPassed;
