import styles from "./loginPage.module.css";
function LoginPage({ changeToken, changeLastRequest, isLoading }) {
  function checkToken(e) {
    e.preventDefault();
    changeToken(e.target.ApiToken.value);
  }
  return (
    <div className={styles.MainBody}>
      <div className={styles.block}>
        <h1 className={styles.title}>
          Введите{" "}
          <a
            className={styles.APImonobankLink}
            href="https://api.monobank.ua"
            target="_blank"
            rel="noopener noreferrer"
          >
            API токен
          </a>{" "}
          монобанка
        </h1>
        <form onSubmit={(e) => checkToken(e)}>
          <input
            className={styles.input}
            type="password"
            name="ApiToken"
            placeholder="API токен"
          />
          <button className={styles.button}>Авторизоваться</button>
          {isLoading && <h2 className={styles.loading}>Получаем данные..</h2>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
