"use client"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import {
    CreditCardIcon,
    InboxIcon,
    LayoutDashboardIcon,
    LibraryBigIcon,
    Mic,
    PaletteIcon
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from "@workspace/ui/components/sidebar"
import { cn } from "@workspace/ui/lib/utils"

const customerSupportItems = [
    {
        title: "Conversations",
        url: "/conversations",
        icon: InboxIcon,
    },
    {
        title: "Knowldge Base",
        url: "/files",
        icon: LibraryBigIcon,
    },
]

const configurationItems = [
    {
        title: 'Widget Customization',
        url: '/customization',
        icon: PaletteIcon,
    },
    {
        title: "Integrations",
        url: "/integrations",
        icon: LayoutDashboardIcon,
    },
    {
        title: "Voice Assistant",
        url: "/plugins/vapi",
        icon: Mic
    }
]

export const DashboardSidebar = () => {

    const pathname = usePathname()
    const isActive = (url: string) => {
        if(url === "/") {
            return pathname === "/"
        }

        return pathname.startsWith(url)
    }

    return (
        <Sidebar className="group" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <OrganizationSwitcher hidePersonal skipInvitationScreen />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* Customer Support */}
                <SidebarGroup>
                    <SidebarGroupLabel>Customer Support</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {customerSupportItems.map((item) => (
                                <SidebarMenuItem key={item.title}><SidebarMenuButton asChild tooltip={item.title} isActive={isActive(item.url)}>
                                    <Link href={item.url}>
                                        <item.icon className="size-4" />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* Configuration */}
                <SidebarGroup>
                    <SidebarGroupLabel>Configuration</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {configurationItems.map((item) => (
                                <SidebarMenuItem key={item.title}><SidebarMenuButton asChild tooltip={item.title} isActive={isActive(item.url)}>
                                    <Link href={item.url}>
                                        <item.icon className="size-4" />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}