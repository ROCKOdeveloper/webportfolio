import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import * as Switch from "./components/Switch";
import { IconMoon, IconSun } from "./components/Icons";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Projects from "./views/Project";
import Experience from "./views/Experience";
import Blog from "./views/Blog";
import NotFound from "./views/NotFound";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
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

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

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
    <Router>
      <div
        className={`relative h-screen w-screen p-5 grid grid-cols-1 md:grid-cols-3 gap-4 font-sans ${
          isDarkMode
            ? "bg-neutral-950/95 text-neutral-50"
            : "bg-neutral-50/95 text-neutral-950"
        }`}
      >
        {/* Porfile */}
        <div 
          className={`p-5 rounded h-full backdrop-blur-sm shadow ${
            isDarkMode
              ? "bg-transparent shadow-neutral-800 text-neutral-50"
              : "bg-transparent shadow-neutral-300 text-neutral-950"
          }`}
        >
          <div className="flex flex-col items-start">
            <h1 className="text-xs">Luis Eduardo Junior Rodriguez Reales</h1>
            <p className="text-2xl font-bold">nickname</p>
            <p className="text-ms">frase</p>
            <p className="text-base">descripcion</p>
            <div>
              seré una botones
            </div>
            <p className="text-base">conocimientos</p>
          </div>
        </div>

        {/* Dashboard */}
        <div
          className={`p-5 rounded md:col-span-2 backdrop-blur-sm shadow ${
            isDarkMode
              ? "bg-transparent shadow-neutral-800 text-neutral-50"
              : "bg-transparent shadow-neutral-300 text-neutral-950"
          }`}
        >
          <header>
            <nav>
              <ul>
                <li>
                  <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/webportfolio/Projects">Proyectos</NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/webportfolio/Experience">Experiencia</NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/webportfolio/Blog">Blog</NavLink>
                </li>
              </ul>
            </nav>
          </header>
          <Routes>
            <Route path="/webportfolio/" element={<Projects />} />
            <Route path="/webportfolio/Projects" element={<Projects />} />
            <Route path="/webportfolio/Experience" element={<Experience />} />
            <Route path="/webportfolio/Blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* chance theme */}
        <div
          className={`z-50 rounded-full bottom-0 right-0 fixed m-4 ${
            isDarkMode
              ? "bg-neutral-950 text-neutral-50"
              : "bg-neutral-50 text-neutral-950"
          }`}
        >
          <Switch.Root
            checked={isDarkMode}
            onCheckedChange={toggleDarkMode}
            isDarkMode={isDarkMode}
          >
            <Switch.Thumb ref={ref} isDarkMode={isDarkMode}>
              {isDarkMode ? <IconMoon /> : <IconSun />}
            </Switch.Thumb>
          </Switch.Root>
        </div>
      </div>
    </Router>
  );
}
