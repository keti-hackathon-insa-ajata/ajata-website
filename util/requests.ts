import { LocalDangerReports, LocalInformationNode } from '../types/api';
import Links from '../constants/links';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const publishToOM2M = async (data: undefined | LocalDangerReports) => {
  return new Promise(
    (resolve: (val: unknown) => void, reject: (e: string) => void) => {
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
              if (!response.ok) {
                reject(
                  'Could not send marker to OM2M: ' + JSON.stringify(marker)
                );
              } else {
                syncMarker(marker).then((response) => {
                  if (!response.ok) {
                    reject(
                      'Could not change sync boolean of marker: ' +
                        JSON.stringify(marker)
                    );
                  }
                });
              }
            });
          });
          resolve(undefined);
        } else {
          reject('Nothing to sync');
        }
      }
    }
  );
};

function syncMarker(marker: LocalInformationNode) {
  return fetch(Links.localMarkers, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([
      {
        ...marker,
        sync: true,
      },
    ]),
  });
}
