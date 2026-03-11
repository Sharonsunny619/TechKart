import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useConfigContext } from '../context/ConfigContext';
import { useThemeContext } from '../context/ThemeContext';
import TechKart from '../icons/tech_kart';
import Moon from '../icons/moon';
import Sun from '../icons/sun';

export function Navbar() {
  const { config } = useConfigContext();
  const { themeName, toggleTheme } = useThemeContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClasses = 'no-underline text-foreground font-medium text-[0.95rem] py-2 px-4 rounded-lg transition-colors duration-200 whitespace-nowrap';

  return (
    <>
      <nav className="navbar grid grid-cols-[1fr_auto_1fr] items-center px-12 py-4 bg-surface border-b border-border sticky top-0 z-100">
         <NavLink to="/" className="flex items-center no-underline text-foreground">
          <span className="text-[1.4rem] font-black tracking-tight uppercase flex items-center gap-1">
           <TechKart/> {config.siteName}
          </span>
        </NavLink>

         <div className="navbar__links flex items-center gap-1">
          {config.navigation.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }: { isActive: boolean }) =>
                `${linkClasses} ${isActive ? 'text-primary font-semibold' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

         <div className="flex items-center justify-end gap-4">
          <button
            onClick={toggleTheme}
            className="theme-toggle bg-transparent border border-border rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-lg text-foreground transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {themeName === 'light' ? <Moon/> : <Sun/>}
          </button>

          <button
            className="navbar__hamburger flex md:hidden bg-transparent border-none cursor-pointer flex-col gap-1 p-2"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <span className="block w-5.5 h-0.5 bg-foreground rounded-sm transition-all duration-200" />
            <span className="block w-5.5 h-0.5 bg-foreground rounded-sm transition-all duration-200" />
            <span className="block w-5.5 h-0.5 bg-foreground rounded-sm transition-all duration-200" />
          </button>
        </div>
      </nav>

       {mobileOpen && (
        <div className="navbar__mobile-menu fixed top-16 left-0 right-0 bg-surface border-b border-border p-4 flex flex-col gap-1 z-99">
          {config.navigation.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }: { isActive: boolean }) =>
                `${linkClasses} py-4 ${isActive ? 'text-primary font-semibold bg-primary/5' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
