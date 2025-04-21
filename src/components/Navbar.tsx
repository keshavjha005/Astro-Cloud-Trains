
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from './AuthModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound, LogOut, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Horoscope', href: '/horoscope' },
    { name: 'Zodiac Signs', href: '/zodiac' },
    { name: 'Tarot', href: '/tarot' },
    { name: 'About', href: '/about' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 cosmic-glass shadow-lg' : 'py-4 bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <div className="flex items-center justify-center rounded-full overflow-hidden bg-cosmic-accent/20 w-10 h-10">
                  <span className="text-xl font-bold animate-float">✨</span>
                </div>
                <span className="ml-2 text-xl font-bold text-cosmic-light text-glow">Astral Access</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-cosmic-light/80 hover:text-cosmic-light rounded-md transition-colors hover:bg-cosmic-accent/10"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Authentication Buttons/Menu - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative cosmic-border bg-cosmic-dark/40 hover:bg-cosmic-accent/20">
                      <span className="mr-2">{user.username}</span>
                      <UserRound className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="cosmic-glass w-56">
                    <DropdownMenuLabel>My Cosmic Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>My Readings</DropdownMenuItem>
                    {user.isAdmin && <DropdownMenuItem>Admin Panel</DropdownMenuItem>}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-cosmic-accent hover:bg-cosmic text-cosmic-dark"
                >
                  Enter Portal
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" onClick={toggleMenu} size="icon">
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-cosmic-light" />
                ) : (
                  <Menu className="h-6 w-6 text-cosmic-light" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="cosmic-glass h-full w-full flex flex-col">
          <div className="flex justify-end p-4">
            <Button variant="ghost" onClick={toggleMenu} size="icon">
              <X className="h-6 w-6 text-cosmic-light" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center justify-center flex-grow space-y-6 p-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xl text-cosmic-light hover:text-cosmic-accent transition-colors py-2 px-4"
                onClick={toggleMenu}
              >
                {link.name}
              </a>
            ))}
            
            {user ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="text-cosmic-light text-center">
                  <span>Welcome, {user.username}</span>
                </div>
                <Button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  variant="outline"
                  className="w-full border-cosmic-light/30 text-cosmic-light hover:bg-cosmic-accent/20"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  toggleMenu();
                }}
                className="w-3/4 bg-cosmic-accent hover:bg-cosmic text-cosmic-dark"
              >
                Enter Portal
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
