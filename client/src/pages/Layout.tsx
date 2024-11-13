import { Outlet } from 'react-router-dom';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  // NavigationMenuLink,
  // NavigationMenuContent,
  // NavigationMenuIndicator,
  // NavigationMenuTrigger,
  // NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import CustomLink from '@/router/CustomLink';

const Layout = () => {
  return (
    <>
      <header className="border border-black">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <CustomLink href="/" className={navigationMenuTriggerStyle()}>
                Home
              </CustomLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <CustomLink
                href="/protected"
                className={navigationMenuTriggerStyle()}>
                Protected
              </CustomLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <CustomLink
                href="/admin"
                className={navigationMenuTriggerStyle()}>
                Admin
              </CustomLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <CustomLink
                href="/login"
                className={navigationMenuTriggerStyle()}>
                Log in
              </CustomLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <CustomLink
                href="/signup"
                className={navigationMenuTriggerStyle()}>
                Sign up
              </CustomLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <main className="border border-black p-2">
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
