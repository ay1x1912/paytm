import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import NavBar from "@/components/navBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSideBar from "@/components/app-sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <SidebarProvider>
    
      <AppSideBar />
        <main className="w-screen h-screen flex flex-col">
    
        <SidebarTrigger className="size-10 border m-4"/>
             <NavBar/>
              {children}
               <Toaster />
   
        


        </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
