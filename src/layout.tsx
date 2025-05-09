import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/sidebar/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  
  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar />
      <main className="w-screen max-w-full p-8">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
