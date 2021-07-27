import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import { fetchUserData } from "./redux/user/action";
import { selectIsAuth, selectUserStatus } from "./redux/user/selectors";
import { Loading } from "./redux/tweets/state";
import { Twitter } from "@material-ui/icons";

import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector(selectIsAuth);
  const loadingStatus = useSelector(selectUserStatus);
  const isReady =
    loadingStatus !== Loading.NEVER && loadingStatus !== Loading.LOADING;
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  useEffect(() => {
    if (!isAuth && isReady) {
      history.push("/signin");
    } else {
      history.push("/home");
    }
  }, [isAuth, isReady, history]);

  if (!isReady) {
    return (
      <div className="center">
        <Twitter color="primary" style={{ width: 100, height: 100 }} />
      </div>
    );
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/home" component={Home} />
        <Route path="/home/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
