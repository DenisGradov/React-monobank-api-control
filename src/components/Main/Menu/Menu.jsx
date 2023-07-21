import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import UserMenu from "./UserMenu";
import Accounts from "./Accounts";
import Transactions from "./Transactions";
import NotFound from "./NotFound";
function Menu({
  clientInfo,
  course,
  setIds,
  transactions,
  ids,
  setTransactions,
}) {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route
            path="/"
            element={<MainLayout clientInfo={clientInfo} course={course} />}
          >
            <Route
              index
              element={
                <UserMenu
                  clientInfo={clientInfo}
                  course={course}
                  setIds={setIds}
                  ids={ids}
                />
              }
            ></Route>
            <Route
              path="/Accounts"
              element={
                <Accounts
                  clientInfo={clientInfo}
                  course={course}
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
              }
            ></Route>
            <Route
              path="/Transactions"
              element={
                <Transactions
                  clientInfo={clientInfo}
                  course={course}
                  transaction={transactions}
                  ids={ids}
                  setTransactions={setTransactions}
                />
              }
            ></Route>
            <Route
              path="*"
              element={<NotFound clientInfo={clientInfo} course={course} />}
            ></Route>
          </Route>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default Menu;
