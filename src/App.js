//Для тестов в apiToken поставить апи токен по умолчанию, login на false, transactions на {id: 0}
import "./App.css";
import { useEffect, useState, useRef } from "react";
import Menu from "./components/Main/Menu/Menu";
import Login from "./components/Login/Login";
//Тестовый объект сданными

function App() {
  // Создаем референс на интервал
  const intervalRef = useRef(null);
  //Курсы валют
  const [course, setCourse] = useState({ 980: 1, 840: 36.65, 978: 41.15 });
  //Массив с айди всех карт и банок
  const [ids, setIds] = useState([]); //[] testIdsObject
  //Выписка за последний месяц
  const [transactions, setTransactions] = useState({ id: 0 }); //{id: 0} testUserTransactions
  //Авторизован ли юзер
  const [login, setLogin] = useState(false); //false true
  //Инфо о клиенте
  const [clientInfo, setClientInfo] = useState(false); //false testUserInfo
  //Окошко с уведомлением
  const [notification, setNotification] = useState({
    state: false,
    title: "Ошибка!",
    text: "Text",
  });
  //Смена параметров уведомления
  const changeNotification = (state, title, text) => {
    const newNotif = { state: state, title: title, text: text };
    setNotification(newNotif);
  };
  //Загрузились ли первые данные по API
  const [isLoading, setIsLoading] = useState(false);
  //Время последнего запроса
  const [lastRequest, setLastRequest] = useState(0);
  //Определяем, прошло ли 60 секунд с последнего запроса, что бы монобанк не сносил апи
  const changeLastRequest = () => {
    const time = Math.floor(Date.now() / 1000);
    if (lastRequest == 0 || time - lastRequest > 65) {
      setLastRequest(time);
      return true;
    } else {
      return false;
    }
  };

  //API токен монобанка
  const [apiToken, setApiToken] = useState(false); //"uf2Ill3Io929RgcIbzqihmpXX5pd_qCb88sUtZmDIcxY"
  //Запрос на апи моно
  const changeToken = (newToken) => {
    if (changeLastRequest()) {
      setIsLoading(true);
      fetch("/personal/client-info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token": newToken,
        },
      })
        .then((response) => response.json())
        .then((data) => setClientInfo(data))
        .catch((error) => {
          console.error("Ошибка:", error);
        })
        .finally(() => {
          setIsLoading(false);
          setLogin(true);
        });
      setApiToken(newToken);
    } else {
      changeNotification(
        true,
        "Ошибка!",
        "Запросы можно делать раз в 60 секунд!"
      );
    }
  };

  useEffect(() => {
    let counter = 1;
    intervalRef.current = setInterval(() => {
      if (clientInfo && changeLastRequest()) {
        // && false
        if (counter % 2 === 0) {
          fetch("/personal/client-info", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Token": apiToken,
            },
          })
            .then((response) => response.json())
            .then((data) => setClientInfo(data))
            .catch((error) => {
              console.error("Ошибка:", error);
            })
            .finally(() => {
              console.log(clientInfo);
              console.log(`Данные о юзере успешно обновлены`);
            });
        } else {
          fetch(
            `/personal/statement/${ids[transactions.id]}/${
              Math.floor(Date.now() / 1000) - 2582000
            }/${Math.floor(Date.now() / 1000)}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-Token": apiToken,
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              let newTransactions = { ...transactions };
              if (!!ids) {
                newTransactions[ids[newTransactions.id]] = data;
                setTransactions(newTransactions);
                setTransactions((prevTransactions) => ({
                  ...prevTransactions,
                  id:
                    prevTransactions.id + 1 >= ids.length
                      ? 0
                      : prevTransactions.id + 1,
                }));
              }
            })
            .catch((error) => {
              console.error("Ошибка:", error);
            })
            .finally(() => {
              console.log(transactions);
              console.log(`Выписка юзера успешно обновлена`);
            });
        }
      }
      counter += 1;
    }, 66000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [ids, transactions]);

  return (
    <div className="App">
      {login && (
        <Menu
          clientInfo={clientInfo}
          course={course}
          setIds={setIds}
          ids={ids}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      )}
      {!login && (
        <Login
          notification={notification}
          changeToken={changeToken}
          changeLastRequest={changeLastRequest}
          changeNotification={changeNotification}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
