'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Sidebar } from '@/components/ui/sidebar'

import { Calendar, Home as Homee, Inbox, Search, Settings } from 'lucide-react'

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Side from '@/components/Side'

const items = [
  {
    title: 'Home',
    url: '#',
    icon: Homee,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
]

export default function Home() {
  const { user, handleLogout } = useAuth()

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Side />

      {/*<span>{user?.email || null}</span>*/}
      {/*<Button onClick={handleLogout}>logout</Button>*/}
    </div>
  )
}
