import styles from "./accounts.module.css";
import Account from "./Account";
import Jars from "./Jars";
import { RiArrowLeftCircleFill, RiArrowUpSLine } from "react-icons/ri";
import { useState } from "react";
import Transaction from "./Transaction";
const howSort = { date: "time", title: "description", amount: "amount" };
function Accounts({ clientInfo, course, transactions, setTransactions }) {
  function renderErrorMessage() {
    try {
      // Код, который может вызвать ошибку
      if (transactions[actualTransaction.id].length == 0) {
        return (
          <h2 className={styles.none}>
            За последний месяц у вас не было транзакций, либо произошла какая-то
            ошибка
          </h2>
        );
      } else {
        return null; // или другой компонент, если нужно
      }
    } catch (error) {
      //console.error("Ошибка при рендеринге сообщения:", error);
      return (
        <h2 className={styles.none}>
          За последний месяц у вас не было транзакций, либо произошла какая-то
          ошибка
        </h2>
      );
    }
  }

  const [amount, setAmount] = useState(true);
  function sortTransactions(how) {
    let data = { ...transactions };
    function sortTransactionsByAmount(transactions) {
      if (how !== "title") {
        if (amount) {
          return transactions.sort((a, b) => a[howSort[how]] - b[howSort[how]]);
        } else {
          return transactions.sort((a, b) => b[howSort[how]] - a[howSort[how]]);
        }
      } else {
        if (amount) {
          return transactions.sort((a, b) =>
            a.description.localeCompare(b.description)
          );
        } else {
          return transactions.sort((a, b) =>
            b.description.localeCompare(a.description)
          );
        }
      }
    }

    for (const key in data) {
      if (Array.isArray(data[key])) {
        // Если значение является массивом, то сортируем его транзакции по "amount"
        data[key] = sortTransactionsByAmount(data[key]);
      }
    }

    console.log(data);
    setAmount(!amount);
    setTransactions(data);
  }
  //Выбранная карта/банка для просмотра транзакций
  const [actualTransaction, setActualTransaction] = useState({
    state: false,
    id: "0",
    number: "0",
    card: true,
  });
  const changeActualTransaction = (state, id, number, card) => {
    setActualTransaction({ state: state, id: id, number: number, card: card });
  };
  return (
    <div className={styles.main}>
      {!actualTransaction.state && (
        <div className={styles.cards}>
          <div className={styles.cardsBlock}>
            <h2 className={styles.cardsTitle}>Список ваших карт:</h2>
            <div className={styles.cardsBlockItem}>
              {clientInfo.accounts.map((i, index) => {
                return (
                  <Account
                    key={index}
                    account={i}
                    clientInfo={clientInfo}
                    course={course}
                    changeActualTransaction={changeActualTransaction}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.jarsBlock}>
            <h2 className={styles.jarsTitle}>Список ваших банок:</h2>
            <div className={styles.jarsBlockItem}>
              {clientInfo.jars.map((i, index) => {
                return (
                  <Jars
                    key={index}
                    account={i}
                    clientInfo={clientInfo}
                    course={course}
                    changeActualTransaction={changeActualTransaction}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
      {actualTransaction.state && (
        <div className={styles.transactionsBlock}>
          <div className={styles.transactionsBlockTop}>
            <RiArrowLeftCircleFill
              className={styles.transactionsBack}
              onClick={() => {
                setActualTransaction({
                  state: false,
                  id: "0",
                  number: "0",
                  card: true,
                });
              }}
            />
            <h2 className={styles.transactionsTitle}>
              Транзакции по {actualTransaction.card ? "карте" : "банке"}{" "}
              <span>{actualTransaction.number}</span>
            </h2>
          </div>
          <div className={styles.buttons}>
            <h2 onClick={() => sortTransactions("date")}>
              <RiArrowUpSLine className={styles.buttonsItem} />
            </h2>
            <h2 onClick={() => sortTransactions("title")}>
              <RiArrowUpSLine className={styles.buttonsItemm} />
            </h2>
            <h2 onClick={() => sortTransactions("amount")}>
              <RiArrowUpSLine className={styles.buttonsItemr} />
            </h2>
          </div>
          <div className={styles.transactionsBlockInfo}>
            {!!transactions[actualTransaction.id] ? (
              <Transaction
                transaction={transactions[actualTransaction.id]}
                course={course}
              />
            ) : (
              renderErrorMessage()
            )}
          </div>
        </div>
      )}

      <div className={styles.mainInfo}></div>
    </div>
  );
}

export default Accounts;
