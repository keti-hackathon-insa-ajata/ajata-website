import { Popup, PopupProps } from 'react-leaflet';
import { InformationNode } from '../types/api';
import { Button } from '@mui/material';
import Links from '../constants/links';

type Props = PopupProps & {
  item: InformationNode;
  local?: boolean;
};

export default function MarkerPopup(props: Props) {
  const { item, local } = props;
  return (
    <Popup>
      {local ? <p>LOCAL</p> : undefined}
      {local ? item.sync ? <p>SYNC</p> : <p>NOT IN SYNC</p> : undefined}
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
      {local ? (
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={async () => {
            const response = await fetch('/api/markers', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: '[' + item.id + ']',
            });
            if (!response.ok) {
              console.log('Could not delete marker: ' + JSON.stringify(item));
            }
          }}
        >
          Supprimer
        </Button>
      ) : undefined}
    </Popup>
  );
}
