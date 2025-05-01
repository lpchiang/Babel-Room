import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import NotificationsPopoverWrapper from "./notifications-popover-wrapper"
import { Avatar, AvatarImage } from "../ui/avatar"
import jare from "./assets/Jare.jpg"

const MenuItemsWrapper: React.FC = () => {
  return (
    <div className="flex flex-row flex-nowrap justify-around gap-4 content-center">
      <NavigationMenuItem>
        <NavigationMenuLink href="docs" className={navigationMenuTriggerStyle()}>
          Dashboard
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="forum" className={navigationMenuTriggerStyle()}>
          Forum
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NotificationsPopoverWrapper />
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="profile" className={navigationMenuTriggerStyle()}>
          <div className="flex flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage src={jare}/>
            </Avatar>
            Username
          </div>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </div>
  )
}

export default MenuItemsWrapper;