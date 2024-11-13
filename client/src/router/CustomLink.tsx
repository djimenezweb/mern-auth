import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Link, LinkProps, useLocation } from 'react-router-dom';

const CustomLink = ({
  children,
  href,
  ...rest
}: {
  children: React.ReactNode;
  href: string;
} & Omit<LinkProps, 'to'>) => {
  const location = useLocation();
  const isActive = href === location.pathname;

  return (
    <NavigationMenuLink asChild active={isActive}>
      <Link to={href} {...rest}>
        {children}
      </Link>
    </NavigationMenuLink>
  );
};
export default CustomLink;
