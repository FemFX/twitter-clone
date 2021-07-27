import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextareaAutosize,
  CircularProgress,
  IconButton,
  Avatar,
  Button,
  Snackbar,
} from "@material-ui/core";
import { Image, EmojiEmotions } from "@material-ui/icons";
import classNames from "classnames";
import { useStyles } from "../../pages/Home";
import { fetchAddTweet } from "../../redux/tweets/action";
import { selectAddForm } from "../../redux/tweets/selectors";
import { AddForm } from "../../redux/tweets/state";

interface IAddTweetFormProps {
  classes: ReturnType<typeof useStyles>;
}

const AddTweetForm: React.FC<IAddTweetFormProps> = ({
  classes,
}: IAddTweetFormProps): React.ReactElement => {
  const dispatch = useDispatch();
  const addFormStatus = useSelector(selectAddForm);
  const [text, setText] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const textLimitPercent: number = (text.length / 280) * 100;
  const handleChangeTextarea = (
    e: React.FormEvent<HTMLTextAreaElement>
  ): void => {
    if (e.currentTarget) {
      setText(e.currentTarget.value);
    }
  };

  useEffect(() => {
    if (addFormStatus === AddForm.ERROR) {
      setVisible(true);
      setTimeout(() => {
        handleClose();
      }, 4000);
    }
  }, [addFormStatus]);

  const handleAddTweet = (): void => {
    dispatch(fetchAddTweet(text));
    setText("");
  };
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Snackbar
        open={visible}
        onClose={handleClose}
        message="Ошибка при добавлении твита"
        key={"topright"}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
      <div className={classes.addForm}>
        <div className={classes.addFormBody}>
          <Avatar alt="Аватарка пользователя" />
          <TextareaAutosize
            value={text}
            onChange={handleChangeTextarea}
            className={classes.addFormTextarea}
            placeholder="Введите текст"
            maxLength={280}
          />
        </div>
        <div className={classes.addFormBottom}>
          <div
            className={classNames(
              classes.tweetsFooter,
              classes.addFormBottomActions
            )}
          >
            <IconButton color="primary">
              <Image style={{ fontSize: 26 }} />
            </IconButton>
            <IconButton color="primary">
              <EmojiEmotions style={{ fontSize: 26 }} />
            </IconButton>
          </div>
          <div className={classes.addFormBottomRight}>
            <span>{text.length}/280</span>
            <div className={classes.addFormCircleProgress}>
              <CircularProgress
                size={20}
                value={textLimitPercent}
                thickness={4}
                variant="determinate"
                style={{ position: "absolute" }}
                color={text.length === 280 ? "secondary" : "primary"}
              />
            </div>
            <Button
              disabled={!text}
              onClick={handleAddTweet}
              color="primary"
              variant="contained"
              style={{ marginLeft: 20 }}
            >
              Твитнуть
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTweetForm;
