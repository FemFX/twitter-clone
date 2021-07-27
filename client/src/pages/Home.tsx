import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  Container,
  TextField,
  CircularProgress,
} from "@material-ui/core";

import { grey, blue } from "@material-ui/core/colors";
import Tweet from "../components/Tweet";
import SideMenu from "../components/SideMenu";
import AddTweetForm from "../components/AddTweetForm";
import Tags from "../components/Tags";
import BackButton from "../components/BackButton";
import { fetchTweets } from "../redux/tweets/action";
import { fetchTags } from "../redux/tags/action";
import {
  selectTweetsItems,
  selectTweetsLoading,
} from "../redux/tweets/selectors";
import TweetItem from "./component/Tweet";
import Users from "../components/Users";

export const useStyles = makeStyles(() => ({
  wrapper: {
    height: "100vh",
  },
  sideMenuList: {
    position: "sticky",
    top: 0,
    listStyle: "none",
    margin: 0,
    padding: 0,
    maxWidth: 230,
  },
  sideMenuListItem: {
    "& div": {
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      padding: "0 10px",
      borderRadius: "30px",
      transition: "background-color 0.15s ease-in-out",
      "&:hover": {
        backgroundColor: "rgba(29,161,242,0.1)",
        color: blue[500],
        "& svg path": {
          backgroundColor: "rgba(29,161,242,0.1)",
          color: blue[500],
        },
      },
    },
  },
  sideMenuListItemLabel: {
    fontWeight: 700,
    fontSize: 20,
    marginLeft: 15,
  },
  sideMenuListItemIcon: {
    fontSize: 28,
  },
  tweetsWrapper: {
    borderRadius: 0,
    height: "100%",
    borderTop: 0,
    borderBottom: 0,
  },
  tweetsHeader: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderRadius: 0,
    padding: 15,
    "& h6": {
      fontWeight: 700,
    },
  },
  tweetsHeaderUser: {
    display: "flex",
    alignItems: "center",
  },
  fullTweet: {
    padding: 20,
  },
  fullTweetText: {
    fontSize: 24,
    marginTop: 10,
    marginLeft: 20,
    lineHeight: 1.3125,
  },
  tweetsUsername: {
    color: grey[500],
  },
  tweetsFooter: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  tweetsFooter1: {
    display: "flex",
    justifyContent: "space-around",
  },
  tweet: {
    cursor: "pointer",
    paddingTop: 15,
    paddingLeft: 20,
    "&:hover": {
      backgroundColor: "rgb(245 248 250)",
    },
  },
  sideMenuButton: {
    marginTop: 20,
  },
  rightSide: {
    paddingTop: 20,
    position: "sticky",
    top: 0,
  },
  rightSideBlock: {
    backgroundColor: "#F5F8FA",
    borderRadius: 15,
    marginTop: 20,
    "& .Muilist-root": {
      paddingTop: 0,
    },
  },
  rightSideBlockHeader: {
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    backgroundColor: "transparent",
    padding: "13px 18px",
    "& b": {
      fontSize: 20,
      fontWeight: 800,
    },
  },
  rightSideBlockItem: {
    cursor: "pointer",
    "& a": {
      color: "inherit",
      textDecoration: "none",
    },
    "&:hover": {
      backgroundColor: "#EDF3F6",
    },
  },
  addForm: {
    padding: 10,
  },
  addFormBody: {
    display: "flex",
    widht: "100%",
  },
  addFormBottom: {
    display: "flex",
    justifyContent: "space-beetwen",
    alignItems: "center",
  },
  addFormBottomActions: {
    marginTop: 10,
    paddingLeft: 70,
  },
  addFormTextarea: {
    width: "100%",
    border: 0,
    fontSize: 20,
    outline: "none",
    resize: "none",
  },
  addFormBottomLine: {
    height: 12,
    backgroundColor: "#E6ECF0",
  },
  addFormCircleProgress: {
    position: "relative",
    widht: 20,
    height: 20,
    margin: "0 10px",
    "& .MuiCircularProgress-root": {
      position: "absolute",
    },
  },
  addFormBottomRight: {
    display: "flex",
    alignItems: "center",
  },
  loading: {
    textAlign: "center",
    marginTop: 30,
  },
}));

const Home: React.FC = (): React.ReactElement => {
  const tweets = useSelector(selectTweetsItems);
  const isLoading = useSelector(selectTweetsLoading);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchTweets());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <Container className={classes.wrapper}>
      <Grid container spacing={3}>
        <Grid item sm={1} md={3}>
          <SideMenu classes={classes} />
        </Grid>
        <Grid item sm={8} md={6}>
          <Paper className={classes.tweetsWrapper} variant="outlined">
            <Route path="/home/:any">
              <Paper className={classes.tweetsHeader} variant="outlined">
                <BackButton />
                <Typography variant="h6">Твитнуть</Typography>
              </Paper>
            </Route>
            <Route path={["/home", "/home/search"]} exact>
              <Paper className={classes.tweetsHeader} variant="outlined">
                <Typography variant="h6">Главная</Typography>
              </Paper>
              <Paper>
                <AddTweetForm classes={classes} />
                <div className={classes.addFormBottomLine}></div>
              </Paper>
            </Route>

            <Route path="/home" exact>
              {isLoading ? (
                <div className={classes.loading}>
                  <CircularProgress />
                </div>
              ) : (
                tweets.map((tweet, idx) => (
                  <Tweet key={tweet._id} {...tweet} classes={classes} />
                ))
              )}
            </Route>
            <Route exact path="/home/tweet/:id">
              <TweetItem classes={classes} />
            </Route>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <TextField label="Поиск в твиттере" fullWidth />
          <Tags classes={classes} />
          <Paper className={classes.rightSideBlock}>
            <Paper className={classes.rightSideBlockHeader}>
              <b>Кого читать</b>
            </Paper>
            <Users classes={classes} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
