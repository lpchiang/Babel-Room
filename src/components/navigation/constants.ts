import navItem from "./nav-item-type";

const DASHBOARD: navItem = {
  key: "dashboard",
  title: "Dashboard",
  url: new URL("https://www.apple.com/")
}

const FORUM: navItem = {
  key: "forum",
  title: "Forum",
  url: new URL("https://www.apple.com/")
}

const PROFILE: navItem = {
  key: "profile",
  title: "My profile",
  url: new URL("https://www.apple.com/")
}

export const navItems: navItem[] = [DASHBOARD, FORUM, PROFILE]