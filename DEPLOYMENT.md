# 📖 Milli Teknoloji Takımları Birliği — Kullanım & Deployment Kılavuzu

> Bu kılavuz, projeyi yerel geliştirme ortamında çalıştırmaktan canlı production sunucusuna deploy etmeye kadar her adımı kapsar.

---

## 📋 İçerik

1. [Proje Yapısı](#1-proje-yapısı)
2. [Gereksinimler](#2-gereksinimler)
3. [Yerel Geliştirme (Local Dev)](#3-yerel-geliştirme-local-dev)
4. [Ortam Değişkenleri (.env)](#4-ortam-değişkenleri-env)
5. [Tüm npm Komutları](#5-tüm-npm-komutları)
6. [API Endpoint Dokümantasyonu](#6-api-endpoint-dokümantasyonu)
7. [Production'a Deploy Etme](#7-productiona-deploy-etme)
   - [A) VPS / Linux Sunucu (Önerilen)](#a-vps--linux-sunucu-önerilen)
   - [B) Railway (Backend)](#b-railway-backend)
   - [C) Vercel (Frontend)](#c-vercel-frontend)
   - [D) Render (Backend + Frontend)](#d-render-backend--frontend)
8. [Veri Tabanı — MongoDB Atlas](#8-veri-tabanı--mongodb-atlas)
9. [Sorun Giderme](#9-sorun-giderme)

---

## 1. Proje Yapısı

```
kulupler_birligi/              ← Monorepo kökü
├── .env.example               ← Örnek ortam değişkenleri (kopyala → .env)
├── .gitignore
├── .gitattributes
├── package.json               ← Kök komutlar (dev, build, start)
│
├── backend/                   ← Node.js + Express API sunucusu
│   ├── server.js              ← Uygulama giriş noktası
│   ├── package.json
│   ├── models/
│   │   └── Application.js     ← Mongoose şeması
│   ├── controllers/
│   │   └── applicationController.js
│   ├── routes/
│   │   └── applicationRoutes.js
│   └── middleware/
│       └── apiKeyAuth.js      ← Admin koruması
│
└── frontend/                  ← React + Vite + Tailwind CSS
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── lib/
        │   └── api.js         ← Axios yapılandırması
        ├── components/
        │   ├── Layout.jsx
        │   ├── Navbar.jsx
        │   └── Footer.jsx
        └── pages/
            ├── Home.jsx
            ├── Manifesto.jsx
            ├── Apply.jsx
            └── NotFound.jsx
```

---

## 2. Gereksinimler

| Araç | Minimum Sürüm | Kontrol |
|---|---|---|
| Node.js | v18+ | `node --version` |
| npm | v9+ | `npm --version` |
| MongoDB | v6+ (veya Atlas) | Yerel kurulum ya da Atlas bağlantısı |
| Git | Herhangi | `git --version` |

---

## 3. Yerel Geliştirme (Local Dev)

### Adım 1 — Repoyu klonla

```bash
git clone https://github.com/KULLANICI/kulupler_birligi.git
cd kulupler_birligi
```

### Adım 2 — Tüm bağımlılıkları kur

```bash
npm run install:all
```

Bu komut kök, `backend/` ve `frontend/` dizinlerindeki tüm bağımlılıkları tek seferde kurar.

### Adım 3 — Ortam değişkenlerini ayarla

```bash
# backend/ klasörüne git
cd backend

# .env.example dosyasını kopyala
copy .env.example .env        # Windows
cp .env.example .env          # Mac/Linux
```

Açılan `.env` dosyasını düzenle:

```env
MONGO_URI=mongodb://localhost:27017/kulupler_birligi
PORT=5000
ADMIN_API_KEY=gizli_bir_anahtar_yaz
CLIENT_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000
```

### Adım 4 — Her iki sunucuyu aynı anda başlat

```bash
# Kök dizinde (kulupler_birligi/)
npm run dev
```

✅ Backend → `http://localhost:5000`  
✅ Frontend → `http://localhost:5173`

---

## 4. Ortam Değişkenleri (.env)

`backend/.env` dosyasında aşağıdaki değişkenler tanımlanmalıdır:

| Değişken | Açıklama | Örnek |
|---|---|---|
| `MONGO_URI` | MongoDB bağlantı adresi | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `PORT` | Express sunucusunun dinleyeceği port | `5000` |
| `ADMIN_API_KEY` | GET `/api/applications` endpoint'ini korur | Rastgele uzun bir string |
| `CLIENT_URL` | CORS için izin verilen frontend adresi | `https://mttb.org.tr` |

`frontend/.env` (production build için gerekli):

| Değişken | Açıklama | Örnek |
|---|---|---|
| `VITE_API_URL` | Frontend'in backend'e istek atacağı URL | `https://api.mttb.org.tr` |

> ⚠️ **Önemli:** Vite sadece `VITE_` önekiyle başlayan değişkenleri browser bundle'ına dahil eder. Backend URL'ini buraya yazman güvenlidir, ADMIN_API_KEY gibi şeyleri asla frontend'e ekleme.

---

## 5. Tüm npm Komutları

### Kök Dizin (`kulupler_birligi/`)

| Komut | Açıklama |
|---|---|
| `npm run dev` | Backend + Frontend'i eş zamanlı başlatır (geliştirme) |
| `npm run dev:backend` | Yalnızca backend'i başlatır |
| `npm run dev:frontend` | Yalnızca frontend'i başlatır |
| `npm run build` | Frontend'in production build'ini oluşturur (`frontend/dist/`) |
| `npm start` | Backend'i production modunda başlatır (`node server.js`) |
| `npm run install:all` | Tüm bağımlılıkları tek komutla kurar |

### Backend (`backend/`)

| Komut | Açıklama |
|---|---|
| `npm run dev` | nodemon ile geliştirme modu (hot-reload) |
| `npm start` | Production modu (`node server.js`) |

### Frontend (`frontend/`)

| Komut | Açıklama |
|---|---|
| `npm run dev` | Vite geliştirme sunucusu (`http://localhost:5173`) |
| `npm run build` | Production build → `dist/` klasörüne |
| `npm run preview` | `dist/` klasörünü local'de önizler |

---

## 6. API Endpoint Dokümantasyonu

**Base URL:** `http://localhost:5000` (yerel) / `https://api.mttb.org.tr` (canlı)

---

### `GET /api/health`

Sunucunun ayakta olup olmadığını kontrol eder.

**Erişim:** Herkese açık  
**Auth:** Yok

**Örnek istek:**
```bash
curl http://localhost:5000/api/health
```

**Başarılı yanıt (200):**
```json
{
  "success": true,
  "message": "Server is running."
}
```

---

### `POST /api/applications`

Yeni bir takım başvurusu gönderir.

**Erişim:** Herkese açık  
**Auth:** Yok  
**Content-Type:** `application/json`

**İstek gövdesi:**
```json
{
  "clubName": "MTTB Havacılık Takımı",
  "university": "İstanbul Teknik Üniversitesi",
  "foundationYear": 2019,
  "captainName": "Ahmet Yılmaz",
  "captainEmail": "ahmet@itu.edu.tr",
  "captainPhone": "+90 555 000 00 00",
  "teknofestCategories": ["Savaşan İHA", "Model Uydu"],
  "motivationMessage": "Kulübümüz 2019 yılında kurulmuş olup..."
}
```

**Alan Doğrulama Kuralları:**

| Alan | Tür | Zorunlu | Kural |
|---|---|---|---|
| `clubName` | string | ✅ | Boş olamaz |
| `university` | string | ✅ | Boş olamaz |
| `foundationYear` | number | ✅ | 1950 ≤ yıl ≤ Bugün |
| `captainName` | string | ✅ | Boş olamaz |
| `captainEmail` | string | ✅ | Geçerli e-posta formatı |
| `captainPhone` | string | ✅ | Boş olamaz |
| `teknofestCategories` | string[] | ✅ | En az 1 eleman |
| `motivationMessage` | string | ✅ | Min. 50 karakter |

**Başarılı yanıt (201):**
```json
{
  "success": true,
  "message": "Başvurunuz başarıyla alındı...",
  "data": {
    "_id": "664abc123...",
    "clubName": "MTTB Havacılık Takımı",
    "status": "pending",
    "createdAt": "2024-05-20T10:30:00.000Z"
  }
}
```

**Hata yanıtı (400):**
```json
{
  "success": false,
  "message": "Takım adı zorunludur., En az bir Teknofest kategorisi seçiniz."
}
```

---

### `GET /api/applications`

Tüm başvuruları listeler. **Admin korumalıdır.**

**Erişim:** Admin  
**Auth:** `x-api-key` header'ı gerekli  

**Header:**
```
x-api-key: ADMIN_API_KEY_DEGERIN
```

**Query Parametreleri (isteğe bağlı):**

| Parametre | Açıklama | Örnek |
|---|---|---|
| `status` | Başvuruları duruma göre filtrele | `?status=pending` |
| `page` | Sayfa numarası (varsayılan: 1) | `?page=2` |
| `limit` | Sayfa başı kayıt (varsayılan: 20) | `?limit=10` |

**Örnek istek:**
```bash
curl -H "x-api-key: gizli_anahtarin" \
     "http://localhost:5000/api/applications?status=pending&page=1&limit=10"
```

**Başarılı yanıt (200):**
```json
{
  "success": true,
  "total": 42,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "664abc123...",
      "clubName": "MTTB Havacılık Takımı",
      "university": "İTÜ",
      "status": "pending",
      "createdAt": "2024-05-20T10:30:00.000Z"
    }
  ]
}
```

**Yetkisiz yanıt (401):**
```json
{
  "success": false,
  "message": "Yetkisiz erişim. Geçerli bir API anahtarı gereklidir."
}
```

**Application `status` Değerleri:**

| Değer | Anlam |
|---|---|
| `pending` | Beklemede (varsayılan) |
| `approved` | Onaylandı |
| `rejected` | Reddedildi |

---

## 7. Production'a Deploy Etme

### A) VPS / Linux Sunucu (Önerilen)

Ubuntu/Debian tabanlı bir sunucu için tam kurulum adımları:

#### 1. Sunucuya bağlan ve gereksinimleri kur

```bash
# Node.js 20.x kur
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 kur (Node.js process manager)
sudo npm install -g pm2

# Nginx kur (ters proxy + frontend sunumu)
sudo apt install nginx -y
```

#### 2. Projeyi sunucuya al

```bash
cd /var/www
git clone https://github.com/KULLANICI/kulupler_birligi.git
cd kulupler_birligi
npm run install:all
```

#### 3. Backend ortam değişkenlerini ayarla

```bash
nano backend/.env
# .env.example'dan kopyalayıp production değerlerini gir
```

#### 4. Frontend'i build et

```bash
# frontend/.env oluştur
echo "VITE_API_URL=https://api.tkb.org.tr" > frontend/.env

# Production build al
npm run build
# → frontend/dist/ klasörü oluşur
```

#### 5. Backend'i PM2 ile başlat

```bash
cd /var/www/kulupler_birligi/backend
pm2 start server.js --name "tkb-backend"
pm2 save
pm2 startup   # Sunucu restart'ta otomatik başlat
```

#### 6. Nginx yapılandır

```bash
sudo nano /etc/nginx/sites-available/tkb
```

Aşağıdaki içeriği yapıştır (alan adını kendininkiyle değiştir):

```nginx
# Frontend
server {
    listen 80;
    server_name tkb.org.tr www.tkb.org.tr;
    root /var/www/kulupler_birligi/frontend/dist;
    index index.html;

    # Vue/React Router için — tüm rotaları index.html'e yönlendir
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API'yi proxy'le
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend API (ayrı subdomain kullanıyorsan)
server {
    listen 80;
    server_name api.tkb.org.tr;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/tkb /etc/nginx/sites-enabled/
sudo nginx -t       # Yapılandırmayı test et
sudo systemctl reload nginx
```

#### 7. SSL sertifikası (Certbot / Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d tkb.org.tr -d www.tkb.org.tr
```

#### 8. Güncelleme yapmak için

```bash
cd /var/www/kulupler_birligi
git pull
npm run install:all
npm run build          # Frontend'i yeniden build et
pm2 restart tkb-backend   # Backend'i yeniden başlat
```

---

### B) Railway (Backend)

Railway, Node.js backend'leri için ücretsize yakın bir bulut platformdur.

1. [railway.app](https://railway.app) → Yeni proje oluştur
2. **"Deploy from GitHub repo"** seç → `kulupler_birligi` reposu
3. **Root Directory** olarak `/backend` belirt
4. **Environment Variables** bölümüne `.env` değişkenlerini gir:
   - `MONGO_URI` → MongoDB Atlas URI
   - `PORT` → `5000`
   - `ADMIN_API_KEY` → Güçlü bir anahtar
   - `CLIENT_URL` → Frontend'in Vercel URL'si
5. Deploy et — Railway otomatik `npm start` çalıştırır

---

### C) Vercel (Frontend)

1. [vercel.com](https://vercel.com) → New Project → GitHub repoyu import et
2. **Root Directory** olarak `frontend/` belirt
3. **Framework Preset:** Vite
4. **Environment Variables** ekle:
   - `VITE_API_URL` → Railway/Render'daki backend URL'in (örn: `https://tkb-api.railway.app`)
5. Deploy et — Vercel otomatik `npm run build` çalıştırır

---

### D) Render (Backend + Frontend)

**Backend için:**
1. [render.com](https://render.com) → New **Web Service**
2. GitHub reposunu bağla, **Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Environment Variables'ı gir

**Frontend için:**
1. New **Static Site**
2. **Root Directory:** `frontend`
3. **Build Command:** `npm install && npm run build`
4. **Publish Directory:** `dist`
5. `VITE_API_URL` env değişkenini ekle

---

## 8. Veri Tabanı — MongoDB Atlas

Production'da yerel MongoDB yerine Atlas kullanılması önerilir.

1. [cloud.mongodb.com](https://cloud.mongodb.com) → Ücretsiz cluster oluştur (M0)
2. **Database Access** → Kullanıcı oluştur (güçlü şifre)
3. **Network Access** → `0.0.0.0/0` ekle (tüm IP) veya sunucu IP'ni
4. **Connect** → "Connect your application" → Connection string kopyala:

```
mongodb+srv://<kullanici>:<sifre>@cluster0.xxxxx.mongodb.net/kulupler_birligi?retryWrites=true&w=majority
```

5. Bu URL'i `backend/.env` dosyasında `MONGO_URI` olarak kullan

---

## 9. Sorun Giderme

### `npm run dev` çalıştırırken backend başlamıyor

```
[ERROR] MONGO_URI is not defined in .env
```
→ `backend/.env` dosyasının var olduğunu ve `MONGO_URI` tanımlı olduğunu kontrol et.

---

### Frontend backend'e istek atamıyor (CORS hatası)

```
Access to XMLHttpRequest has been blocked by CORS policy
```
→ `backend/.env` içinde `CLIENT_URL` değerini frontend'in tam adresiyle güncelle:
```env
CLIENT_URL=https://tkb.org.tr
```

---

### Admin API'ye erişim reddediliyor (401)

```json
{ "success": false, "message": "Yetkisiz erişim..." }
```
→ `x-api-key` header'ının gönderildiğini ve `ADMIN_API_KEY` ile birebir eşleştiğini doğrula.

---

### PM2 başlamıyor veya crash ediyor

```bash
pm2 logs tkb-backend   # Hata loglarına bak
pm2 restart tkb-backend --update-env  # .env değişkliklerinden sonra
```

---

### Nginx 502 Bad Gateway

→ Backend'in çalıştığını kontrol et: `pm2 status`  
→ Port numarasının Nginx config'deki ile eşleştiğini doğrula

---

## 📝 Hızlı Başvuru (Cheat Sheet)

```bash
# ─── Geliştirme ───────────────────────────────────────────────
npm run dev              # Her iki sunucuyu başlat
npm run dev:backend      # Sadece backend
npm run dev:frontend     # Sadece frontend

# ─── Production ───────────────────────────────────────────────
npm run build            # Frontend build al
npm start                # Backend'i production'da başlat

# ─── PM2 (Sunucu) ─────────────────────────────────────────────
pm2 start server.js --name tkb-backend
pm2 restart tkb-backend
pm2 logs tkb-backend
pm2 status

# ─── API Test (curl) ──────────────────────────────────────────
# Health check
curl http://localhost:5000/api/health

# Başvuru gönder
curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -d '{"clubName":"Test","university":"İTÜ","foundationYear":2020,"captainName":"Test","captainEmail":"test@test.com","captainPhone":"05550000000","teknofestCategories":["Savaşan İHA"],"motivationMessage":"Bu bir test başvurusudur ve yeterli uzunluktadır."}'

# Başvuruları listele (admin)
curl http://localhost:5000/api/applications \
  -H "x-api-key: ADMIN_API_KEY_DEGERIN"

# Filtreli listele
curl "http://localhost:5000/api/applications?status=pending&page=1&limit=10" \
  -H "x-api-key: ADMIN_API_KEY_DEGERIN"
```
