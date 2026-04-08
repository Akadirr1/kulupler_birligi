import { Link } from 'react-router-dom';
import { Zap, Users, TrendingUp, Lightbulb, ArrowRight, ChevronRight } from 'lucide-react';

const features = [
  {
    Icon: Users,
    title: 'Güçlü Ağ',
    description:
      "Türkiye'nin önde gelen teknoloji kulüpleriyle tanışın. Ortak projeler, etkinlikler ve iş birliktelikler için Türkiye genelinde geniş bir ekosisteme katılın.",
    gradientFrom: 'from-neon/15',
    gradientTo: 'to-transparent',
    border: 'hover:border-neon/30',
    iconBg: 'bg-neon/10 border-neon/25',
    iconColor: 'text-neon',
  },
  {
    Icon: TrendingUp,
    title: 'Sponsor Gücü',
    description:
      'Bireysel kulüpler olarak ulaşamadığınız sponsor ve kurumsal desteklere, birliğin ortak müzakere gücüyle erişin. Daha büyük bütçeler, daha büyük projeler.',
    gradientFrom: 'from-electric/15',
    gradientTo: 'to-transparent',
    border: 'hover:border-electric/30',
    iconBg: 'bg-electric/10 border-electric/25',
    iconColor: 'text-electric-light',
  },
  {
    Icon: Lightbulb,
    title: 'Bilgi Transferi',
    description:
      "Yılların birikimiyle oluşturulmuş teknik know-how'u paylaşın. Deneyimli kulüplerden mentorluk alın, yeni nesil mühendislere rehberlik edin.",
    gradientFrom: 'from-purple-500/15',
    gradientTo: 'to-transparent',
    border: 'hover:border-purple-500/30',
    iconBg: 'bg-purple-500/10 border-purple-500/25',
    iconColor: 'text-purple-400',
  },
];

const stats = [
  { value: '50+', label: 'Üye Kulüp' },
  { value: '30+', label: 'Üniversite' },
  { value: '200+', label: 'Aktif Üye' },
  { value: '12+', label: 'Teknofest Kategorisi' },
];

const Home = () => {
  return (
    <>
      {/* ─── HERO ───────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid-size" />

        {/* Glow blobs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-neon/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-electric/6 blur-3xl pointer-events-none" />

        <div className="relative container-max mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          {/* Animated badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon/30 bg-neon/5 text-neon text-xs font-medium mb-8 animate-fade-in-up"
          >
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse flex-shrink-0" />
            Türkiye'nin Teknoloji Kulüpleri Tek Çatı Altında
          </div>

          {/* Headline */}
          <h1
            className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.1] mb-6 animate-fade-in-up"
            style={{ animationDelay: '80ms' }}
          >
            Güçlerimizi
            <span className="block gradient-text mt-1">Birleştiriyoruz</span>
          </h1>

          {/* Sub-headline */}
          <p
            className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '160ms' }}
          >
            Teknofest ruhunu taşıyan kulüpleri ortak bir platformda buluşturuyoruz. Ağ, kaynak ve
            bilgi paylaşımıyla daha güçlü projeler, daha büyük başarılar.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: '240ms' }}
          >
            <Link to="/basvuru" id="hero-apply-btn" className="btn-primary text-base px-8 py-4">
              <Zap className="w-5 h-5" />
              Takımını Kaydet
            </Link>
            <Link to="/manifesto" className="btn-outline text-base px-8 py-4">
              Manifestoyu Oku
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats strip */}
          <div
            className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 animate-fade-in-up"
            style={{ animationDelay: '360ms' }}
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display font-extrabold text-4xl sm:text-5xl gradient-text">
                  {value}
                </p>
                <p className="text-slate-500 text-sm mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />
      </section>

      {/* ─── FEATURES ───────────────────────────────────────────────── */}
      <section className="section bg-navy-950">
        <div className="container-max mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-neon text-xs font-mono tracking-[0.2em] uppercase mb-3">
              Neden Katılmalısınız?
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Birliğin Gücü, Başarının Anahtarı
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto leading-relaxed">
              Teknofest Kulüpler Birliği, kulübünü bir üst seviyeye taşımak isteyen takımlar için
              kapsamlı bir ekosistem sunuyor.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ Icon, title, description, gradientFrom, gradientTo, border, iconBg, iconColor }) => (
              <div
                key={title}
                className={`card relative overflow-hidden border border-white/5 bg-gradient-to-br ${gradientFrom} ${gradientTo} ${border} transition-all duration-300`}
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${iconBg}`}
                >
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─────────────────────────────────────────────── */}
      <section className="section bg-navy-950">
        <div className="container-max mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-neon/20 p-12 sm:p-16 text-center">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon/8 via-navy-800/80 to-electric/8" />
            <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-60" />
            {/* Glow center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-neon/10 blur-3xl" />

            <div className="relative">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
                Harekete Geç, Birliğe Katıl
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
                Kulübünüzü Teknofest Kulüpler Birliği'ne kaydederek Türkiye genelindeki teknoloji
                topluluğunun bir parçası olun.
              </p>
              <Link
                to="/basvuru"
                id="cta-banner-btn"
                className="btn-primary text-base px-10 py-4 animate-glow-pulse"
              >
                <ArrowRight className="w-5 h-5" />
                Şimdi Başvur
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
