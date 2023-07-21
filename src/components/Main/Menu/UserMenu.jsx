import React, { useEffect, useState } from "react";
import styles from "./userMenu.module.css";

function UserMenu({ clientInfo, course, setIds, ids }) {
  const [money, setMoney] = useState(0);

  useEffect(() => {
    let totalMoney = 0;
    let newIds = [];
    clientInfo.accounts.forEach((i, index) => {
      totalMoney += (i.balance / 100) * course[i.currencyCode];
      newIds.push(i.id);
    });
    clientInfo.jars.forEach((i, index) => {
      totalMoney += (i.balance / 100) * course[i.currencyCode];
      newIds.push(i.id);
    });
    setIds(newIds);
    setMoney(totalMoney.toFixed(2));
  }, [clientInfo, course, setIds]);

  return (
    <div className={styles.main}>
      <div className={styles.mainInfo}>
        <h1 className={styles.title}>
          Добро пожаловать,{" "}
          <span className={styles.name}>{clientInfo.name}</span>
        </h1>
        <div className={styles.infoAboutId}>
          <h2 className={styles.infoAboutId__h2}>
            ClientId:{" "}
            <span className={styles.infoAboutId__span}>
              {clientInfo.clientId}
            </span>
          </h2>
          <h2 className={styles.infoAboutId__h2}>
            Permissions:{" "}
            <span className={styles.infoAboutId__span}>
              {clientInfo.permissions}
            </span>
          </h2>
        </div>
        <h2 className={styles.balanceInfo}>
          Ваш капитал: <span className={styles.balanceInfoSpan}>{money}</span>
        </h2>
      </div>
    </div>
  );
}

export default UserMenu;
