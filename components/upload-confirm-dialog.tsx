import ConfirmDialog from './confirm-dialog';

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
    />
  );
}
