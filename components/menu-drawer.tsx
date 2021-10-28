import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { MENU_ITEMS } from '../constants/routes';
import styles from '../styles/MenuDrawer.module.css';
import { NextLinkComposed } from '../components/Link';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MenuDrawer(props: Props) {
  return (
    <Drawer anchor={'left'} open={props.open} onClose={props.onClose}>
      <List className={styles.list}>
        {MENU_ITEMS.map((item) => (
          <ListItem
            key={item.id}
            button={true}
            onClick={props.onClose}
            component={NextLinkComposed}
            to={{
              pathname: item.route,
            }}
          >
            <ListItemIcon>
              <item.icon sx={{ mr: 1 }} />
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
