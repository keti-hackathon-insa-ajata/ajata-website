import Head from 'next/head';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import Loading from '../components/loading';
import useSWR from 'swr';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Drawer,
  Divider,
  Box,
  SvgIconTypeMap,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Legend from '../components/legend';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles';
import { OverridableComponent } from '@mui/material/OverridableComponent';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const ENDPOINT = 'http://192.168.43.129:12345/dangerReports';
const ENDPOINT = 'api/mock';

// Map must be imported as dynamic component with no server-side rendering
const Map = dynamic(() => import('../components/map'), {
  loading: () => <Loading />,
  ssr: false,
});

const MENU_ITEMS: Array<{
  id: string;
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & { muiName: string };
  route: string;
}> = [
  {
    id: 'about',
    text: 'About',
    icon: InfoIcon,
    route: '',
  },
  {
    id: 'contact',
    text: 'Contact',
    icon: MailIcon,
    route: '',
  },
  {
    id: 'github',
    text: 'GitHub',
    icon: GitHubIcon,
    route: '',
  },
];

export default function Home() {
  const { data, error } = useSWR(ENDPOINT, fetcher);
  const [legendOpen, setLegendOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(data);
  console.log(error);

  const theme = useTheme();

  return (
    <div className={styles.container}>
      <Head>
        <title>Safe City for Cyclists</title>
        <meta
          name="description"
          content="Website to help find dangerous for cyclists"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Map
          markers={data}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
        <Drawer
          anchor={'right'}
          open={legendOpen}
          variant={'persistent'}
          onClose={() => setLegendOpen(false)}
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
              onClick={() => setLegendOpen(false)}
            >
              Close
              <ChevronRightIcon />
            </Button>
          </div>
        </Drawer>
        <Drawer
          anchor={'left'}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        >
          <List style={{ width: 250 }}>
            {MENU_ITEMS.map((item) => (
              <ListItem
                key={item.id}
                button={true}
                onClick={() => console.log(item.route)}
              >
                <ListItemIcon>
                  <item.icon sx={{ mr: 1 }} />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </main>
      <footer className={styles.footer}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
              onClick={() => setMenuOpen(!menuOpen)}
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
                  onClick={() => console.log(item.route)}
                >
                  <item.icon sx={{ mr: 1 }} />
                  {item.text}
                </Button>
              ))}
            </Box>
            <div style={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => setLegendOpen(!legendOpen)}>
              <ChevronLeftIcon />
              Legend
            </Button>
          </Toolbar>
        </AppBar>
      </footer>
    </div>
  );
}
