import { Popup, PopupProps } from 'react-leaflet';
import { InformationNode } from '../types/api';

type Props = PopupProps & {
  item: InformationNode;
  local?: boolean;
};

export default function MarkerPopup(props: Props) {
  const { item, local } = props;
  return (
    <Popup>
      {local ? <p>LOCAL</p> : undefined}
      {item.sync ? <p>SYNC</p> : <p>NOT IN SYNC</p>}
      <p>
        <strong>Date:</strong> {item.timestamp}
      </p>
      <p>
        <strong>Distance:</strong> {item.distance}
      </p>
      <p>
        <strong>Object speed:</strong> {item.object_speed}
      </p>
      <p>
        <strong>Bike speed:</strong> {item.bicycle_speed}
      </p>
    </Popup>
  );
}
