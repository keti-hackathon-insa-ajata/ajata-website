import { MapContainer, TileLayer, MapContainerProps } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DangerReports, LocalDangerReports } from '../types/api';
import { LiveMarker } from './live-marker';
import { LocalMarker } from './local-marker';
import { Fab } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import styles from '../styles/Map.module.css';

// Images are copied from node_modules/leaflet/dist/images to public/leaflet_images
import L from 'leaflet';
import Links from '../constants/links';
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
        <Fab
          color={'secondary'}
          aria-label={'upload'}
          variant={'extended'}
          className={styles.fab}
          onClick={async () => {
            for (const marker of props.markers) {
              delete marker.id;
              // POST to OM2M
              const body =
                '{"m2m:cin":{"cnf":"application/json","con":"' +
                JSON.stringify(marker).replaceAll('"', '\\"') +
                '"}}';
              const response = await fetch(Links.om2mEndpoint, {
                method: 'POST',
                headers: {
                  'X-M2M-Origin': 'admin:admin',
                  'Content-Type': 'application/json;ty=4',
                },
                body: body,
              });
              if (!response.ok) {
                console.log('Could not sync marker: ' + JSON.stringify(marker));
              } else {
                // TODO Change sync column
                marker.sync = true;
                const response = await fetch(Links.localMarkers, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(marker),
                });
                if (!response.ok) {
                  console.log(
                    'Could not change sync boolean of marker: ' +
                      JSON.stringify(marker)
                  );
                }
              }
            }
          }}
        >
          <UploadIcon sx={{ mr: 1 }} />
          Upload your reports
        </Fab>
      ) : null}
      {props.markers && props.local === false
        ? props.markers.map((item, index) => (
            <LiveMarker key={'liveMarker' + index} item={item} />
          ))
        : null}
    </MapContainer>
  );
}
