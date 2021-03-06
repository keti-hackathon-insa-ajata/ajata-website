import Head from 'next/head';
import useSWR from 'swr';
import styles from '../styles/Home.module.css';
import Map from '../components/dynamic-map';
import { fetcher } from '../util/requests';
import Links from '../constants/links';

export default function Home() {
  const { data, error } = useSWR(Links.liveReports, fetcher, {
    refreshInterval: 10000,
  });
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
      <Map
        markers={data}
        local={false}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </div>
  );
}
