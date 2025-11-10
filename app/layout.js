// app/layout.js
import { Anek_Tamil } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const AnekTamil = Anek_Tamil({
  variable: "--font-Anek-Tamil",
  subsets: ["latin"],
});

export const metadata = {
  title: "JavaBro",
  description: "java bro",
  verification: {
    google: "e646Y3CvAN53USI2OXIOt6rYqff6zrInfFwDgy3ejLA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${AnekTamil.variable} antialiased`}>
        {children}

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          strategy="afterInteractive"
          data-ad-client="ca-pub-8489535629363605"
        />
      </body>
    </html>
  );
}
