import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTheme } from "../hooks/ThemeContext";

export default function Layout({ children }) {
  const { theme } = useTheme();

   return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />
      <main className="p-4">{children}</main>
      <Footer />
    </div>
  );
}
