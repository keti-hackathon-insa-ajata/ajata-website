import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapContainerProps,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ApiResponse } from '../types/api';
import Button from '@mui/material/Button';

// Images are copied from node_modules/leaflet/dist/images to public/leaflet_images
import Leaflet from 'leaflet';
Leaflet.Icon.Default.imagePath = 'leaflet_images/';

type Props = MapContainerProps & {
  markers?: ApiResponse;
};

/**
 * Must be imported as dynamic component with no server-side rendering
 *
 * eg: const DynamicMap = dynamic(() => import('../components/map'), { ssr: false });
 */
export default function Map(props: Props) {
  console.log(props.markers);
  return (
    <MapContainer
      center={[43.6, 1.44]}
      zoom={13}
      scrollWheelZoom={true}
      {...props}
    >
      <TileLayer
        attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
      />
      {props.markers
        ? props.markers.map((m, index) => {
            console.log(m);
            return (
              <Marker
                key={'marker' + index}
                position={[m.coordinates[0], m.coordinates[1]]}
              >
                <Popup>
                  Date : {m.timestamp}
                  {'\n'}
                  Distance : {m.distance}
                  {'\n'}
                  Vitesse de l objet : {m.object_speed}
                  {'\n'}
                  Vitesse du vélo : {m.bicycle_speed}
                  <Button variant="contained">Hello World</Button>
                </Popup>
              </Marker>
            );
          })
        : null}
    </MapContainer>
  );
}
