import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  title: string;
  content: string;
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
        <Button onClick={onClose}>Not now</Button>
        <Button onClick={onAccept} autoFocus={true}>
          Yes !
        </Button>
      </DialogActions>
    </Dialog>
  );
}
