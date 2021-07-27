import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  FormGroup,
  TextField,
  Snackbar,
} from "@material-ui/core";
import Dialog from "../../components/Dialog";
import { useStyles } from "../Signin";

import { fetchUser } from "../../redux/user/action";
import { selectUserStatus } from "../../redux/user/selectors";
import { Loading } from "../../redux/tweets/state";

interface ILoginProps {
  visible: boolean;
  handleClose: () => void;
  classes: ReturnType<typeof useStyles>;
}
export interface ILoginFormProps {
  username: string;
  password: string;
}

const Login: React.FC<ILoginProps> = ({
  visible,
  classes,
  handleClose,
}: ILoginProps) => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectUserStatus);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    if (loadingStatus === Loading.SUCCESS) {
      setMessage("Авторизация прошла успешно");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else if (loadingStatus === Loading.ERROR) {
      setMessage("Неверный логин или пароль");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [loadingStatus]);

  const onSubmit = async (data: ILoginFormProps) => {
    dispatch(fetchUser(data));
  };
  return (
    <>
      <Snackbar
        open={open}
        onClose={handleClose}
        message={message}
        key={"topright"}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
      <Dialog
        visible={visible}
        handleClose={handleClose}
        title="Войти в аккаунт"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ username, password });
          }}
        >
          <FormControl component="fieldset" fullWidth>
            <FormGroup aria-label="position" row>
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                id="username"
                name="username"
                type="text"
                fullWidth
                color={username.length < 4 ? "secondary" : "primary"}
                helperText={
                  username.length < 4 && "Минимальная длина строки - 4"
                }
                label="Введите логин"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginBottom: 15 }}
              />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                id="password"
                name="password"
                type="password"
                fullWidth
                color={password.length < 6 ? "secondary" : "primary"}
                helperText={
                  password.length < 6 && "Минимальная длина строки - 6"
                }
                label="Введите пароль"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginBottom: 15 }}
              />
              <Button
                onClick={handleClose}
                color="primary"
                fullWidth
                style={{ marginBottom: 10 }}
              >
                Закрыть
              </Button>
              <Button
                type="submit"
                style={{ marginTop: 10 }}
                color="primary"
                variant="contained"
                fullWidth
              >
                Далее
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Dialog>
    </>
  );
};

export default Login;
