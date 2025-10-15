import { Anek_Tamil } from "next/font/google";
import "./globals.css";

const AnekTamil = Anek_Tamil({
  variable: "--font-Anek-Tamil",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${AnekTamil.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
