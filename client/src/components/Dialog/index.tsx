import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

interface IDialogProps {
  title: string;
  children: React.ReactNode;
  visible?: boolean;
  handleClose: () => void;
}

const DialogComponent: React.FC<IDialogProps> = ({
  title,
  children,
  handleClose,
  visible = false,
}): React.ReactElement | null => {
  if (!visible) {
    return null;
  }
  return (
    <>
      <Dialog open={visible} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">
          <IconButton
            onClick={handleClose}
            color="secondary"
            aria-label="close"
          >
            <Close style={{ fontSize: 26 }} color="secondary" />
          </IconButton>
          {title}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
};

export default DialogComponent;
