import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const commitments = [
  'Üye kulüplere yönelik düzenli teknik eğitim ve workshoplar düzenlemek.',
  'Sponsor ve kurumsal ortaklıklarda birlikte hareket ederek kulüplerin kaynaklara erişimini artırmak.',
  'Üniversiteler arası iş birliklerini teşvik eden projeler ve etkinlikler organize etmek.',
  'Her kulübün sesini birlik platformunda eşit biçimde duyurabilmesini sağlamak.',
  'Açık kaynak kültürünü benimseyen, bilgiyi paylaşmaktan çekinmeyen bir ekosistem inşa etmek.',
];

const ManifestoSection = ({ title, children }) => (
  <section className="scroll-mt-24">
    <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-5 flex items-center gap-3">
      <span className="w-1 h-7 rounded-full bg-gradient-to-b from-neon to-electric flex-shrink-0" />
      {title}
    </h2>
    <div className="space-y-4 text-slate-400 leading-relaxed pl-4">{children}</div>
  </section>
);

const Manifesto = () => {
  return (
    <article className="min-h-screen bg-navy-950">
      {/* Hero banner */}
      <div className="relative bg-hero-gradient border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-60" />
        <div className="relative container-max mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-neon text-xs font-mono tracking-[0.2em] uppercase mb-4">
            Teknofest Kulüpler Birliği
          </p>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-white mb-6 leading-tight">
            Manifestomuz
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-neon to-electric mx-auto rounded-full" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-navy-950 to-transparent" />
      </div>

      {/* Content */}
      <div className="section">
        <div className="max-w-3xl mx-auto space-y-14">
          {/* Opening quote */}
          <blockquote className="relative pl-6 border-l-2 border-neon py-2">
            <p className="text-xl sm:text-2xl text-slate-200 italic font-light leading-relaxed">
              "Tek başına gidersen hızlı gidersin; birlikte gidersen uzağa gidersin."
            </p>
            <footer className="text-slate-500 text-sm mt-4">— Afrika Atasözü</footer>
          </blockquote>

          {/* Section: Who we are */}
          <ManifestoSection title="Kim Olduğumuz">
            <p>
              Biz, Türkiye'nin dört bir yanındaki üniversitelerden bir araya gelen mühendis
              adayları, bilim insanı tohumları ve hayalperestleriz. Atölyelerde, laboratuvarlarda
              ve proje odalarında Teknofest'e hazırlanan binlerce gencin ortak sesiyiz. Farklı
              şehirlerden, farklı bölümlerden, farklı geçmişlerden gelsek de tek bir şeyde
              buluşuyoruz: teknolojiyi ülkemizin geleceği için araç yapmak.
            </p>
            <p>
              Teknofest Kulüpler Birliği, bu ortak amacı somutlaştırmak için kuruldu. Sadece bir
              örgüt ya da platform değiliz; aynı ateşi taşıyan insanların oluşturduğu canlı, büyüyen
              ve birbirini besleyen bir topluluğuz.
            </p>
          </ManifestoSection>

          {/* Section: Engineering Ethics */}
          <ManifestoSection title="Mühendislik Etiği Üzerine">
            <p>
              Bir mühendis yalnızca hesap yapan, kod yazan ya da devre tasarlayan kişi değildir.
              Bir mühendis, yarattığı her şeyin topluma olan etkisini bilen, bu etkinin
              sorumluluğunu taşıyan kişidir. Teknofest Kulüpler Birliği olarak, teknolojik
              gelişimi etik bir temele oturtmayı birincil ilkemiz kabul ediyoruz.
            </p>
            <p>
              Projelerimiz yalnızca yarışma madalyaları için değil; insanların hayatını
              kolaylaştırmak, çevreye duyarlı çözümler üretmek ve ülkemizin savunma, tarım, sağlık
              ve enerji alanlarında bağımsızlığını güçlendirmek için var. Her satır kod, her
              mekanik tasarım, her algoritma bu büyük amacın küçük ama vazgeçilmez bir parçasıdır.
            </p>
          </ManifestoSection>

          {/* Section: Power of Collaboration */}
          <ManifestoSection title="İşbirliğinin Gücü">
            <p>
              Rekabet, bizi daha iyi yapan bir güçtür. Fakat gerçek ilerleme işbirliğiyle gelir.
              Bir kulübün yıllarca geliştirdiği teknik bilgi birikimini başka bir kulüpten genç bir
              ekiple paylaşması; onların bu bilgiyi alıp daha da ileriye taşıması — işte bu döngü,
              Türkiye teknoloji ekosistemini gerçekten güçlü kılan şeydir.
            </p>
            <p>
              Teknofest Kulüpler Birliği bu döngüyü hızlandırmak için kuruldu. Kulüplerimiz
              arasında düzenlediğimiz teknik workshoplar, çapraz mentorluk programları ve ortak proje
              geliştirme girişimleri, her bir üye kulübü hem kendi alanında uzmanlaştırır hem de
              alanlar arasında köprüler kurmasını sağlar.
            </p>
          </ManifestoSection>

          {/* Section: Teknofest Spirit */}
          <ManifestoSection title="Teknofest Ruhu">
            <p>
              Teknofest yalnızca bir yarışma değildir. Teknofest, nesiller boyu sürecek bir zihin
              dönüşümünün başlangıç noktasıdır. Her yıl binlerce genç bu platformda ilk defa "Ben
              de yapabilirim" der. İlk defa takım çalışmasını, başarısızlığı, tekrar denemeyi ve
              bir projeyi sıfırdan hayata geçirmeyi deneyimler.
            </p>
            <p>
              Biz bu ruhu korumak, taşımak ve yeni nesillere aktarmak için varoluyoruz. Bir
              Teknofest sezonu biterken, biz bir sonraki için hazırlığa başlıyoruz. Çünkü
              biliyoruz ki yenilik bir maraton değil, nesiller boyu devredilen bir bayrak yarışıdır.
            </p>
          </ManifestoSection>

          {/* Section: Our Commitments */}
          <ManifestoSection title="Taahhütlerimiz">
            <ul className="space-y-4 pl-0 list-none">
              {commitments.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ManifestoSection>

          {/* Closer */}
          <div className="pt-10 border-t border-white/5 text-center space-y-6">
            <p className="text-2xl text-slate-200 leading-relaxed font-light font-display">
              Teknoloji tek başına kazanmaz.
              <br />
              <span className="gradient-text font-bold">Birlikte kazanır.</span>
            </p>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              Bu manifestoyu benimsiyorsanız, kulübünüzü Teknofest Kulüpler Birliği'ne katın.
            </p>
            <Link to="/basvuru" id="manifesto-apply-btn" className="btn-primary text-base px-10 py-4 inline-flex">
              Kulübünü Birliğe Kaydet
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Manifesto;
