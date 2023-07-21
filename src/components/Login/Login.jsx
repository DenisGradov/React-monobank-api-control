import NoTimeHasPassed from "./NoTimeHasPassed";
import styles from "./login.module.css";
import LoginPage from "./LoginPage";
function Home({
  notification,
  changeToken,
  changeLastRequest,
  changeNotification,
  isLoading,
}) {
  return (
    <div className={styles.mainBody}>
      <div className={styles.body}>
        {!notification.state && (
          <LoginPage
            changeToken={changeToken}
            changeLastRequest={changeLastRequest}
            notification={notification.state}
            isLoading={isLoading}
          />
        )}
        {notification.state && (
          <NoTimeHasPassed
            notification={notification}
            changeNotification={changeNotification}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
