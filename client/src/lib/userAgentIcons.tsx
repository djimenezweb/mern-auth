import {
  Bot,
  Monitor,
  MonitorSmartphone,
  Smartphone,
  Tablet,
  Tv,
  Cpu,
  Globe,
} from 'lucide-react';

import Icon from '@mdi/react';
import {
  mdiMicrosoftWindows,
  mdiFirefox,
  mdiApple,
  mdiLinux,
  mdiAndroid,
  mdiGoogleChrome,
  mdiOpera,
  mdiMicrosoftEdge,
  mdiAppleSafari,
} from '@mdi/js';

const userAgentDeviceIcons = {
  tv: <Tv />,
  tablet: <Tablet />,
  phone: <Smartphone />,
  desktop: <Monitor />,
  bot: <Bot />,
  default: <MonitorSmartphone />,
};

const userAgentOSIcons = {
  'Windows 10 or 11': <Icon path={mdiMicrosoftWindows} size="24px" />,
  'Windows 7 or 8': <Icon path={mdiMicrosoftWindows} size="24px" />,
  'Windows Vista': <Icon path={mdiMicrosoftWindows} size="24px" />,
  'Windows 2003': <Icon path={mdiMicrosoftWindows} size="24px" />,
  'Windows XP': <Icon path={mdiMicrosoftWindows} size="24px" />,
  'Windows 2000': <Icon path={mdiMicrosoftWindows} size="24px" />,
  'OS X $1.$2': <Icon path={mdiApple} size="24px" />,
  iPad: <Icon path={mdiApple} size="24px" />,
  iPhone: <Icon path={mdiApple} size="24px" />,
  Linux: <Icon path={mdiLinux} size="24px" />,
  Googlebot: <Bot />,
  Android: <Icon path={mdiAndroid} size="24px" />,
  default: <Cpu />,
};

const userAgentNameIcons = {
  chrome: <Icon path={mdiGoogleChrome} size="24px" />,
  firefox: <Icon path={mdiFirefox} size="24px" />,
  edge: <Icon path={mdiMicrosoftEdge} size="24px" />,
  opera: <Icon path={mdiOpera} size="24px" />,
  safari: <Icon path={mdiAppleSafari} size="24px" />,
  konqueror: <Globe />,
  epiphany: <Globe />,
  msie: <Globe />,
  curl: <Globe />,
  maxthon: <Globe />,
  default: <Globe />,
};

export { userAgentDeviceIcons, userAgentOSIcons, userAgentNameIcons };
