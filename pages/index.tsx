import Head from 'next/head';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import Loading from '../components/loading';
import useSWR from 'swr';
import { useState } from 'react';
import Footer from '../components/footer';
import LegendDrawer from '../components/legend-drawer';
import MenuDrawer from '../components/menu-drawer';

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
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(data);
  console.log(error);

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
        <LegendDrawer open={legendOpen} onClose={() => setLegendOpen(false)} />
        <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      </main>
      <Footer
        onMenuClick={() => setMenuOpen(!menuOpen)}
        onLegendClick={() => setLegendOpen(!legendOpen)}
      />
    </div>
  );
}
