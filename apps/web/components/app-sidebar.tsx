"use client"
import React from 'react'
import { SidebarContent,Sidebar,
       SidebarGroup,
       SidebarGroupLabel, 
       SidebarMenu, 
       SidebarMenuItem, 
       SidebarMenuButton, 
       SidebarFooter} from './ui/sidebar'
import { Calendar, ChevronUp, Home, Inbox, Search, Settings, User2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Transaction",
      url: "/transaction",
      icon: Inbox,
    },
    {
      title: "P2P transfer",
      url: "/p2ptransfer",
      icon: Calendar,
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Inbox,
      }
  ]

 function AppSideBar() {
  const { 
    data: session, 
    isPending, //loading state
    error, //error object
    refetch //refetch the session
} = authClient.useSession() 
if(!session){
  toast('user not found')
}

    return (
        <Sidebar>
             <SidebarContent className='flex flex-col justify-between' >
            <SidebarGroup>
                <SidebarGroupLabel className='text-xl h-20 mx-2' >Application</SidebarGroupLabel>
                <SidebarMenu>
                {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive className='h-12 border my-1' asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className='text-lg'>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
                </SidebarMenu>
                
            </SidebarGroup>
            <SidebarFooter className='flex justify-center items-center h-20 '>
                <DropdownMenu  >
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className='h-full'>
                    <User2  /> {session?.user.name}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </SidebarFooter>
            </SidebarContent>
    </Sidebar>
    )
}

export default AppSideBar
