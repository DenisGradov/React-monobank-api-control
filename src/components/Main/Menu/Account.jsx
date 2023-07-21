import styles from "./account.module.css";
import { RiFileCopy2Line } from "react-icons/ri";
function Account({ account, clientInfo, course, changeActualTransaction }) {
  let currency = { 980: "UAH", 840: "USD", 978: "EUR" };

  function cardClick() {
    changeActualTransaction(
      true,
      account.id,
      account.maskedPan.toString().replace(/(.{4})/g, "$1 "),
      true
    );
  }
  return (
    <div className={styles.card}>
      <div
        className={styles.cardImg}
        onClick={() => {
          cardClick();
        }}
      >
        <div className={styles.topInfo}>
          <h2 className={styles.topInfoItem}>monobank</h2>
          <h2 className={styles.topInfoItem}>
            {currency[account.currencyCode]}
          </h2>
        </div>
        <h2 className={styles.cardNumber}>
          {account.maskedPan.toString().replace(/(.{4})/g, "$1 ")}
        </h2>
      </div>
      <div className={styles.cardInfo}>
        <h2 className={styles.cardInfoItem}>
          Баланс:
          <span className={styles.cardInfoItemSpan}>
            {" "}
            {((account.balance / 100) * course[account.currencyCode]).toFixed(
              2
            )}
          </span>
        </h2>
        <h2 className={styles.cardInfoItem}>
          Кред.лимит:
          <span className={styles.cardInfoItemSpan}>
            {" "}
            {account.creditLimit}
          </span>
        </h2>
        <h2 className={styles.cardInfoItem}>
          iban:
          <span className={styles.cardInfoItemSpan}>
            {" "}
            {account.iban.slice(0, 9) + ".."}
          </span>
          <RiFileCopy2Line
            onClick={() => {
              navigator.clipboard.writeText(String(account.iban)).then(
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
          SendId:
          <span className={styles.cardInfoItemSpan}>
            {" "}
            {account.sendId.slice(0, 7) + ".."}
          </span>
          <RiFileCopy2Line
            onClick={() => {
              navigator.clipboard.writeText(String(account.sendId)).then(
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
          <span className={styles.cardInfoItemSpan}>
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

export default Account;
