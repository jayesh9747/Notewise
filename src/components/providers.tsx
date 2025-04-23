import { ReactNode } from "react";
import { SidebarProvider } from "./ui/sidebar";
import { ReactQueryClientProvider } from "./react-query-client-provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "./ui/sonner";
// import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryClientProvider>
      {/* <SessionProvider> */}
        <NextTopLoader color="#EC9226" />
        <SidebarProvider>{children}</SidebarProvider>
        <Toaster />
      {/* </SessionProvider> */}
    </ReactQueryClientProvider>
  );
};

export default Providers;
