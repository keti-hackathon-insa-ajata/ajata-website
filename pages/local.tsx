import Head from 'next/head';
import useSWR from 'swr';
import styles from '../styles/Home.module.css';
import Map from '../components/dynamic-map';
import { fetcher } from '../util/requests';
import Links from '../constants/links';
import { useState } from 'react';

export default function Home() {
  const { data, error } = useSWR(Links.localMarkers, fetcher, {
    refreshInterval: 10000,
  });
  // mutate from useSWR does not seem to work
  const [extraData, setExtraData] = useState(0);
  console.log(data);
  console.log(error);

  return (
    <div className={styles.container}>
      <Head>
        <title>Safe City for Cyclists - Local</title>
        <meta
          name="description"
          content="Website to help find dangerous for cyclists"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Map
        markers={data}
        mutate={() => {
          setExtraData(extraData + 1);
        }}
        local={true}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </div>
  );
}
