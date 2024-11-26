import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  userAgentDeviceIcons,
  userAgentNameIcons,
  userAgentOSIcons,
} from '@/lib/userAgentIcons';
import { Session } from '@/types';

type Props = {
  device: Session['userAgentDevice'];
  os: Session['userAgentOS'];
  browser: Session['userAgentName'];
};

export default function SessionAgentIcons({ device, os, browser }: Props) {
  return (
    <div className="h-full flex gap-3 items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            {userAgentDeviceIcons[device] || userAgentDeviceIcons.unknown}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="capitalize">{device}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{userAgentOSIcons[os] || userAgentOSIcons.unknown}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{os}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{userAgentNameIcons[browser] || userAgentNameIcons.unknown}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="capitalize">{browser}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
