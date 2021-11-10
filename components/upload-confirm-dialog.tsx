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
};

export default function UploadConfirmDialog(props: Props) {
  const { open, onClose, onAccept } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={'alert-dialog-title'}
      aria-describedby={'alert-dialog-description'}
    >
      <DialogTitle id={'alert-dialog-title'}>{'Confirm'}</DialogTitle>
      <DialogContent>
        <DialogContentText id={'alert-dialog-description'}>
          Are you sure you want to publish your reports?
          <br />
          These will be publicly visible.
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
