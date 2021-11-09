import { Marker } from 'react-leaflet';
import MarkerPopup from './marker-popup';
import L from 'leaflet';
import { LocalInformationNode } from '../types/api';

// Blue icon for unsynced reports
const blueIcon = new L.Icon({
  iconUrl: 'leaflet_images/marker-icon-blue.png',
  shadowUrl: 'leaflet_images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Red icon for synced reports
const redIcon = new L.Icon({
  iconUrl: 'leaflet_images/marker-icon.png',
  shadowUrl: 'leaflet_images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type Props = {
  item: LocalInformationNode;
  key?: string;
};

export function LocalMarker(props: Props) {
  const { item } = props;
  return (
    <Marker
      key={props.key}
      position={[item.latitude, item.longitude]}
      icon={item.sync ? redIcon : blueIcon}
    >
      <MarkerPopup item={item} local={true} />
    </Marker>
  );
}
