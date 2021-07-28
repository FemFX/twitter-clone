import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextareaAutosize,
  CircularProgress,
  Avatar,
  Button,
  Snackbar,
} from "@material-ui/core";
import classNames from "classnames";
import { useStyles } from "../../pages/Home";
import { fetchAddTweet } from "../../redux/tweets/action";
import { selectAddForm } from "../../redux/tweets/selectors";
import { AddForm } from "../../redux/tweets/state";
import UploadImage from "../UploadImage";
import { uploadImage } from "../../utils/UploadImage";

interface IAddTweetFormProps {
  classes: ReturnType<typeof useStyles>;
}
export interface IImageObj {
  file: File;
  blobUrl: string;
}

const AddTweetForm: React.FC<IAddTweetFormProps> = ({
  classes,
}: IAddTweetFormProps): React.ReactElement => {
  const dispatch = useDispatch();
  const addFormStatus = useSelector(selectAddForm);
  const [text, setText] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const [images, setImages] = useState<IImageObj[]>([]);

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

  const handleAddTweet = async (): Promise<void> => {
    let urls = [];
    for (let i = 0; i < images.length; i++) {
      const file = images[i].file;
      const { url } = await uploadImage(file);
      urls.push(url);
    }

    dispatch(fetchAddTweet({ text, images: urls }));
    setText("");
    setImages([])
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
            <UploadImage
              images={images}
              onChangeImages={setImages}
              classes={classes}
            />
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
