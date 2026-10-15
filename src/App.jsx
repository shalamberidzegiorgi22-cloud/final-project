import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contract from './pages/Contract/Contract';
import Contact from './pages/Contact';
import MessengerChat from './components/MessengerChat';
import { useLanguage } from './context/useLanguage';
import LanguageToggle from './components/LanguageToggle';
import ThemeToggle from './components/ThemeToggle';

const navigationItems = [
  { page: 'home', label: 'home' },
  { page: 'contract', label: 'contract' },
  { page: 'about', label: 'about' },
  { page: 'contact', label: 'contact' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [contractTab, setContractTab] = useState('buyer');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  function navigateTo(page) {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  }

  function openInspectorRegistration() {
    setContractTab('inspector');
    navigateTo('contract');
  }

  return (
    <div className={`app-shell w-full max-w-full overflow-x-clip ${currentPage === 'home' || currentPage === 'contact' ? 'app-shell--full-bleed' : ''}`}>
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full border border-white/40 bg-white/80 p-1.5 shadow-xl shadow-slate-900/15 backdrop-blur-2xl dark:border-white/20 dark:bg-zinc-950/80">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <nav className="site-nav">
        <div className="hidden items-center gap-5 md:flex">
          {navigationItems.map(({ page, label }) => (
            <button className="site-nav-link" key={page} onClick={() => navigateTo(page)}>
              {t.nav[label]}
            </button>
          ))}
        </div>
        <button
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
          className="site-nav-menu-toggle inline-flex items-center justify-center rounded-full p-2 md:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          type="button"
        >
          {isMobileMenuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
        {isMobileMenuOpen && (
          <div className="site-nav-mobile-menu md:hidden">
            {navigationItems.map(({ page, label }) => (
              <button className="site-nav-link" key={page} onClick={() => navigateTo(page)}>
                {t.nav[label]}
              </button>
            ))}
          </div>
        )}
      </nav>
      <main className="w-full max-w-full">
        {currentPage === 'home' && (
          <Home onInspectorClick={openInspectorRegistration} />
        )}
        {currentPage === 'contract' && (
          <Contract activeTab={contractTab} onTabChange={setContractTab} />
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
      </main>
      <MessengerChat />
    </div>
  );
}