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

import { fetchSignUp } from "../../redux/user/action";
import { selectUserStatus } from "../../redux/user/selectors";
import { Loading } from "../../redux/tweets/state";

interface IRegisterProps {
  visible: boolean;
  handleClose: () => void;
  classes: ReturnType<typeof useStyles>;
}
export interface IRegisterFormProps {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

const Register: React.FC<IRegisterProps> = ({
  visible,
  classes,
  handleClose,
}: IRegisterProps) => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectUserStatus);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    if (loadingStatus === Loading.SUCCESS) {
      setMessage("Регистрация прошла успешно");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else if (loadingStatus === Loading.ERROR) {
      setMessage("Что-то пошло не так");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [loadingStatus]);

  const onSubmit = async (data: IRegisterFormProps) => {
    dispatch(fetchSignUp(data));
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
        title="Создайте учетную запись"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ username, password, email, fullname });
          }}
        >
          <FormControl component="fieldset" fullWidth>
            <FormGroup aria-label="position" row>
              <TextField
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                autoFocus
                id="fullname"
                name="fullname"
                type="text"
                fullWidth
                label="Введите имя"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginBottom: 15 }}
              />
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                id="email"
                name="email"
                type="text"
                fullWidth
                label="Введите email"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginBottom: 15 }}
              />
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                id="username"
                name="username"
                type="text"
                fullWidth
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

export default Register;
