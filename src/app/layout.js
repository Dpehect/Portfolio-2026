import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/transitionProvider";
import BackgroundMusic from "@/components/BackgroundMusic";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lama Dev Portfolio App",
  description: "The best animated portfolio page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TransitionProvider>{children}</TransitionProvider>
        <BackgroundMusic />
      </body>
    </html>
  );
}
