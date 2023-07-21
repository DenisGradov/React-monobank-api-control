import styles from "./transactions.module.css";
import { useState } from "react";
import { RiArrowLeftCircleFill, RiArrowUpSLine } from "react-icons/ri";
function Transactions({
  clientInfo,
  course,
  transaction,
  ids,
  setTransactions,
}) {
  function convertUnixToReadable(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }
  const howSort = { date: "time", title: "description", amount: "amount" };
  const [amount, setAmount] = useState(true);

  let currency = { 980: "UAH", 840: "USD", 978: "EUR" };

  return (
    <div className={styles.main}>
      <div className={styles.transactionsBlock}>
        <div className={styles.transactionsBlockInfo}>
          {
            <div className={styles.transactionsItems}>
              {ids.map((ii, iindex) => {
                return Object.values(transaction[ii]).map((i, index) => {
                  return (
                    <div
                      key={`${index}${index}${index}`}
                      className={styles.transactionsItem}
                    >
                      <h3 className={styles.item}>
                        {convertUnixToReadable(i.time)}
                      </h3>
                      <h3 className={styles.item} title={i.description}>
                        {i.description.slice(0, 20) + ".."}
                      </h3>
                      {i.amount < 0 && (
                        <h3 className={styles.itemRed}>
                          {i.amount == i.operationAmount &&
                            ((i.amount / 100) * course[i.currencyCode]).toFixed(
                              2
                            )}
                          {i.amount != i.operationAmount &&
                            (
                              (i.operationAmount / 100) *
                              course[i.currencyCode]
                            ).toFixed(2)}
                        </h3>
                      )}
                      {i.amount >= 0 && (
                        <h3 className={styles.itemGreen}>
                          {i.amount == i.operationAmount &&
                            ((i.amount / 100) * course[i.currencyCode]).toFixed(
                              2
                            )}
                          {i.amount != i.operationAmount &&
                            (
                              (i.operationAmount / 100) *
                              course[i.currencyCode]
                            ).toFixed(2)}
                        </h3>
                      )}
                    </div>
                  );
                });
              })}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Transactions;
