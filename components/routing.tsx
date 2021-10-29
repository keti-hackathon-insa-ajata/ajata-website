import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const OSMR_URL = 'http://127.0.0.1:5000/route/v1';

const createRoutineMachineLayer = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return L.Routing.control({
    position: 'topleft',
    waypoints: [L.latLng(52.5091, 13.4178), L.latLng(52.5015, 13.3831)],
    lineOptions: {
      styles: [
        {
          color: '#ff0000',
        },
      ],
    },
    routeWhileDragging: true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    router: L.Routing.osrmv1({
      serviceUrl: OSMR_URL,
      profile: 'bike',
    }),
  });
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
