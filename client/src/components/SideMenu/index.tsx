import { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, Typography, Button } from "@material-ui/core";
import {
  Twitter,
  Notifications,
  Message,
  Bookmark,
  ListAlt,
  Person,
  MoreHoriz,
} from "@material-ui/icons";
import { useStyles } from "../../pages/Home";
import Dialog from "../Dialog";
import AddTweetForm from "../AddTweetForm";

interface ISideMenuProps {
  classes: ReturnType<typeof useStyles>;
}

const SideMenu: React.FC<ISideMenuProps> = ({
  classes,
}: ISideMenuProps): React.ReactElement => {
  const [visibleAddTweet, setVisibleAddTweet] = useState<boolean>(false);

  const handleOpen = () => {
    setVisibleAddTweet(true);
  };

  const handleClose = () => {
    setVisibleAddTweet(false);
  };
  return (
    <ul className={classes.sideMenuList}>
      <li className={classes.sideMenuListItem}>
        <Link to="/home">
          <div>
            <IconButton color="primary">
              <Twitter style={{ fontSize: 38, margin: "10px 0" }} />
            </IconButton>
          </div>
        </Link>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <IconButton>
            <Person className={classes.sideMenuListItemIcon} />
          </IconButton>

          <Typography className={classes.sideMenuListItemLabel} variant="h6">
            Профиль
          </Typography>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <IconButton>
            <Notifications className={classes.sideMenuListItemIcon} />
          </IconButton>

          <Typography className={classes.sideMenuListItemLabel} variant="h6">
            Уведомления
          </Typography>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <IconButton>
            <Message className={classes.sideMenuListItemIcon} />
          </IconButton>

          <Typography className={classes.sideMenuListItemLabel} variant="h6">
            Сообщения
          </Typography>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <IconButton>
            <Bookmark className={classes.sideMenuListItemIcon} />
          </IconButton>

          <Typography className={classes.sideMenuListItemLabel} variant="h6">
            Закладки
          </Typography>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <IconButton>
            <ListAlt className={classes.sideMenuListItemIcon} />
          </IconButton>

          <Typography className={classes.sideMenuListItemLabel} variant="h6">
            Список
          </Typography>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <IconButton>
            <MoreHoriz className={classes.sideMenuListItemIcon} />
          </IconButton>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <Button
          onClick={handleOpen}
          className={classes.sideMenuButton}
          color="primary"
          variant="contained"
          fullWidth
        >
          Твитнуть
        </Button>
        <Button
          color="secondary"
          style={{ marginTop: 10 }}
          variant="contained"
          fullWidth
        >
          Выйти из аккаунта
        </Button>
        <Dialog
          title="Закрыть окно"
          handleClose={handleClose}
          visible={visibleAddTweet}
        >
          <AddTweetForm classes={classes} />
        </Dialog>
      </li>
    </ul>
  );
};

export default SideMenu;
