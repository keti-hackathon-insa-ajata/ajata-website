import { Button, Drawer, Divider } from '@mui/material';
import Legend from '../components/legend';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import styles from '../styles/LegendDrawer.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LegendDrawer(props: Props) {
  const theme = useTheme();
  return (
    <Drawer
      anchor={'right'}
      open={props.open}
      variant={'persistent'}
      onClose={props.onClose}
    >
      <Legend />
      <Divider />
      <div
        className={styles.drawerFooter}
        style={{
          backgroundColor: theme.palette.grey[200],
          padding: theme.spacing(1, 1),
        }}
      >
        <Button
          className={styles.drawerBack}
          color={'inherit'}
          onClick={props.onClose}
        >
          Close
          <ChevronRightIcon />
        </Button>
      </div>
    </Drawer>
  );
}
