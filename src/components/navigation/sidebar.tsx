"use client";
import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    FilePlus,
    FolderOpen,
    Search,
    Settings,
    LogOut,
    Menu,
    X,
    FileText,
    Star,
    Clock
} from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../../public/logo.svg";
import { cn } from "@/lib/utils";

// Define your navigation items
const navItems = [
    { title: "All Notes", url: "/notes", icon: FileText },
    { title: "Create New", url: "/notes/new", icon: FilePlus },
    { title: "Folders", url: "/notes/folders", icon: FolderOpen },
    { title: "Starred", url: "/notes/starred", icon: Star },
    { title: "Recent", url: "/notes/recent", icon: Clock },
    { title: "Search", url: "/notes/search", icon: Search },
    { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile Toggle Button - Only visible on small screens */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed z-50 top-4 left-4 bg-white p-2 rounded-lg shadow-md"
                aria-label="Toggle sidebar"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Sidebar */}
            <Sidebar
                variant="inset"
                className={cn(
                    "border-r border-gray-100 bg-gray-50 transition-all duration-300 ease-in-out",
                    "fixed lg:relative", // Fixed on mobile, relative on desktop
                    "w-72 lg:w-80", // Increased width (was likely smaller before)
                    isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full lg:translate-x-0", // Show/hide on mobile based on state
                    "z-40 h-full"
                )}
            >
                <SidebarHeader className="px-6 py-5 flex flex-col items-center space-y-3 border-b border-gray-100 bg-white">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <Image
                                src={logo}
                                alt="Logo"
                                width={50}
                                height={50}
                                className="rounded-lg shadow-sm"
                            />
                            <div>
                                <h1 className="text-xl font-semibold text-gray-800">Notewise</h1>
                                <p className="text-xs text-gray-500">Smart note-taking app</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                            aria-label="Close sidebar"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                </SidebarHeader>

                <SidebarContent className="px-3 py-4">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navItems.map((item) => {
                                    const isActive = pathname === item.url;
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                isActive={isActive}
                                                asChild
                                                className={cn(
                                                    "transition-all duration-200 my-1",
                                                    isActive
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "hover:bg-gray-100 text-gray-700"
                                                )}
                                                onClick={() => {
                                                    // Close sidebar on mobile when menu item is clicked
                                                    if (window.innerWidth < 1024) {
                                                        setIsOpen(false);
                                                    }
                                                }}
                                            >
                                                <Link href={item.url} className="flex items-center px-4 py-2.5 rounded-lg">
                                                    <item.icon className={cn(
                                                        "h-5 w-5 mr-3",
                                                        isActive ? "text-blue-600" : "text-gray-500"
                                                    )} />
                                                    <span className="font-medium">{item.title}</span>

                                                    {item.title === "Create New" && (
                                                        <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                            New
                                                        </span>
                                                    )}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <div className="mt-auto pt-6 border-t border-gray-100 mt-6">
                        <div className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                            <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-800">Need help?</h4>
                                <p className="text-xs text-gray-600">Check our documentation</p>
                            </div>
                            <Link href="/help" className="text-blue-600 hover:text-blue-700">
                                <LogOut className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </SidebarContent>
            </Sidebar>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}
        </>
    );
}