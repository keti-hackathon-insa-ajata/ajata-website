import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

type DialogButton = {
  color:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  text: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  title: string;
  content: string;
  icon?: React.ReactElement;
  buttons: {
    accept: DialogButton;
    cancel: DialogButton;
  };
};

export default function ConfirmDialog(props: Props) {
  const { open, onClose, onAccept } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={'alert-dialog-title'}
      aria-describedby={'alert-dialog-description'}
    >
      <DialogTitle id={'alert-dialog-title'}>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={'alert-dialog-description'}>
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          autoFocus={true}
          color={props.buttons.cancel.color}
        >
          {props.buttons.cancel.text}
        </Button>
        <Button
          onClick={onAccept}
          color={props.buttons.accept.color}
          variant={'outlined'}
        >
          {props.icon}
          {props.buttons.accept.text}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
