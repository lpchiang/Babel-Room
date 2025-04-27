import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import AvatarButton from "./avatar-button"
import NotificationsPopoverWrapper from "./notifications-popover-wrapper"
import { Avatar, AvatarImage } from "../ui/avatar"
import jare from "./assets/Jare.jpg"

const MenuItemsWrapper: React.FC = () => {
  return (
    <div className="flex flex-row flex-nowrap justify-around gap-4 content-center *:text-3xl">
      <NavigationMenuItem>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          <a href="/docs">
            Dashboard
          </a>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          <a href="/docs">
            Forum
          </a>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NotificationsPopoverWrapper />
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          <a href="/docs" className="flex flex-row gap-4">
            <Avatar>
              <AvatarImage src={jare}/>
            </Avatar>
            Username
          </a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </div>
  )
}

export default MenuItemsWrapper;