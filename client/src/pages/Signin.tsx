import { useState } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import {
  Twitter,
  Search,
  PeopleOutline,
  MessageOutlined,
} from "@material-ui/icons";

import Login from "./component/Login";
import Register from "./component/Register";

export const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    height: "100vh",
  },
  blueSide: {
    backgroundColor: "#1DA1F2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 50%",
  },
  blueSideList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    color: "white",
    fontWeight: 600,
    width: 380,
    fontSize: 20,
    "& h6": {
      display: "flex",
      alignItems: "center",
      marginBottom: 15,
    },
  },
  loginSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 50%",
  },
  loginSideTwitterIcon: {
    fontSize: 45,
  },
  loginSideWrapper: {
    width: 380,
  },
  loginSideTitle: {
    fontWeight: 700,
    fontSize: 32,
    marginBottom: 40,
    marginTop: 20,
  },
}));

const Signin: React.FC = (): React.ReactElement => {
  const [visibleModel, setVisibleModel] = useState<"signIn" | "signUp">();
  const classes = useStyles();

  const handleClickOpenSignIn = (): void => {
    setVisibleModel("signIn");
  };
  const handleClickOpenSignUp = (): void => {
    setVisibleModel("signUp");
  };
  const handleClose = (): void => {
    setVisibleModel(undefined);
  };
  return (
    <div className={classes.wrapper}>
      <section className={classes.blueSide}>
        <ul className={classes.blueSideList}>
          <li>
            <Typography variant="h6">
              <Search />
              Читайте о том,что вам интересно.
            </Typography>
          </li>
          <li>
            <Typography variant="h6">
              <PeopleOutline />
              Узнайте о чем говорят в мире.
            </Typography>
          </li>
          <li>
            <Typography variant="h6">
              <MessageOutlined />
              Присоединяйтесь к сообществу.
            </Typography>
          </li>
        </ul>
      </section>
      <section className={classes.loginSide}>
        <div className={classes.loginSideWrapper}>
          <Twitter color="primary" className={classes.loginSideTwitterIcon} />
          <Typography className={classes.loginSideTitle}>
            Узнайте, что происходит в мире прямо сейчас
          </Typography>
          <Typography>Присоединяйтесь к Твиттеру прямо сейчас</Typography>
          <br />
          <Button
            onClick={handleClickOpenSignUp}
            style={{ marginBottom: 20 }}
            color="primary"
            variant="contained"
            fullWidth
          >
            Зарегистрироваться
          </Button>
          <Button
            onClick={handleClickOpenSignIn}
            color="primary"
            variant="outlined"
            fullWidth
          >
            Войти
          </Button>
          <Login
            visible={visibleModel === "signIn"}
            classes={classes}
            handleClose={handleClose}
          />
          <Register
            visible={visibleModel === "signUp"}
            classes={classes}
            handleClose={handleClose}
          />
        </div>
      </section>
    </div>
  );
};

export default Signin;
