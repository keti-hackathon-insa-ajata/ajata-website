import { OverridableComponent } from '@mui/material/OverridableComponent';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import MapIcon from '@mui/icons-material/Map';
import { SvgIconTypeMap } from '@mui/material';

export const MENU_ITEMS: Array<{
  id: string;
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & { muiName: string };
  route: string;
}> = [
  {
    id: 'map',
    text: 'Map',
    icon: MapIcon,
    route: '/',
  },
  {
    id: 'about',
    text: 'About',
    icon: InfoIcon,
    route: 'about',
  },
  {
    id: 'contact',
    text: 'Contact',
    icon: MailIcon,
    route: 'contact',
  },
  {
    id: 'github',
    text: 'GitHub',
    icon: GitHubIcon,
    route: 'https://github.com/keti-hackathon-insa-ajata/ajata-website',
  },
];
