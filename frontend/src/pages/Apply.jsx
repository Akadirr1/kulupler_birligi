import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, Loader2, Check, Home } from 'lucide-react';
import api from '../lib/api';

// ─── Constants ──────────────────────────────────────────────────────────────

const TEKNOFEST_CATEGORIES = [
  'Savaşan İHA',
  'Akıllı Tarım İHA',
  'Dikey İniş Roket',
  'Model Uydu',
  'Elektrikli Araç',
  'İnsansız Su Altı Sistemi',
  'İnsansız Kara Aracı',
  'Yapay Zeka',
  'Siber Güvenlik',
  'Robotik Kodlama',
  'Diğer',
];

const INITIAL_FORM = {
  clubName: '',
  university: '',
  foundationYear: '',
  captainName: '',
  captainEmail: '',
  captainPhone: '',
  teknofestCategories: [],
  motivationMessage: '',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const validate = (data) => {
  const errors = {};
  const currentYear = new Date().getFullYear();

  if (!data.clubName.trim()) errors.clubName = 'Kulüp adı zorunludur.';
  if (!data.university.trim()) errors.university = 'Üniversite adı zorunludur.';

  const year = Number(data.foundationYear);
  if (!data.foundationYear) {
    errors.foundationYear = 'Kuruluş yılı zorunludur.';
  } else if (isNaN(year) || year < 1950 || year > currentYear) {
    errors.foundationYear = `1950 ile ${currentYear} arasında bir yıl giriniz.`;
  }

  if (!data.captainName.trim()) errors.captainName = 'Kaptan adı zorunludur.';

  if (!data.captainEmail.trim()) {
    errors.captainEmail = 'E-posta adresi zorunludur.';
  } else if (!/^\S+@\S+\.\S+$/.test(data.captainEmail)) {
    errors.captainEmail = 'Geçerli bir e-posta adresi giriniz.';
  }

  if (!data.captainPhone.trim()) errors.captainPhone = 'Telefon numarası zorunludur.';

  if (data.teknofestCategories.length === 0)
    errors.teknofestCategories = 'En az bir kategori seçiniz.';

  if (!data.motivationMessage.trim()) {
    errors.motivationMessage = 'Motivasyon mesajı zorunludur.';
  } else if (data.motivationMessage.trim().length < 50) {
    errors.motivationMessage = 'Motivasyon mesajı en az 50 karakter olmalıdır.';
  }

  return errors;
};

// ─── Sub-components ──────────────────────────────────────────────────────────

const FieldError = ({ message }) =>
  message ? <p className="mt-1.5 text-xs text-red-400">{message}</p> : null;

const SectionCard = ({ title, children }) => (
  <div className="card space-y-5">
    <h3 className="font-display font-semibold text-white text-base border-b border-white/5 pb-3">
      {title}
    </h3>
    {children}
  </div>
);

// ─── Success State ───────────────────────────────────────────────────────────

const SuccessScreen = ({ clubName, email }) => (
  <div className="section min-h-[80vh] flex items-center justify-center">
    <div className="text-center max-w-lg mx-auto animate-fade-in-up px-4">
      <div className="w-24 h-24 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center mx-auto mb-8 animate-glow-pulse">
        <CheckCircle2 className="w-12 h-12 text-neon" />
      </div>
      <h2 className="font-display font-bold text-3xl text-white mb-4">Başvurunuz Alındı!</h2>
      <p className="text-slate-400 mb-2 leading-relaxed">
        <span className="text-neon font-medium">{clubName}</span> kulübünüzün başvurusu başarıyla
        iletildi. Ekibimiz en kısa sürede inceleyecek ve aşağıdaki adrese dönüş yapacak:
      </p>
      <p className="text-slate-300 font-medium mb-8">{email}</p>
      <Link to="/" id="success-home-btn" className="btn-outline gap-2">
        <Home className="w-4 h-4" />
        Anasayfaya Dön
      </Link>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const Apply = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  // Generic field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Category toggle
  const toggleCategory = (cat) => {
    setFormData((prev) => {
      const included = prev.teknofestCategories.includes(cat);
      return {
        ...prev,
        teknofestCategories: included
          ? prev.teknofestCategories.filter((c) => c !== cat)
          : [...prev.teknofestCategories, cat],
      };
    });
    if (errors.teknofestCategories)
      setErrors((prev) => ({ ...prev, teknofestCategories: '' }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsLoading(true);
    try {
      const payload = { ...formData, foundationYear: Number(formData.foundationYear) };
      await api.post('/api/applications', payload);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setServerError(
        err.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyiniz.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return <SuccessScreen clubName={formData.clubName} email={formData.captainEmail} />;
  }

  const charCount = formData.motivationMessage.length;

  return (
    <section className="section min-h-screen bg-navy-950">
      <div className="container-max mx-auto max-w-2xl">
        {/* Page header */}
        <div className="text-center mb-12">
          <p className="text-neon text-xs font-mono tracking-[0.2em] uppercase mb-3">
            Kulüp Başvurusu
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
            Takımını Kaydet
          </h1>
          <p className="text-slate-400 leading-relaxed max-w-md mx-auto">
            Formu eksiksiz doldurun. Başvurunuzu inceleyerek en kısa sürede size dönüş yapacağız.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Server error banner */}
          {serverError && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3">
              <span className="text-red-400 flex-shrink-0 mt-0.5">⚠</span>
              {serverError}
            </div>
          )}

          {/* ── Club Info ── */}
          <SectionCard title="Kulüp Bilgileri">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="clubName">
                  Kulüp Adı <span className="text-neon">*</span>
                </label>
                <input
                  id="clubName"
                  name="clubName"
                  type="text"
                  autoComplete="organization"
                  value={formData.clubName}
                  onChange={handleChange}
                  placeholder="TKB Havacılık Kulübü"
                  className={`input-field ${errors.clubName ? 'border-red-500/60 focus:border-red-500' : ''}`}
                />
                <FieldError message={errors.clubName} />
              </div>

              <div>
                <label className="label" htmlFor="university">
                  Üniversite <span className="text-neon">*</span>
                </label>
                <input
                  id="university"
                  name="university"
                  type="text"
                  value={formData.university}
                  onChange={handleChange}
                  placeholder="İstanbul Teknik Üniversitesi"
                  className={`input-field ${errors.university ? 'border-red-500/60 focus:border-red-500' : ''}`}
                />
                <FieldError message={errors.university} />
              </div>
            </div>

            <div className="max-w-[200px]">
              <label className="label" htmlFor="foundationYear">
                Kuruluş Yılı <span className="text-neon">*</span>
              </label>
              <input
                id="foundationYear"
                name="foundationYear"
                type="number"
                value={formData.foundationYear}
                onChange={handleChange}
                placeholder="2019"
                min="1950"
                max={new Date().getFullYear()}
                className={`input-field ${errors.foundationYear ? 'border-red-500/60 focus:border-red-500' : ''}`}
              />
              <FieldError message={errors.foundationYear} />
            </div>
          </SectionCard>

          {/* ── Captain Info ── */}
          <SectionCard title="Kaptan Bilgileri">
            <div>
              <label className="label" htmlFor="captainName">
                Ad Soyad <span className="text-neon">*</span>
              </label>
              <input
                id="captainName"
                name="captainName"
                type="text"
                autoComplete="name"
                value={formData.captainName}
                onChange={handleChange}
                placeholder="Ahmet Yılmaz"
                className={`input-field ${errors.captainName ? 'border-red-500/60 focus:border-red-500' : ''}`}
              />
              <FieldError message={errors.captainName} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="captainEmail">
                  E-Posta <span className="text-neon">*</span>
                </label>
                <input
                  id="captainEmail"
                  name="captainEmail"
                  type="email"
                  autoComplete="email"
                  value={formData.captainEmail}
                  onChange={handleChange}
                  placeholder="kaptan@uni.edu.tr"
                  className={`input-field ${errors.captainEmail ? 'border-red-500/60 focus:border-red-500' : ''}`}
                />
                <FieldError message={errors.captainEmail} />
              </div>

              <div>
                <label className="label" htmlFor="captainPhone">
                  Telefon <span className="text-neon">*</span>
                </label>
                <input
                  id="captainPhone"
                  name="captainPhone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.captainPhone}
                  onChange={handleChange}
                  placeholder="+90 555 000 00 00"
                  className={`input-field ${errors.captainPhone ? 'border-red-500/60 focus:border-red-500' : ''}`}
                />
                <FieldError message={errors.captainPhone} />
              </div>
            </div>
          </SectionCard>

          {/* ── Categories ── */}
          <SectionCard title="Teknofest Kategorileri">
            <p className="text-sm text-slate-400 -mt-1">
              Kulübünüzün katıldığı veya katılmayı planladığı kategorileri seçin.{' '}
              <span className="text-neon">*</span>
            </p>
            <div id="teknofestCategories" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TEKNOFEST_CATEGORIES.map((cat) => {
                const checked = formData.teknofestCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all duration-150 border ${
                      checked
                        ? 'bg-neon/10 border-neon/50 text-neon'
                        : 'bg-navy-900/60 border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                        checked ? 'bg-neon border-neon' : 'border-slate-600'
                      }`}
                    >
                      {checked && <Check className="w-3 h-3 text-navy-950 stroke-[3]" />}
                    </div>
                    {cat}
                  </button>
                );
              })}
            </div>
            <FieldError message={errors.teknofestCategories} />
          </SectionCard>

          {/* ── Motivation ── */}
          <SectionCard title="Motivasyon Mesajı">
            <p className="text-sm text-slate-400 -mt-1">
              Kulübünüzü ve birliğe katılmak isteme nedeninizi anlatın.{' '}
              <span className="text-neon">*</span>
              <span className="text-slate-500"> (En az 50 karakter)</span>
            </p>
            <textarea
              id="motivationMessage"
              name="motivationMessage"
              rows={6}
              value={formData.motivationMessage}
              onChange={handleChange}
              placeholder="Kulübümüz 2019 yılında kurulmuş olup Teknofest'e İHA kategorisinde katılıyoruz. Birliğe katılmak istiyoruz çünkü..."
              className={`input-field resize-none ${
                errors.motivationMessage ? 'border-red-500/60 focus:border-red-500' : ''
              }`}
            />
            <div className="flex items-center justify-between -mt-1">
              <FieldError message={errors.motivationMessage} />
              <p
                className={`text-xs ml-auto flex-shrink-0 ${
                  charCount >= 50 ? 'text-neon' : 'text-slate-600'
                }`}
              >
                {charCount} / 50+
              </p>
            </div>
          </SectionCard>

          {/* Submit */}
          <button
            type="submit"
            id="submit-application-btn"
            disabled={isLoading}
            className="btn-primary w-full justify-center text-base py-4 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Gönderiliyor...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Başvuruyu Gönder
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-600 pb-4">
            Başvurunuz gönderildikten sonra ekibimiz sizi e-posta ile bilgilendirecektir.
          </p>
        </form>
      </div>
    </section>
  );
};

export default Apply;
