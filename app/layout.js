import { Anek_Tamil } from "next/font/google";
import "./globals.css";

const AnekTamil = Anek_Tamil({
  variable: "--font-Anek-Tamil",
  subsets: ["latin"],
});

// ✅ Add metadata section here
export const metadata = {
  title: "Wepzite", // You can change this
  description: "Wepzite Blog",
  verification: {
    google: "WZ3lArZgFuE1KvmL5ybnlHNfwUzIsu8wGySj_0FTL7A", // 👈 Your code
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${AnekTamil.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}