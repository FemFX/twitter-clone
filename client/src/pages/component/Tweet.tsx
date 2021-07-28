import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTweet } from "../../redux/tweet/action";
import {
  selectTweetItem,
  selectTweetLoading,
} from "../../redux/tweet/selectors";
import { useStyles } from "../Home";
import {
  Paper,
  IconButton,
  Typography,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import { Chat, Share, Favorite, Publish } from "@material-ui/icons";
import classNames from "classnames";
import ImageList from "../../components/ImageList";
import format from "date-fns/format";
import ruLang from "date-fns/locale/ru";
import mediumZoom from "medium-zoom";

interface ITweetItemProps {
  classes: ReturnType<typeof useStyles>;
}

const TweetItem: React.FC<ITweetItemProps> = ({
  classes,
}: ITweetItemProps): React.ReactElement | null => {
  const dispatch = useDispatch();
  const tweet: any = useSelector(selectTweetItem);
  const isLoading = useSelector(selectTweetLoading);

  const params: { id: string } = useParams();
  const id = params.id;

  useEffect(() => {
    dispatch(fetchTweet(id));
    mediumZoom(".tweet-images");
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (tweet)
    return (
      <div>
        <Paper className={classes.fullTweet} variant="outlined">
          <div
            className={classNames(
              classes.tweetsHeader,
              classes.tweet,
              classes.tweetsHeaderUser
            )}
          >
            <Avatar src={tweet.user.avatarUrl} alt="User Avatar" />

            <Typography>
              <b>{tweet.user.fullname}</b>
              <span className={classes.tweetsUsername}>
                @{tweet.user.username}
              </span>
            </Typography>
          </div>
          <Typography className={classes.fullTweetText} gutterBottom>
            {tweet.text}
            <div className="tweet-images">
              {tweet.images && (
                <ImageList classes={classes} images={tweet.images} />
              )}
            </div>
          </Typography>
          <Typography>
            <span className={classes.tweetsUsername} style={{ marginLeft: 10 }}>
              {format(new Date(tweet.createdAt), "H:mm", { locale: ruLang })}
            </span>
            <span className={classes.tweetsUsername} style={{ marginLeft: 10 }}>
              {format(new Date(tweet.createdAt), "dd MMM. yyyy г.", {
                locale: ruLang,
              })}
            </span>
          </Typography>
          <Paper className={classes.tweetsFooter} variant="outlined">
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
          </Paper>
        </Paper>
      </div>
    );
  return null;
};

export default TweetItem;
