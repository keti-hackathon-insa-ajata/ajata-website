import Head from 'next/head';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import Loading from '../components/loading';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Map must be imported as dynamic component with no server-side rendering
const Map = dynamic(() => import('../components/map'), {
  loading: () => <Loading />,
  ssr: false,
});

export default function Home() {
  const { data, error } = useSWR('/api/mock', fetcher);
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
      </main>
    </div>
  );
}
