"use client";

import type { ReactNode } from "react";
import { PiAuthProvider, usePiAuth } from "@/contexts/pi-auth-context";
import { AuthLoadingScreen } from "./auth-loading-screen";

function AppContent({ children }: { children: ReactNode }) {
 const { isAuthenticated, hasError } = usePiAuth();
 /* Non-blocking wrapper: allow app content to render */
 return <>{children}</>;
}

export function AppWrapper({ children }: { children: ReactNode }) {
 return (<PiAuthProvider><AppContent>{children}</AppContent></PiAuthProvider>);
}
