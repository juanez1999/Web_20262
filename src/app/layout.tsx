import type { ReactNode } from "react";
import  AppHeader from "../components/app-header/app-header";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}