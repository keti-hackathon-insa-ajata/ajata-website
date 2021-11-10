import { MapContainer, TileLayer, MapContainerProps } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DangerReports, LocalDangerReports } from '../types/api';
import { LiveMarker } from './live-marker';
import { LocalMarker } from './local-marker';
import { Fab } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import styles from '../styles/Map.module.css';
import { publishToOM2M } from '../util/requests';

// Images are copied from node_modules/leaflet/dist/images to public/leaflet_images
import L from 'leaflet';
import UploadConfirmDialog from './upload-confirm-dialog';
import { useState } from 'react';
L.Icon.Default.imagePath = 'leaflet_images/';

type Props = MapContainerProps &
  (
    | {
        markers?: DangerReports;
        local: false;
      }
    | {
        markers?: LocalDangerReports;
        local: true;
      }
  );

/**
 * Must be imported as dynamic component with no server-side rendering
 *
 * eg: const DynamicMap = dynamic(() => import('../components/map'), { ssr: false });
 */
export default function Map(props: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);

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
      {props.markers && props.local
        ? props.markers.map((item, index) => (
            <LocalMarker key={'localMarker' + index} item={item} />
          ))
        : null}
      {props.local ? (
        <>
          <UploadConfirmDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onAccept={() => {
              setDialogOpen(false);
              publishToOM2M(props.markers, (e) => console.log(e));
            }}
          />
          <Fab
            color={'secondary'}
            aria-label={'upload'}
            variant={'extended'}
            className={styles.fab}
            onClick={() => setDialogOpen(true)}
          >
            <UploadIcon sx={{ mr: 1 }} />
            Upload your reports
          </Fab>
        </>
      ) : null}
      {props.markers && props.local === false
        ? props.markers.map((item, index) => (
            <LiveMarker key={'liveMarker' + index} item={item} />
          ))
        : null}
    </MapContainer>
  );
}
