import { useEffect } from "react";
// redux
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ManagerRoutes from "./routing/managerRoutes";
import ClientLogin from "./app/Client/auth/Login";
import ClientRegister from "./app/Client/auth/Register";
import ManagerLogin from "./app/Manager/auth/Login";
import ManagerRegister from "./app/Manager/auth/Register";
import Navbar from "./app/shared/header";
import Footer from "./app/shared/footer";
import store from "./store";
import StoreFront from "./app/storeFront"
import Home from "./app/Home";
import About from "./app/About"
import Pricing from "./app/pricing";
import Payment from "./app/payment";
import ManagerDashboard from "./app/Manager/ManagerDashboard";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/authCheck.actions";
import { USER_LOGOUT } from "./actions/types";
function App() {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: USER_LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/client/login" component={ClientLogin}></Route>
        <Route
          exact
          path="/client/register"
          component={ClientRegister}></Route>
        <Route exact path="/manager/login" component={ManagerLogin}></Route>
        <Route
          exact
          path="/manager/register"
          component={ManagerRegister}></Route>
        <ManagerRoutes
          path="/manager/dashboard"
          component={ManagerDashboard}
        />
        <Route
          exact
          path="/menu/:restaurantId/:menuId"
          component={StoreFront}
        />
        <Route 
        exact path="/about" component={About}/>
        <Route exact path="/pricing" component={Pricing} />
        <Route exact path="/payment" compoent={Payment} />

      </Switch>
      <Footer />
    </Router>
  </Provider>
  );
}

export default App;
