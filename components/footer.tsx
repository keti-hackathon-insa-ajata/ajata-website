import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MENU_ITEMS } from '../constants/routes';
import { NextLinkComposed } from '../components/Link';

type Props = {
  onMenuClick: () => void;
  onLegendClick: () => void;
};

export default function Footer(props: Props) {
  return (
    <footer>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
            onClick={props.onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ mr: 2 }}>
            Safe city for bicycles
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {MENU_ITEMS.map((item) => (
              <Button
                key={item.id}
                color="inherit"
                component={NextLinkComposed}
                to={{
                  pathname: item.route,
                }}
              >
                <item.icon sx={{ mr: 1 }} />
                {item.text}
              </Button>
            ))}
          </Box>
          <div style={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={props.onLegendClick}>
            <ChevronLeftIcon />
            Legend
          </Button>
        </Toolbar>
      </AppBar>
    </footer>
  );
}
