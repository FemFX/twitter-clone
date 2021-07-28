import { Grid, makeStyles, Container } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  wrapper: {
    height: "100vh",
  },
}));

const Profile: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  return (
    <Container className={classes.wrapper}>
      <Grid container spacing={3}>
        <Grid item sm={8} md={6}>
          <h1>Profile</h1>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
