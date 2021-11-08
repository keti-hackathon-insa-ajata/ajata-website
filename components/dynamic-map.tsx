import dynamic from 'next/dynamic';
import Loading from '../components/loading';

const Map = dynamic(() => import('../components/map'), {
  loading: () => <Loading />,
  ssr: false,
});

export default Map;
