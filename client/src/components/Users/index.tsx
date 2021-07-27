import { useSelector } from "react-redux";
import {
  Typography,
  Avatar,
  Button,
  ListItem,
  List,
  ListItemText,
  Divider,
  ListItemAvatar,
} from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import { useStyles } from "../../pages/Home";
import { selectUsersItems } from "../../redux/whomToRead/selectors";

interface IUsersProps {
  classes: ReturnType<typeof useStyles>;
}

const Users: React.FC<IUsersProps> = ({
  classes,
}: IUsersProps): React.ReactElement => {
  const items = useSelector(selectUsersItems);
  return (
    <List>
      {items.map((item) => (
        <ListItem className={classes.rightSideBlockItem}>
          <Divider component="li" />
          <ListItem className={classes.rightSideBlockItem}>
            <ListItemAvatar>
              <Avatar src="" />
            </ListItemAvatar>
            <ListItemText
              primary="Name"
              secondary={
                <Typography component="span" variant="body2">
                  @user
                </Typography>
              }
            />
            <Button color="primary">
              <PersonAdd />
            </Button>
          </ListItem>
        </ListItem>
      ))}

      <Divider component="li" />
    </List>
  );
};

export default Users;
