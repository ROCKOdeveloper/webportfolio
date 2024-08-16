import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import * as Switch from "./components/Switch";
import { IconMoon, IconSun } from "./components/Icons";
import "./index.css";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const ref = useRef(null);

  const toggleDarkMode = async (isDarkMode) => {
    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsDarkMode(isDarkMode);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setIsDarkMode(isDarkMode);
      });
    }).ready;

    // Obtener la posición del elemento que activa el cambio
    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    // Aplicar la animación usando View Transitions API
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className={`h-screen w-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-black'}`}>
      <Switch.Root checked={isDarkMode} onCheckedChange={toggleDarkMode}>
        <Switch.Thumb ref={ref}>
          {isDarkMode ? <IconMoon /> : <IconSun />}
        </Switch.Thumb>
      </Switch.Root>
    </div>
  );
}
