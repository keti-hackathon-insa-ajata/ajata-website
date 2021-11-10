import { LocalDangerReports, LocalInformationNode } from '../types/api';
import Links from '../constants/links';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const publishToOM2M = async (
  data: undefined | LocalDangerReports,
  onError: (error: string) => void
) => {
  if (data) {
    const filteredData = data.filter((m) => !m.sync);
    if (filteredData.length > 0) {
      filteredData.forEach(async (marker) => {
        const om32mMarker = { ...marker };
        delete om32mMarker.id;
        delete om32mMarker.sync;
        // POST to OM2M
        const body =
          '{"m2m:cin":{"cnf":"application/json","con":"' +
          JSON.stringify(om32mMarker).replaceAll('"', '\\"') +
          '"}}';
        fetch(Links.om2mEndpoint, {
          method: 'POST',
          headers: {
            'X-M2M-Origin': 'admin:admin',
            'Content-Type': 'application/json;ty=4',
          },
          body: body,
        }).then((response) => {
          if (response.ok) {
            onError('Could not sync marker: ' + JSON.stringify(marker));
          } else {
            syncMarker(marker, onError);
          }
        });
      });
    } else {
      onError('Nothing to sync');
    }
  }
};

function syncMarker(
  marker: LocalInformationNode,
  onError: (error: string) => void
) {
  fetch(Links.localMarkers, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([
      {
        ...marker,
        sync: true,
      },
    ]),
  }).then((response) => {
    if (!response.ok) {
      onError(
        'Could not change sync boolean of marker: ' + JSON.stringify(marker)
      );
    }
  });
}
