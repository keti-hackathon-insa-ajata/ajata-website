import ConfirmDialog from './confirm-dialog';
import DeleteButton from '@mui/icons-material/DeleteOutline';

type Props = {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
};

export default function DeleteConfirmDialog(props: Props) {
  return (
    <ConfirmDialog
      {...props}
      title={'Confirm Deletion'}
      content={
        'Are you sure you want to remove this report. This action cannot be undone.'
      }
      icon={<DeleteButton sx={{ mr: 1 }} />}
      buttons={{
        accept: {
          color: 'error',
          text: 'Delete',
        },
        cancel: {
          color: 'success',
          text: 'Cancel',
        },
      }}
    />
  );
}
