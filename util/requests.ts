import { DangerReports } from '../types/api';
import Links from '../constants/links';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function publishToOM2M(data: DangerReports) {
  // TODO add OM2M overhead
  const convertedData = JSON.stringify(data);

  fetch(Links.om2mEndpoint, {
    method: 'POST',
    body: convertedData,
  });
}
