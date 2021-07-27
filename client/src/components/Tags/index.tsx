import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  ListItem,
  List,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { useStyles } from "../../pages/Home";

import { selectTagsItems, selectTagsLoaded } from "../../redux/tags/selectors";

interface ITagsProps {
  classes: ReturnType<typeof useStyles>;
}

const Tags: React.FC<ITagsProps> = ({
  classes,
}: ITagsProps): React.ReactElement | null => {
  const items = useSelector(selectTagsItems);
  const isLoaded = useSelector(selectTagsLoaded);

  if (!isLoaded) {
    return null;
  }

  return (
    <Paper className={classes.rightSideBlock}>
      <Paper className={classes.rightSideBlockHeader}>
        <b>Актуальные темы</b>
      </Paper>
      <List>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <ListItem className={classes.rightSideBlockItem}>
              <Link to={`/home/search?q=${item.name}`}>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <Typography component="span" variant="body2">
                      Твитов : {item.count}
                    </Typography>
                  }
                />
              </Link>
            </ListItem>
          </React.Fragment>
        ))}

        <Divider component="li" />
      </List>
    </Paper>
  );
};

export default Tags;
