import styles from "./jars.module.css";
import { RiFileCopy2Line } from "react-icons/ri";
function Jars({ account, clientInfo, course, changeActualTransaction }) {
  let currency = { 980: "UAH", 840: "USD", 978: "EUR" };
  function cardClick() {
    changeActualTransaction(true, account.id, account.title.toString(), false);
  }
  return (
    <div className={styles.card}>
      <img
        src={require("./data/jar.png")}
        alt="s"
        className={styles.cardImg}
        onClick={() => {
          cardClick();
        }}
      />

      <h2 className={styles.cardNumber} title={account.description}>
        {account.title}
      </h2>
      <div className={styles.cardInfo}>
        <h2 className={styles.cardInfoItem}>
          Баланс:
          <span className={styles.cardInfoItema}>
            {" "}
            {((account.balance / 100) * course[account.currencyCode]).toFixed(
              2
            )}
          </span>
        </h2>

        <h2 className={styles.cardInfoItem}>
          link:
          <a
            href={`https://send.monobank.ua/${account.sendId}`}
            target="_blank"
            rel="noreferrer"
            className={styles.cardInfoItema}
          >
            {" "}
            {`send.monobank.ua/${account.sendId}`.slice(0, 9) + ".."}
          </a>
          <RiFileCopy2Line
            onClick={() => {
              navigator.clipboard
                .writeText(String(`https://send.monobank.ua/${account.sendId}`))
                .then(
                  function () {
                    //console.log("Копирование в буфер обмена успешно!");
                  },
                  function (err) {
                    //console.error("Ошибка при копировании в буфер обмена: ", err);
                  }
                );
            }}
            className={styles.cardInfoItemCopy}
          />
        </h2>

        <h2 className={styles.cardInfoItem}>
          Id:
          <span className={styles.cardInfoItema}>
            {" "}
            {account.id.slice(0, 12) + ".."}
          </span>
          <RiFileCopy2Line
            onClick={() => {
              navigator.clipboard.writeText(String(account.id)).then(
                function () {
                  //console.log("Копирование в буфер обмена успешно!");
                },
                function (err) {
                  //console.error("Ошибка при копировании в буфер обмена: ", err);
                }
              );
            }}
            className={styles.cardInfoItemCopy}
          />
        </h2>
      </div>
    </div>
  );
}

export default Jars;
