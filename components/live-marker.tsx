import { Marker } from 'react-leaflet';
import MarkerPopup from './marker-popup';
import L from 'leaflet';
import { InformationNode } from '../types/api';

const redIcon = new L.Icon({
  iconUrl: 'leaflet_images/marker-icon.png',
  shadowUrl: 'leaflet_images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type Props = {
  item: InformationNode;
  key?: string;
};

export function LiveMarker(props: Props) {
  const { item } = props;
  return (
    <Marker
      key={props.key}
      position={[item.latitude, item.longitude]}
      icon={redIcon}
    >
      <MarkerPopup item={item} local={false} />
    </Marker>
  );
}
