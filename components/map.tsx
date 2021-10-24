import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapContainerProps,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for leaflet images not being loaded by webpack
// Images are copied from node_modules/leaflet/dist/images to public/leaflet_images
import Leaflet from 'leaflet';
Leaflet.Icon.Default.imagePath = 'leaflet_images/';

/**
 * Must be imported as dynamic component with no server-side rendering
 *
 * eg: const DynamicMap = dynamic(() => import('../components/map'), { ssr: false });
 */
export default function Map(props: MapContainerProps) {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      {...props}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
