import React, {useEffect, useState} from 'react';
import {Menu, X} from 'lucide-react';
import {siteConfig} from '../config/site';
import {Link, useRouter} from '../router/RouterContext';
import {ICleanLogo} from './ICleanLogo';

interface NavbarProps {
  onRequestQuote: () => void;
  onGlobalBackground?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRequestQuote,
  onGlobalBackground = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {isActive} = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solidHeader = isScrolled || isMobileMenuOpen;
  const useLightHeaderSurface = solidHeader && !onGlobalBackground;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        useLightHeaderSurface
          ? 'bg-white/95 backdrop-blur-md border-b border-[#17251D]/10 shadow-sm'
          : solidHeader && onGlobalBackground
            ? 'bg-[#072215]/88 backdrop-blur-md border-b border-white/12 shadow-sm'
            : 'bg-gradient-to-b from-[#061F13]/75 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark only */}
        <Link
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="iClean — Ir para o início"
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#78D34B] rounded-md shrink-0"
        >
          <ICleanLogo variant={useLightHeaderSurface ? 'default' : 'inverted'} />
        </Link>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7"
        >
          {siteConfig.navigation.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={active ? 'page' : undefined}
                className={`text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#78D34B] rounded-sm ${
                  useLightHeaderSurface
                    ? active
                      ? 'text-[#0C482B] font-semibold underline decoration-2 decoration-[#78D34B]'
                      : 'text-[#17251D]/85 hover:text-[#0C482B]'
                    : active
                      ? 'text-[#78D34B] font-semibold underline decoration-2 decoration-[#78D34B]'
                      : 'text-white/90 hover:text-[#78D34B]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary CTA + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onRequestQuote();
            }}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#78D34B] text-[#092E1B] hover:bg-[#87DF5A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78D34B]"
          >
            Solicitar Orçamento
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className={`md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78D34B] ${
              useLightHeaderSurface
                ? 'text-[#0C482B] hover:bg-[#F7F9F7]'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#17251D]/10 px-4 py-5 space-y-2 shadow-lg">
          <nav aria-label="Navegação móvel" className="flex flex-col space-y-1">
            {siteConfig.navigation.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-3 text-base rounded-lg transition-colors ${
                    active
                      ? 'bg-[#0C482B]/8 text-[#0C482B] font-semibold'
                      : 'font-medium text-[#17251D] hover:text-[#0C482B] hover:bg-[#F7F9F7]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full py-3 px-5 text-base font-semibold rounded-lg bg-[#0C482B] text-white hover:bg-[#093A22] transition-colors cursor-pointer"
            >
              Solicitar Orçamento
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
