import { Popup, PopupProps } from 'react-leaflet';
import { InformationNode, LocalInformationNode } from '../types/api';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

type Props = PopupProps &
  (
    | {
        item: InformationNode;
        local: false;
      }
    | {
        item: LocalInformationNode;
        onPressDelete: () => void;
        local: true;
      }
  );

export default function MarkerPopup(props: Props) {
  const { item } = props;
  const getSyncMessage = () => {
    if (props.local) {
      if (props.item.sync) {
        return <p>SYNC</p>;
      } else {
        return <p>NOT SYNC</p>;
      }
    } else {
      return null;
    }
  };

  return (
    <Popup>
      {getSyncMessage()}
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
      {props.local && !props.item.sync ? (
        <Button
          size={'small'}
          variant={'outlined'}
          color={'error'}
          onClick={props.onPressDelete}
        >
          <DeleteIcon sx={{ mr: 1 }} />
          Supprimer
        </Button>
      ) : undefined}
    </Popup>
  );
}
