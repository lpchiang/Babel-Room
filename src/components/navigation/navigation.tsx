"use client"

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import LogoWrapper from "./logo-wrapper"
import MenuItemsWrapper from "./menu-items-wrapper"

export function NavigationMenuDemo() {
  return (
    <NavigationMenu className="bg-blue-700">
      <NavigationMenuList className="w-screen px-16 py-4 flex flex-row flex-nowrap justify-between">
        <LogoWrapper />
        <MenuItemsWrapper />
      </NavigationMenuList>
    </NavigationMenu>
  )
}