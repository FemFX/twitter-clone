import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const BackButton: React.FC = (): React.ReactElement => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };
  return (
    <IconButton>
      <ArrowBack onClick={handleClick} color="primary" />
    </IconButton>
  );
};

export default BackButton;
