import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-4 section">
    <div className="w-20 h-20 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
      <AlertTriangle className="w-10 h-10 text-yellow-400" />
    </div>
    <div>
      <p className="font-mono text-neon text-sm tracking-widest mb-2">404</p>
      <h1 className="font-display font-bold text-3xl text-white mb-3">Sayfa Bulunamadı</h1>
      <p className="text-slate-400 max-w-sm leading-relaxed">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>
    </div>
    <Link to="/" id="notfound-home-btn" className="btn-outline gap-2">
      <Home className="w-4 h-4" />
      Anasayfaya Dön
    </Link>
  </div>
);

export default NotFound;
