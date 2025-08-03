import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { Zen_Dots } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Container from "@mui/material/Container";
import Navbar from "./(components)/Navbar";
import { useMediaQuery } from "@mui/material";

const zen_dots = Zen_Dots({
  weight: "400",
  variable: "--font-zen-dots",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visten",
  description: "Visten is a web application where I put random features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={zen_dots.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
