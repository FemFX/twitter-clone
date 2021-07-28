import { useDispatch } from "react-redux";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Paper, IconButton, Typography, Avatar } from "@material-ui/core";
import {
  Chat,
  Share,
  Favorite,
  Publish,
  Edit,
  Delete,
} from "@material-ui/icons";
import { formatDate } from "../../utils/formatDate";
import { useStyles } from "../../pages/Home";
import ImageList from "../ImageList";
import { removeTweet } from "../../redux/tweets/action";

interface ITweetProps {
  _id: string;
  text: string;
  images?: any[];
  classes: ReturnType<typeof useStyles>;
  user: {
    fullname: string;
    username: string;
    avatarUrl: string;
  };
  createdAt: string;
}

const Tweet: React.FC<ITweetProps> = ({
  _id,
  classes,
  text,
  user,
  images,
  createdAt,
}: ITweetProps): React.ReactElement => {
  const dispatch = useDispatch();
  const handleRemove = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    if (window.confirm("Вы действительно хотите удалить твит?")) {
      dispatch(removeTweet(_id));
    }
  };
  return (
    <Link to={`/home/tweet/${_id}`}>
      <Paper
        className={classNames(classes.tweetsHeader, classes.tweet)}
        variant="outlined"
      >
        <div>
          <Avatar src={user.avatarUrl} alt="User Avatar" />

          <Typography>
            <b>{user.fullname}</b>
            <span className={classes.tweetsUsername}>@{user.username}</span>
            <span className={classes.tweetsUsername} style={{ marginLeft: 10 }}>
              {formatDate(new Date(createdAt))}
            </span>
          </Typography>

          <Typography variant="body1" gutterBottom>
            {text}
            {images && <ImageList classes={classes} images={images} />}
          </Typography>
          <div className={classes.tweetsFooter1} style={{ width: 450 }}>
            <div>
              <IconButton color="primary">
                <Chat style={{ fontSize: 16 }} />
              </IconButton>
              <span style={{ fontSize: 14 }}>1</span>
            </div>
            <div>
              <IconButton color="primary">
                <Share style={{ fontSize: 16 }} />
              </IconButton>
            </div>
            <div>
              <IconButton color="primary">
                <Favorite style={{ fontSize: 16 }} />
              </IconButton>
            </div>
            <div>
              <IconButton color="primary">
                <Publish style={{ fontSize: 16 }} />
              </IconButton>
            </div>
            <div>
              <IconButton color="primary">
                <Edit style={{ fontSize: 16, color: "lightGreen" }} />
              </IconButton>
            </div>
            <div>
              <IconButton color="secondary" onClick={handleRemove}>
                <Delete style={{ fontSize: 16 }} />
              </IconButton>
            </div>
          </div>
        </div>
      </Paper>
    </Link>
  );
};

export default Tweet;
