// 1. BANK SOAL EVALUASI STRES
const daftarPertanyaan = [
    { teks: "Dalam sebulan terakhir, seberapa sering kamu merasa kesal karena sesuatu yang terjadi secara tidak terduga?", tipe: "negatif" },
    { teks: "Dalam sebulan terakhir, seberapa sering kamu merasa tidak mampu mengendalikan hal-hal penting dalam hidupmu?", tipe: "negatif" },
    { teks: "Dalam sebulan terakhir, seberapa sering kamu merasa gugup, cemas, atau merasa tertekan secara mental?", tipe: "negatif" },
    { teks: "Dalam sebulan terakhir, seberapa sering kamu merasa yakin dengan kemampuanmu untuk mengatasi masalah yang muncul?", tipe: "positif" }, // Skor dibalik
    { teks: "Dalam sebulan terakhir, seberapa sering kamu merasa bahwa hal-hal berjalan sesuai dengan rencanamu?", tipe: "positif" }, // Skor dibalik
    { teks: "Dalam sebulan terakhir, seberapa sering kamu merasa tidak mampu menghadapi semua hal yang harus kamu lakukan?", tipe: "negatif" },
    { teks: "Dalam sebulan terakhir, seberapa sering kamu berhasil mengendalikan gangguan/kesal dalam hidup kamu?", tipe: "positif" }, // Skor dibalik
    { teks: "Dalam sebulan terakhir, seberapa sering kamu merasa mampu mengatasi masalah penting dalam hidupmu?", tipe: "positif" }, // Soal 8 Baru - Skor dibalik
    { teks: "Dalam sebulan terakhir, seberapa sering kamu merasa marah karena hal-hal yang terjadi di luar kendalimu?", tipe: "negatif" }, // Soal 9 Baru (Menggantikan yang mirip)
    { teks: "Dalam sebulan terakhir, seberapa sering kamu merasa kesulitan atau masalah menumpuk begitu tinggi hingga merasa tidak bisa mengatasinya?", tipe: "negatif" }
];

// Perbarui variabel pengali skor maksimal karena sekarang ada 10 soal (Skor Maksimal = 40)
let skorMaksimal = 40; 


// 2. VARIABEL KONTROL & SKOR
let indeksSekarang = 0;
let totalSkor = 0;
let objekGrafik = null; // Tempat menyimpan grafik agar bisa di-reset nanti

let namaPenggunaStres = ""; // Wadah rahasia penyimpan nama

// 3. FUNGSI MEMULAI KALKULATOR
function mulaiKalkulator() {
    // 1. Ambil teks yang diketik user di input HTML
    const teksInput = document.getElementById("input-nama-stres").value.trim();

    // 2. Validasi: Jika nama masih kosong, cegah masuk dan beri peringatan
    if (teksInput === "") {
        alert("Silakan isi namamu terlebih dahulu sebelum memulai evaluasi ya!");
        return; // Menghentikan fungsi agar tidak lanjut ke soal
    }

    // 3. Jika aman, simpan ke variabel global
    namaPenggunaStres = teksInput;

    // 4. Pindah halaman kuis
    document.getElementById("area-awal").classList.add("sembunyi");
    document.getElementById("area-kuesioner").classList.remove("sembunyi");
    tampilkanPertanyaan();
}

// 4. FUNGSI MENAMPILKAN PERTANYAAN
function tampilkanPertanyaan() {
    const soalAktif = daftarPertanyaan[indeksSekarang];
    
    // Update nomor urut dan teks pertanyaan di HTML
    document.getElementById("no-soal").innerText = indeksSekarang + 1;
    document.getElementById("teks-pertanyaan").innerText = soalAktif.teks;
}

// 5. FUNGSI MEMPROSES SKOR JAWABAN (DENGAN REVERSE SCORING LOGIC)
function prosesJawaban(nilaiSkor) {
    const soalAktif = daftarPertanyaan[indeksSekarang];

    // Cek apakah soal ini bertipe positif (Koping)
    if (soalAktif.tipe === "positif") {
        // Trik Matematika membalik skor: 4 jadi 0, 3 jadi 1, 2 tetap 2, 1 jadi 3, 0 jadi 4
        let skorDibalik = 4 - nilaiSkor;
        totalSkor += skorDibalik;
    } else {
        // Jika soal negatif, tambahkan skor seperti biasa
        totalSkor += nilaiSkor;
    }

    indeksSekarang++; // Maju ke soal berikutnya

    if (indeksSekarang < daftarPertanyaan.length) {
        tampilkanPertanyaan();
    } else {
        tampilkanHasilDiagnosis();
    }
}

// 6. FUNGSI MENAMPILKAN HASIL DIAGNOSIS & GRAFIK
function tampilkanHasilDiagnosis() {
    document.getElementById("area-kuesioner").classList.add("sembunyi");
    document.getElementById("area-hasil").classList.remove("sembunyi");

    document.getElementById("sapaan-nama-stres").innerText = `Halo, ${namaPenggunaStres}! 👋 \n Berikut adalah analisis grafik psikologismu:`;

    // Kategori Cut-off Skor Standar PSS-10 Asli
    let kategori = "";
    if (totalSkor <= 13) {
        kategori = "Stres Ringan (Normal)";
    } else if (totalSkor <= 26) {
        kategori = "Stres Sedang";
    } else {
        kategori = "Stres Berat";
    }

    document.getElementById("status-stres").innerText = kategori;
    document.getElementById("total-skor-teks").innerText = `Total Skormu: ${totalSkor} dari 40 Poin`;

    const ctx = document.getElementById('grafikStres').getContext('2d');
    
    // UBAH ANGKA 16 MENJADI 40 DI SINI
    let sisaPoinMaksimal = 40 - totalSkor; 

    objekGrafik = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Skor Stres Kamu', 'Sisa Batas Aman'],
            datasets: [{
                data: [totalSkor, sisaPoinMaksimal],
                backgroundColor: ['#ef4444', '#e2e8f0'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// 7. FUNGSI RESET & MULAI ULANG
function resetKalkulator() {
    indeksSekarang = 0;
    totalSkor = 0;
    document.getElementById("input-nama-stres").value = ""; // Bersihkan kolom tulisan nama

    // Wajib hancurkan (destroy) grafik lama agar tidak terjadi error bentrok saat tes ulang
    if (objekGrafik) {
        objekGrafik.destroy();
    }

    document.getElementById("area-hasil").classList.add("sembunyi");
    document.getElementById("area-awal").classList.remove("sembunyi");
}

// Pastikan browser sudah selesai memuat seluruh HTML sebelum kode kuis dijalankan
document.addEventListener("DOMContentLoaded", () => {
    console.log("Aplikasi Kalkulator Stres Siap Digunakan!");
})

