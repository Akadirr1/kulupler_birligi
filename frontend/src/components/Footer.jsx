import { Link } from 'react-router-dom';
import { Zap, GitBranch, Send as SendIcon } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-navy-900/40 backdrop-blur-sm">
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-neon" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm">
                  Teknofest Kulüpler Birliği
                </p>
                <p className="text-neon font-mono text-[10px] tracking-widest">TKB</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Türkiye'nin teknoloji kulüplerini bir araya getirerek daha güçlü bir mühendislik
              ekosistemi inşa ediyoruz.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-4">
              Bağlantılar
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { to: '/', label: 'Anasayfa' },
                { to: '/manifesto', label: 'Manifesto' },
                { to: '/basvuru', label: 'Başvuru Yap' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-slate-400 hover:text-neon transition-colors w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-4">
              İletişim
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Sorularınız için:
              <br />
              <a
                href="mailto:info@tkb.org.tr"
                className="text-neon hover:text-neon-dark transition-colors"
              >
                info@tkb.org.tr
              </a>
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-500 hover:text-neon hover:border-neon/30 transition-all"
              >
                <GitBranch className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Sosyal Medya"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-500 hover:text-neon hover:border-neon/30 transition-all"
              >
                <SendIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="divider pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {year} Teknofest Kulüpler Birliği. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-slate-700 font-mono">
            Birlikte daha güçlüyüz
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
