import {lazy, Suspense, useState} from 'react';
import {Footer} from './components/Footer';
import {Navbar} from './components/Navbar';
import {WhatsAppFloatingButton} from './components/WhatsAppFloatingButton';
import heroGlobalBackground from './assets/images/hero_commercial_cleaning_1794778185906.jpg';
import {HomePage} from './pages/HomePage';
import {Link, RouterProvider, useRouter} from './router/RouterContext';

const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({default: m.ServicesPage}))
);
const ServiceDetailPage = lazy(() =>
  import('./pages/ServiceDetailPage').then((m) => ({
    default: m.ServiceDetailPage,
  }))
);
const EventsPage = lazy(() =>
  import('./pages/EventsPage').then((m) => ({default: m.EventsPage}))
);
const GalleryPage = lazy(() =>
  import('./pages/GalleryPage').then((m) => ({default: m.GalleryPage}))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({default: m.AboutPage}))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({default: m.ContactPage}))
);

function RouteLoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white pt-24 pb-16">
      <div className="flex flex-col items-center gap-3 text-sm text-[#17251D]/70">
        <div
          aria-hidden="true"
          className="w-8 h-8 rounded-full border-2 border-[#0C482B]/25 border-t-[#0C482B] animate-spin"
        />
        <span>A carregar página...</span>
      </div>
    </div>
  );
}

function AppShell() {
  const {pathname, navigate} = useRouter();
  const [selectedServiceForQuote, setSelectedServiceForQuote] =
    useState<string>('');
  const isHome = pathname === '/';

  const handleGlobalQuoteAction = () => {
    if (pathname === '/') {
      const el = document.getElementById('orcamento');
      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
        return;
      }
    }
    if (pathname === '/eventos') {
      const el = document.getElementById('orcamento-evento');
      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
        return;
      }
    }
    if (pathname === '/servicos') {
      const el = document.getElementById('orcamento-servicos');
      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
        return;
      }
    }
    if (pathname.startsWith('/servicos/')) {
      const el = document.getElementById('orcamento-detalhe');
      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
        return;
      }
    }
    navigate('/contactos', {hash: 'orcamento-contactos'});
  };

  const handleHomeSelectServiceForQuote = (serviceTitle: string) => {
    setSelectedServiceForQuote(serviceTitle);
    const el = document.getElementById('orcamento');
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  const renderPage = () => {
    if (isHome) {
      return (
        <HomePage
          selectedServiceForQuote={selectedServiceForQuote}
          onSelectServiceForQuote={handleHomeSelectServiceForQuote}
          onScrollToQuote={handleGlobalQuoteAction}
        />
      );
    }

    if (pathname === '/servicos') {
      return <ServicesPage />;
    }

    if (pathname.startsWith('/servicos/')) {
      const slug = pathname.replace('/servicos/', '');
      return <ServiceDetailPage key={slug} slug={slug} />;
    }

    if (pathname === '/eventos') {
      return <EventsPage />;
    }

    if (pathname === '/galeria') {
      return <GalleryPage />;
    }

    if (pathname === '/sobre-nos') {
      return <AboutPage />;
    }

    if (pathname === '/contactos') {
      return <ContactPage />;
    }

    return (
      <section className="pt-36 pb-24 bg-[#F7F9F7] min-h-[70vh] flex items-center">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-[#0C482B] mb-2">Página 404</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#17251D] mb-4">
            Página não encontrada
          </h1>
          <p className="text-base text-[#17251D]/75 mb-8">
            O endereço solicitado não existe. Utilize a navegação principal para
            regressar à página inicial ou explorar os serviços da iClean.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#0C482B] text-white font-semibold text-sm hover:bg-[#093821] transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>
      </section>
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col relative ${
        isHome ? 'bg-[#061F13] text-white' : 'bg-white text-[#17251D]'
      }`}
    >
      {/* Global Continuous Cinematic Background Wrapper (Homepage "/" only) */}
      {isHome && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
          style={{
            backgroundImage: `url(${heroGlobalBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Consistent dark translucent overlay for readability across all sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#061F13]/72 via-[#082819]/78 to-[#051B10]/86" />
          <div className="absolute inset-0 bg-[#072114]/30" />
        </div>
      )}

      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar
          onRequestQuote={handleGlobalQuoteAction}
          onGlobalBackground={isHome}
        />
        <main className="flex-1">
          <Suspense fallback={<RouteLoadingFallback />}>
            {renderPage()}
          </Suspense>
        </main>
        <Footer onGlobalBackground={isHome} />
      </div>

      <WhatsAppFloatingButton onFallbackQuote={handleGlobalQuoteAction} />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppShell />
    </RouterProvider>
  );
}
