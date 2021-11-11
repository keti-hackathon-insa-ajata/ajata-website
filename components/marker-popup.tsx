import { Popup, PopupProps } from 'react-leaflet';
import { InformationNode, LocalInformationNode } from '../types/api';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import DateIcon from '@mui/icons-material/AccessTimeOutlined';
import VehicleSpeedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import BicycleSpeedIcon from '@mui/icons-material/DirectionsBikeOutlined';
import DistanceIcon from '@mui/icons-material/SocialDistanceOutlined';
import SyncedIcon from '@mui/icons-material/SyncOutlined';
import NotSyncedIcon from '@mui/icons-material/SyncDisabledOutlined';
import { useRef } from 'react';

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
        return (
          <p>
            <SyncedIcon sx={{ mr: 1, fontSize: 'medium', color: 'green' }} />
            <strong>Synced</strong>
          </p>
        );
      } else {
        return (
          <p>
            <NotSyncedIcon sx={{ mr: 1, fontSize: 'medium', color: 'red' }} />
            <strong>Not synced</strong>
          </p>
        );
      }
    } else {
      return null;
    }
  };

  const ref = useRef();

  const date = new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(item.timestamp * 1000));

  return (
    <Popup ref={ref}>
      <p>
        <DateIcon sx={{ mr: 1, fontSize: 'medium' }} />
        <strong>Date:</strong> {date}
      </p>
      <p>
        <DistanceIcon sx={{ mr: 1, fontSize: 'medium' }} />
        <strong>Distance:</strong> {item.distance} cm
      </p>
      <p>
        <VehicleSpeedIcon sx={{ mr: 1, fontSize: 'medium' }} />
        <strong>Vehicle speed:</strong> {item.object_speed} km/h
      </p>
      <p>
        <BicycleSpeedIcon sx={{ mr: 1, fontSize: 'medium' }} />
        <strong>Bike speed:</strong> {item.bicycle_speed} km/h
      </p>
      {getSyncMessage()}
      {props.local && !props.item.sync ? (
        <Button
          size={'small'}
          variant={'outlined'}
          color={'error'}
          onClick={() => {
            if (ref.current) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              ref.current._close();
            }
            props.onPressDelete();
          }}
        >
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </Button>
      ) : undefined}
    </Popup>
  );
}
