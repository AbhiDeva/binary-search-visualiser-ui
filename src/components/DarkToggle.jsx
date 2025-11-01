import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <motion.button
      whileTap={{ rotate: 180 }}
      onClick={() => setDark(!dark)}
      className="absolute top-5 right-5 text-gray-400 hover:text-white"
    >
      {dark ? <Sun size={22} /> : <Moon size={22} />}
    </motion.button>
  );
}
