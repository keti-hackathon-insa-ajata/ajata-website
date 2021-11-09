import Head from 'next/head';
import useSWR from 'swr';
import styles from '../styles/Home.module.css';
import Map from '../components/dynamic-map';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ENDPOINT = 'api/markers';

export default function Home() {
  const { data, error } = useSWR(ENDPOINT, fetcher);
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
        local={true}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </div>
  );
}
