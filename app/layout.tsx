import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "Notes",
  description: "App Router + TanStack Query + Parallel routes",
};

export default function RootLayout({
  children,
  modal,             // <-- додано
}: {
  children: React.ReactNode;
  modal: React.ReactNode; // <-- обов’язково типізувати
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}
