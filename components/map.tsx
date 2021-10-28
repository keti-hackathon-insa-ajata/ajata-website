import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapContainerProps,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ApiResponse } from '../types/api';

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
                position={[m.latitude, m.longitude]}
              >
                <Popup>
                  <p>
                    <strong>Date:</strong> {m.timestamp}
                  </p>
                  <p>
                    <strong>Distance:</strong> {m.distance}
                  </p>
                  <p>
                    <strong>Object speed:</strong> {m.object_speed}
                  </p>
                  <p>
                    <strong>Bike speed:</strong> {m.bicycle_speed}
                  </p>
                </Popup>
              </Marker>
            );
          })
        : null}
    </MapContainer>
  );
}
