import { OverridableComponent } from '@mui/material/OverridableComponent';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import { SvgIconTypeMap } from '@mui/material';

export const MENU_ITEMS: Array<{
  id: string;
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & { muiName: string };
  route: string;
}> = [
  {
    id: 'about',
    text: 'About',
    icon: InfoIcon,
    route: '',
  },
  {
    id: 'contact',
    text: 'Contact',
    icon: MailIcon,
    route: '',
  },
  {
    id: 'github',
    text: 'GitHub',
    icon: GitHubIcon,
    route: '',
  },
];
