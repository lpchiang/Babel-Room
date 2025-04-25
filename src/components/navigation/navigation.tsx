"use client"

import Item from "./item-type"
import { DashboardItems } from "./constants"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import ListItem from "./list-item"
import { Avatar } from "@radix-ui/react-avatar"

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {DashboardItems.map((item: Item) => (
                <>
                  <ListItem
                    key={item.key}
                    title={item.title}
                    href={item.href}
                  >
                  </ListItem>
                </>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <a href="/docs">
              Documentation
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          Notification
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Avatar>Avatar</Avatar>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}