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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Legend from '../components/legend';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useTheme } from '@mui/material/styles';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const ENDPOINT = 'http://192.168.43.129:12345/dangerReports';
const ENDPOINT = 'api/mock';

// Map must be imported as dynamic component with no server-side rendering
const Map = dynamic(() => import('../components/map'), {
  loading: () => <Loading />,
  ssr: false,
});

export default function Home() {
  const { data, error } = useSWR(ENDPOINT, fetcher);
  const [legendOpen, setLegendOpen] = useState(false);
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
              padding: theme.spacing(0, 1),
            }}
          >
            <Button
              className={styles.drawerBack}
              color="inherit"
              onClick={() => setLegendOpen(false)}
            >
              Close
              <ChevronRightIcon />
            </Button>
          </div>
        </Drawer>
      </main>
      <footer>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Safe city for bicycles
            </Typography>
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
