import ConfirmDialog from './confirm-dialog';
import UploadButton from '@mui/icons-material/Upload';

type Props = {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
};

export default function UploadConfirmDialog(props: Props) {
  return (
    <ConfirmDialog
      {...props}
      title={'Confirm Upload'}
      content={
        'Are you sure you want to publish your reports? These will be publicly visible.'
      }
      icon={<UploadButton sx={{ mr: 1 }} />}
      buttons={{
        accept: {
          color: 'success',
          text: 'Yes !',
        },
        cancel: {
          color: 'primary',
          text: 'Cancel',
        },
      }}
    />
  );
}
