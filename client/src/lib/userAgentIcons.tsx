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

import {
  FaWindows,
  FaApple,
  FaAndroid,
  FaChrome,
  FaFirefoxBrowser,
  FaEdge,
  FaOpera,
  FaSafari,
} from 'react-icons/fa';
import { PiLinuxLogo } from 'react-icons/pi';

const userAgentDeviceIcons = {
  tv: <Tv />,
  tablet: <Tablet />,
  phone: <Smartphone />,
  desktop: <Monitor />,
  bot: <Bot />,
  unknown: <MonitorSmartphone />,
};

const userAgentOSIcons = {
  'Windows 10 or 11': <FaWindows size="1.5rem" />,
  'Windows 7 or 8': <FaWindows size="1.5rem" />,
  'Windows Vista': <FaWindows size="1.5rem" />,
  'Windows 2003': <FaWindows size="1.5rem" />,
  'Windows XP': <FaWindows size="1.5rem" />,
  'Windows 2000': <FaWindows size="1.5rem" />,
  'OS X $1.$2': <FaApple size="1.5rem" />,
  iPad: <FaApple size="1.5rem" />,
  iPhone: <FaApple size="1.5rem" />,
  Linux: <PiLinuxLogo size="1.5rem" />,
  Googlebot: <Bot />,
  Android: <FaAndroid size="1.5rem" />,
  unknown: <Cpu />,
};

const userAgentNameIcons = {
  chrome: <FaChrome size="1.5rem" />,
  firefox: <FaFirefoxBrowser size="1.5rem" />,
  edge: <FaEdge size="1.5rem" />,
  opera: <FaOpera size="1.5rem" />,
  safari: <FaSafari size="1.5rem" />,
  konqueror: <Globe />,
  epiphany: <Globe />,
  msie: <Globe />,
  curl: <Globe />,
  maxthon: <Globe />,
  unknown: <Globe />,
};

export { userAgentDeviceIcons, userAgentOSIcons, userAgentNameIcons };
