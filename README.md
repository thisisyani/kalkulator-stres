# 🧠 Aplikasi Kalkulator Skor Stres Klinis (PSS-10)

Aplikasi berbasis web interaktif yang dirancang untuk mengukur tingkat stres psikologis seseorang dalam sebulan terakhir berdasarkan instrumen klinis standar **Perceived Stress Scale (PSS-10)**. Proyek ini merupakan gabungan harmonis antara ilmu psikometri dasar dan logika pemrograman web modern.

## ✨ Fitur Utama
- **Personalized Experience:** Pengguna dapat memasukkan nama di *Start Screen* untuk mendapatkan sapaan diagnosis dan analisis grafik yang bersifat personal di akhir sesi.
- **Dynamic Quiz Interface:** Pergantian soal berjalan secara *seamless* memanfaatkan manipulasi DOM JavaScript tanpa perlu memuat ulang halaman (*no refresh*).
- **Interactive Visual Chart:** Menampilkan visualisasi data hasil diagnosis menggunakan grafik lingkaran (*Doughnut Chart*) interaktif dari Chart.js.
- **Glassmorphism UI/UX Layout:** Antarmuka estetik premium berbasis efek kaca transparan dengan dekorasi warna pastel yang menenangkan jiwa (*calming therapeutic*).
- **Fluid Micro-Animations:** Dilengkapi dengan transisi visual halus (*fade-in* & *slide-up*) saat memuat halaman maupun efek geser pada tombol skala ketika diinteraksi.

## 🛠️ Konsep IT & Struktur Data yang Digunakan
1. **Array of Objects:** Seluruh instrumen bank soal dan tipe indikator psikologinya disimpan secara terstruktur dalam barisan objek JavaScript.
2. **State Control Variable:** Menggunakan variabel indeks dinamis untuk melacak progres nomor soal aktif secara tersembunyi di latar belakang.
3. **Reverse Scoring Logic:** Menggunakan algoritma pengondisian (`if-else`) untuk membalik bobot skor secara otomatis khusus pada butir pertanyaan koping positif (Skala Likert balik).
4. **Third-Party Library Integration:** Mengintegrasikan CDN Chart.js untuk merender grafik donat secara dinamis berdasarkan kalkulasi skor akhir pengguna.
5. **CSS Backdrop Filter:** Efek blur kaca premium menggunakan kombinasi fitur `backdrop-filter: blur()` modern.

## 📁 Struktur Folder Proyek
```text
kalkulator-stres/
│
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
│
├── index.html
└── README.md
```

## 🚀 Cara Menjalankan Proyek
1. Unduh atau kloning repositori ini ke komputer lokal Anda.
2. Buka berkas `index.html` menggunakan peramban web (*browser*) favorit Anda (Chrome/Edge/Safari).
3. Masukkan namamu, klik tombol mulai, dan temukan hasil analisis tingkat stresmu!
