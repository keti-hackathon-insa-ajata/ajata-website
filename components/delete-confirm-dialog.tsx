import ConfirmDialog from './confirm-dialog';

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
    />
  );
}
