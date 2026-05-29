import "./globals.css";

import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";


import QueryProvider from "../Providers/QueryProvider";

export const metadata = {
  title: "EnglishHub",
  description: "English Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">

        
         
            <QueryProvider>
            <Navbar />  
              {children}
             

              

              <Toaster position="top-center" />

            </QueryProvider>
          
        

      </body>
    </html>
  );
}