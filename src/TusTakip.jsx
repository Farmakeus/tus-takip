import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";

// ===================== DATA =====================
const temelBranslar = [
  {
    id: "anatomi", name: "Anatomi", icon: "\u{1F9B4}", soruSayisi: 13,
    donemler: ["2026 Mart", "2025 Ağ.", "2025 Mart", "2024 Ağ.", "2024 Mart", "2023 Eyl."],
    konular: [
      { name: "Kemikler", dagilim: [1, 0, 3, 1, 0, 1], altBasliklar: ["Üst Ekstremite", "Alt Ekstremite", "Aksiyel İskelet"] },
      { name: "Eklemler", dagilim: [0, 1, 0, 0, 0, 0], altBasliklar: ["Üst Ekstremite Eklemleri", "Alt Ekstremite Eklemleri"] },
      { name: "Kaslar", dagilim: [2, 1, 2, 3, 2, 3], altBasliklar: ["Üst Ekstremite Kasları", "Alt Ekstremite Kasları", "Gövde Kasları", "Baş-Boyun Kasları"] },
      { name: "Solunum Sistemi", dagilim: [2, 1, 1, 1, 2, 1], altBasliklar: ["Üst Solunum Yolları", "Alt Solunum Yolları", "Mediasten"] },
      { name: "Dolaşım Sistemi", dagilim: [3, 3, 0, 2, 1, 1], altBasliklar: ["Kalp", "Arterler", "Venler", "Lenfatik Sistem"] },
      { name: "Gastrointestinal Sistem", dagilim: [2, 3, 2, 1, 1, 1], altBasliklar: ["Üst GİS", "Alt GİS", "Karın Duvarı"] },
      { name: "Ürogenital Sistem", dagilim: [1, 1, 1, 1, 2, 1], altBasliklar: ["Üriner Sistem", "Erkek Genital", "Kadın Genital"] },
      { name: "Nöroanatomi", dagilim: [2, 3, 4, 4, 5, 5], altBasliklar: ["Serebrum", "Serebellum", "Beyin Sapı", "Spinal Kord", "Kranial Sinirler", "Periferik Sinirler"] },
    ],
  },
  {
    id: "fizyoloji", name: "Fizyoloji", icon: "\u26A1", soruSayisi: 15,
    donemler: ["2026 Mart", "2025 Ağ.", "2025 Mart", "2024 Ağ.", "2024 Mart", "2023 Eyl."],
    konular: [
      { name: "Hücre", dagilim: [1, 2, 2, 1, 2, 0] },
      { name: "Doku", dagilim: [2, 2, 2, 2, 2, 3] },
      { name: "Kas", dagilim: [1, 1, 1, 1, 1, 0] },
      { name: "Genital Sistem ve Genel Embriyoloji", dagilim: [2, 3, 2, 2, 3, 2] },
      { name: "Hemopoetik Sistem", dagilim: [0, 1, 0, 1, 0, 0] },
      { name: "Gastrointestinal Sistem", dagilim: [2, 2, 1, 0, 1, 2] },
      { name: "Kardiyovasküler Sistem", dagilim: [2, 1, 3, 1, 1, 1] },
      { name: "Endokrin Sistem", dagilim: [1, 0, 1, 2, 1, 1] },
      { name: "Solunum Sistemi", dagilim: [0, 1, 1, 1, 1, 1] },
      { name: "Sinir Sistemi", dagilim: [3, 2, 2, 3, 2, 3] },
      { name: "Üriner Sistem", dagilim: [1, 0, 0, 1, 1, 2] },
    ],
  },
  {
    id: "biyokimya", name: "Biyokimya", icon: "\u{1F9EA}", soruSayisi: 18,
    donemler: ["2025 Ağ.", "2025 Mart", "2024 Ağ.", "2024 Mart", "2023 Eyl.", "2023 Nis."],
    konular: [
      { name: "Hücre ve Organeller", dagilim: [0, 0, 0, 0, 1, 1] },
      { name: "Metabolizma", dagilim: [1, 0, 0, 0, 1, 2] },
      { name: "Karbonhidratlar", dagilim: [3, 3, 2, 2, 3, 2] },
      { name: "Lipitler", dagilim: [2, 3, 2, 6, 2, 5] },
      { name: "Aminoasitler ve Proteinler", dagilim: [7, 8, 8, 8, 6, 7] },
      { name: "Nükleik Asitler", dagilim: [1, 1, 1, 1, 2, 2] },
      { name: "Vitaminler ve Mineraller", dagilim: [2, 1, 2, 0, 0, 1] },
      { name: "Hormonlar", dagilim: [2, 2, 3, 1, 3, 2] },
    ],
  },
  {
    id: "mikrobiyoloji", name: "Mikrobiyoloji", icon: "\u{1F9A0}", soruSayisi: 18,
    donemler: ["2026 Mart", "2025 Ağ.", "2025 Mart", "2024 Ağ.", "2024 Mart", "2023 Eyl."],
    konular: [
      { name: "Temel Mikrobiyoloji", dagilim: [3, 2, 3, 4, 4, 2] },
      { name: "Bakteriyoloji", dagilim: [6, 8, 6, 5, 6, 7] },
      { name: "Parazitoloji", dagilim: [2, 2, 2, 2, 2, 2] },
      { name: "Mikoloji", dagilim: [3, 2, 2, 3, 2, 2] },
      { name: "Viroloji", dagilim: [2, 3, 3, 2, 3, 3] },
      { name: "İmmunoloji", dagilim: [2, 1, 2, 2, 1, 2] },
    ],
  },
  {
    id: "patoloji", name: "Patoloji", icon: "\u{1F52C}", soruSayisi: 18,
    donemler: ["2026 Mart", "2025 Ağ.", "2025 Mart", "2024 Ağ.", "2024 Mart", "2023 Eyl."],
    konular: [
      { name: "Hücre", dagilim: [1, 1, 2, 1, 2, 3] },
      { name: "İnflamasyon", dagilim: [1, 1, 0, 1, 0, 1] },
      { name: "İmmun Sistem", dagilim: [1, 1, 3, 0, 0, 1] },
      { name: "Onarım ve Yara İyileşmesi", dagilim: [1, 0, 1, 0, 0, 1] },
      { name: "Hemodinamik Hastalıklar", dagilim: [1, 0, 0, 2, 0, 1] },
      { name: "Neoplazi", dagilim: [2, 3, 0, 2, 2, 1] },
      { name: "Solunum Sistemi", dagilim: [2, 0, 1, 2, 1, 1] },
      { name: "Kardiyovasküler Sistem", dagilim: [0, 1, 1, 1, 1, 0] },
      { name: "Hemopoetik Sistem", dagilim: [1, 1, 1, 0, 1, 0] },
      { name: "Gastrointestinal Sistem", dagilim: [2, 1, 2, 1, 2, 3] },
      { name: "Hepatobilier Sistem", dagilim: [1, 0, 1, 1, 2, 0] },
      { name: "Üriner Sistem", dagilim: [1, 1, 0, 1, 2, 2] },
      { name: "Endokrin Sistem", dagilim: [0, 2, 1, 0, 0, 0] },
      { name: "Kadın Genital Sistemi", dagilim: [1, 1, 1, 0, 2, 1] },
      { name: "Erkek Genital Sistemi", dagilim: [1, 1, 1, 1, 0, 0] },
      { name: "Meme Hastalıkları", dagilim: [1, 1, 1, 2, 0, 1] },
      { name: "Sinir Sistemi", dagilim: [0, 1, 0, 0, 0, 0] },
      { name: "Kas İskelet Sistemi", dagilim: [0, 1, 1, 2, 2, 1] },
      { name: "Deri Hastalıkları", dagilim: [1, 1, 1, 1, 1, 1] },
    ],
  },
  {
    id: "farmakoloji", name: "Farmakoloji", icon: "\u{1F48A}", soruSayisi: 18,
    donemler: ["2025 Ağ.", "2025 Mart", "2024 Ağ.", "2024 Mart", "2023 Eyl.", "2023 Nis."],
    konular: [
      { name: "Genel Farmakoloji", dagilim: [1, 1, 1, 2, 2, 3] },
      { name: "Otonom Sinir Sistemi", dagilim: [2, 1, 1, 1, 2, 2] },
      { name: "Santral Sinir Sistemi", dagilim: [3, 3, 3, 4, 3, 3] },
      { name: "Kardiyovasküler Sistem", dagilim: [2, 2, 2, 1, 2, 3] },
      { name: "Solunum Sistemi", dagilim: [1, 0, 0, 0, 1, 0] },
      { name: "Gastrointestinal Sistem", dagilim: [0, 2, 2, 0, 1, 2] },
      { name: "Endokrin Sistem", dagilim: [4, 2, 3, 3, 2, 2] },
      { name: "Otakoidler", dagilim: [0, 1, 0, 0, 0, 0] },
      { name: "NSAİİ", dagilim: [0, 0, 0, 1, 0, 1] },
      { name: "Kemoterapotikler", dagilim: [3, 5, 5, 5, 5, 5] },
      { name: "Toksikoloji", dagilim: [2, 1, 1, 1, 0, 1] },
    ],
  },
  { id: "histoloji", name: "Histoloji ve Embriyoloji", icon: "\u{1F9EB}", soruSayisi: 8 },
  { id: "tibbigenetik", name: "Tıbbi Genetik", icon: "\u{1F9EC}", soruSayisi: 5 },
  { id: "biyoistatistik", name: "Biyoistatistik", icon: "\u{1F4CA}", soruSayisi: 5 },
];

const klinikBranslar = [
  {
    id: "dahiliye", name: "İç Hastalıkları", icon: "\u{1F3E5}", soruSayisi: 23,
    donemler: ["2025 Ağ.", "2025 Mart", "2024 Ağ.", "2024 Mart", "2023 Eyl.", "2023 Nis."],
    konular: [
      { name: "Hematoloji", dagilim: [1, 2, 2, 2, 2, 2] },
      { name: "Onkoloji", dagilim: [1, 2, 2, 2, 2, 2] },
      { name: "Nefroloji", dagilim: [2, 2, 2, 2, 2, 3] },
      { name: "Kardiyoloji", dagilim: [3, 3, 3, 2, 3, 4] },
      { name: "Göğüs Hastalıkları", dagilim: [2, 2, 2, 3, 2, 3] },
      { name: "Gastroenteroloji", dagilim: [2, 0, 2, 2, 0, 2] },
      { name: "Hepatoloji", dagilim: [3, 3, 1, 1, 3, 2] },
      { name: "Endokrin", dagilim: [2, 2, 2, 2, 2, 3] },
      { name: "Romatoloji", dagilim: [3, 2, 2, 2, 2, 2] },
      { name: "Enfeksiyon Hastalıkları", dagilim: [3, 3, 3, 3, 3, 4] },
      { name: "Allerji-İmmunoloji", dagilim: [0, 1, 1, 1, 1, 1] },
      { name: "Geriatri", dagilim: [1, 1, 1, 1, 1, 1] },
    ],
  },
  {
    id: "cerrrahi", name: "Genel Cerrahi", icon: "\u{1F52A}", soruSayisi: 18,
    donemler: ["2025 Ağ.", "2025 Mart", "2024 Ağ.", "2024 Mart", "2023 Eyl.", "2023 Nis."],
    konular: [
      { name: "Temel Cerrahi", dagilim: [5, 7, 7, 5, 5, 7] },
      { name: "Meme Hastalıkları", dagilim: [2, 2, 2, 2, 2, 2] },
      { name: "Tiroid Hastalıkları", dagilim: [1, 1, 2, 0, 2, 1] },
      { name: "Paratiroid Hastalıkları", dagilim: [1, 1, 0, 0, 0, 0] },
      { name: "Adrenal Bez Hastalıkları", dagilim: [0, 0, 0, 2, 0, 1] },
      { name: "Özefagus", dagilim: [1, 1, 0, 0, 0, 1] },
      { name: "Mide", dagilim: [1, 2, 3, 1, 1, 1] },
      { name: "İnce Barsak", dagilim: [2, 0, 0, 2, 1, 2] },
      { name: "Kolorektal", dagilim: [1, 1, 1, 2, 3, 0] },
      { name: "Appendiks", dagilim: [0, 0, 0, 0, 0, 1] },
      { name: "Anal Kanal ve Perianal Bölge", dagilim: [0, 0, 0, 0, 1, 1] },
      { name: "Karaciğer", dagilim: [2, 0, 1, 2, 1, 2] },
      { name: "Safra Yolu ve Safra Kesesi", dagilim: [1, 1, 1, 1, 1, 2] },
      { name: "Pankreas", dagilim: [1, 1, 1, 1, 2, 1] },
      { name: "Dalak", dagilim: [1, 1, 1, 1, 1, 1] },
    ],
  },
  {
    id: "pediatri", name: "Pediatri", icon: "\u{1F476}", soruSayisi: 25,
    donemler: ["2025 Ağ.", "2025 Mart", "2024 Ağ.", "2024 Mart", "2023 Eyl.", "2023 Nis."],
    konular: [
      { name: "Yenidoğan", dagilim: [3, 2, 2, 2, 2, 3] },
      { name: "Genetik", dagilim: [0, 0, 2, 1, 1, 1] },
      { name: "Büyüme ve Gelişme", dagilim: [0, 2, 2, 1, 1, 2] },
      { name: "Beslenme", dagilim: [1, 1, 1, 0, 1, 1] },
      { name: "Gastroenteroloji ve Hepatoloji", dagilim: [2, 1, 1, 2, 1, 2] },
      { name: "Nöroloji", dagilim: [2, 0, 2, 2, 2, 3] },
      { name: "Kardiyoloji", dagilim: [1, 2, 3, 3, 3, 2] },
      { name: "Göğüs Hastalıkları", dagilim: [2, 1, 1, 1, 2, 1] },
      { name: "Döküntülü Hastalıklar", dagilim: [1, 0, 0, 0, 1, 0] },
      { name: "Bağışıklama", dagilim: [1, 0, 1, 0, 1, 4] },
      { name: "Allerji", dagilim: [0, 1, 1, 1, 0, 1] },
      { name: "İmmunoloji", dagilim: [1, 2, 1, 1, 1, 0] },
      { name: "Enfeksiyon Hastalıkları", dagilim: [0, 2, 1, 1, 0, 0] },
      { name: "Endokrinoloji", dagilim: [1, 2, 1, 1, 1, 2] },
      { name: "Metabolik Hastalıklar", dagilim: [1, 2, 1, 2, 1, 1] },
      { name: "Hematoloji", dagilim: [1, 0, 0, 2, 2, 1] },
      { name: "Onkoloji", dagilim: [2, 2, 1, 1, 0, 2] },
      { name: "Nefroloji", dagilim: [3, 2, 1, 1, 2, 1] },
      { name: "Romatoloji", dagilim: [1, 1, 1, 1, 1, 1] },
      { name: "Acil Tıp, Zehirlenmeler ve Yoğun Bakım", dagilim: [1, 1, 1, 1, 2, 1] },
      { name: "Çocuk Psikiyatrisi", dagilim: [1, 1, 1, 1, 0, 1] },
      { name: "Çocuk Cerrahisi", dagilim: [0, 0, 0, 0, 0, 0] },
    ],
  },
  {
    id: "kadinDogum", name: "Kadın Hastalıkları ve Doğum", icon: "\u{1F930}", soruSayisi: 10,
    donemler: ["2026 Mart", "2025 Ağ.", "2025 Mart", "2024 Ağ.", "2024 Mart", "2023 Eyl."],
    konular: [
      { name: "Jinekoloji", dagilim: [2, 1, 1, 1, 3, 2] },
      { name: "Endokrinoloji", dagilim: [3, 3, 3, 2, 2, 4] },
      { name: "Onkoloji", dagilim: [1, 3, 2, 3, 1, 0] },
      { name: "Obstetri", dagilim: [4, 3, 4, 4, 4, 4] },
    ],
  },
  {
    id: "kucukStajlar", name: "Küçük Stajlar", icon: "\u{1F3EB}", soruSayisi: 22,
    donemler: ["2026 Mart", "2025 Ağ.", "2025 Mart", "2024 Ağ.", "2024 Mart", "2023 Eyl."],
    konular: [
      { name: "Nöroloji", dagilim: [3, 2, 3, 3, 1, 2] },
      { name: "Beyin Cerrahisi", dagilim: [1, 1, 2, 1, 2, 1] },
      { name: "Psikiyatri", dagilim: [2, 2, 2, 1, 2, 2] },
      { name: "Halk Sağlığı", dagilim: [1, 1, 1, 1, 1, 1] },
      { name: "Dermatoloji", dagilim: [2, 2, 2, 2, 2, 2] },
      { name: "Radyoloji", dagilim: [2, 1, 1, 1, 1, 1] },
      { name: "Nükleer Tıp", dagilim: [0, 1, 1, 1, 1, 1] },
      { name: "KBB", dagilim: [1, 1, 1, 2, 1, 1] },
      { name: "Göz Hastalıkları", dagilim: [1, 1, 1, 1, 1, 1] },
      { name: "Ortopedi", dagilim: [1, 2, 2, 1, 2, 1] },
      { name: "FTR", dagilim: [1, 2, 0, 2, 0, 1] },
      { name: "Üroloji", dagilim: [0, 1, 1, 1, 1, 1] },
      { name: "Çocuk Cerrahisi", dagilim: [1, 1, 1, 1, 1, 1] },
      { name: "Kalp Damar Cerrahisi", dagilim: [1, 1, 1, 2, 2, 1] },
      { name: "Göğüs Cerrahisi", dagilim: [1, 0, 1, 0, 1, 1] },
      { name: "Plastik Cerrahi", dagilim: [1, 0, 0, 0, 0, 0] },
      { name: "Anestezi", dagilim: [1, 1, 1, 1, 1, 1] },
      { name: "Acil Tıp ve Zehirlenmeler", dagilim: [2, 2, 1, 1, 2, 3] },
      { name: "Adli Tıp", dagilim: [0, 0, 0, 0, 0, 0] },
    ],
  },
];

const tumBranslar = [
  ...temelBranslar.map(b => ({ ...b, kategori: "Temel Tıp" })),
  ...klinikBranslar.map(b => ({ ...b, kategori: "Klinik Tıp" })),
];

// All branslar that have konular (subtopics)
const branslarWithKonular = tumBranslar.filter(b => b.konular && b.konular.length > 0);

const haftaGunleri = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

// ===================== HELPERS =====================
const LS_KEY = "tus_takip_data";
const THEME_KEY = "tus_takip_theme";

function loadData() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveData(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

function defaultData() {
  return {
    hedefPuan: 70,
    sinavTarihi: "2026-08-23",
    konuDurumlari: {},
    soruCozumleri: [],
    denemeler: [],
    haftalikPlan: {},
    calismaKayitlari: [],
    gunlukHedef: 100,
    pomodoroSayisi: 0,
    notlar: {},
    flashcards: [],
    hataliSorular: [],
  };
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
}

function kalanGun(tarih) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const hedef = new Date(tarih);
  hedef.setHours(0, 0, 0, 0);
  return Math.ceil((hedef - now) / (1000 * 60 * 60 * 24));
}

function hesaplaNet(dogru, yanlis) {
  return Math.max(0, dogru - yanlis * 0.25);
}

// Get all trackable items for konu takibi (subtopics for brans with konular, brans itself otherwise)
function getAllKonuKeys() {
  const keys = [];
  tumBranslar.forEach(b => {
    if (b.konular && b.konular.length > 0) {
      b.konular.forEach(k => {
        keys.push(`${b.id}_${k.name}`);
        if (k.altBasliklar) {
          k.altBasliklar.forEach(ab => {
            keys.push(`${b.id}_${k.name}_${ab}`);
          });
        }
      });
    } else {
      keys.push(b.id);
    }
  });
  return keys;
}

// Get brans-level progress from subtopic statuses
function durumToPct(durum) {
  return durum === "tamamlandi" ? 100 : durum === "devam" ? 50 : durum === "tekrar" ? 75 : 0;
}

function getBransProgress(brans, konuDurumlari) {
  if (!brans.konular || brans.konular.length === 0) {
    const durum = konuDurumlari[brans.id] || "baslanmadi";
    return durumToPct(durum);
  }
  let total = 0;
  let count = 0;
  brans.konular.forEach(k => {
    if (k.altBasliklar && k.altBasliklar.length > 0) {
      k.altBasliklar.forEach(ab => {
        const abKey = `${brans.id}_${k.name}_${ab}`;
        total += durumToPct(konuDurumlari[abKey] || "baslanmadi");
        count++;
      });
    } else {
      const key = `${brans.id}_${k.name}`;
      total += durumToPct(konuDurumlari[key] || "baslanmadi");
      count++;
    }
  });
  return count > 0 ? total / count : 0;
}

// Calculate average for a dagilim array
function ortalama(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}

// Old brans IDs that have been folded into subtopics
const oldRemovedBransIds = [
  "kardiyoloji", "noroloji", "psikiyatri", "dermatoloji", "kbb", "goz",
  "uroloji", "ortopedi", "enfeksiyon", "radyoloji", "anestezi", "acil",
  "ftr", "halkSagligi", "adliTip", "gogus",
];

// Beep sound for pomodoro (short sine wave beep as base64 WAV)
const BEEP_SOUND = "data:audio/wav;base64,UklGRlQGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTAGAAAAAAEAAgADAAQABQAHAAgACgAMAA4AEAASABUAFwAaAB0AIAAjACYAKQAtADAANAA4ADwAQABEAEgATQBRAFYAWgBfAGQAaQBuAHMAdwB8AIEAhgCLAJAAlQCaAJ8ApACpAK4AsgC3ALwAwADFAMoAzgDTANcA3ADgAOQA6QDtAPEA9QD5AP0AAQEFAQkBDQERABUBGAEcAR8BIwEmASoBLQEwATMBNgE5ATsBPgFAAUIBRAFGAUgBSgFLAU0BTgFPAVABUQFRAVIBUgFSAVIBUgFRAVEBUAFPAU4BTQFLAUoBSAFGAUQBQgE/AT0BOgE3ATQBMQEuASsBJwEkASABHAEYARQBEAEMAQgBBAEAAfsA9wDyAO4A6QDlAOAA2wDWANEAzADHAMIAvQC4ALMArgCpAKMAHgCZAJQAjwCKAIUAgAB7AHYAcQBsAGcAYgBdAFgAUwBOAEoARQBAADwANwAzAC8AKgAmACIAHgAaABYAEgAOAAoABwADAAAA/f/6//f/9P/x/+7/6//o/+X/4//g/97/2//Z/9f/1f/T/9H/z//N/8z/yv/J/8f/xv/F/8T/w//C/8H/wf/A/8D/wP/A/8D/wP/A/8H/wf/C/8L/w//E/8X/xv/H/8j/yv/L/83/zv/Q/9L/1P/W/9j/2v/d/9//4v/k/+f/6v/t//D/8//2//n//P///wIABQAIAAsADwASABUAGQAcACAAIwAnACoALgAyADUAOQA9AEEARABIAEwAUABUAFgAXABgAGQAaABsAHAAdAB4AHwAgACEAIgAjACQAJQAmACbAJ8AowCmAKoArgCxALQAuAC7AL4AwQDEAMcAygDNANAA0gDVANcA2QDcAN4A4ADiAOQA5QDnAOkA6gDrAO0A7gDvAPAA8QDyAPIA8wDzAPQA9ADzAPQA9ADzAPMA8wDyAPIA8QDwAO8A7gDtAOwA6gDpAOcA5QDjAOEA3wDdANsA2ADWANMA0QDOAMsAyADFAMIAvwC8ALgAtQCxAK4AqgCmAKIAngCaAJYAkgCOAIkAhQCBAHwAdwBzAG4AaQBkAF8AWgBVAFAASwBGAEEAPAA3ADIALQAoACMAHgAZABQADwAKAAUAAAAA/P/3//L/7f/o/+P/3v/Z/9T/z//L/8b/wf+9/7j/tP+v/6v/p/+j/5//m/+X/5P/j/+M/4j/hf+C/3//fP95/3b/c/9x/2//bP9q/2j/Zv9l/2P/Yf9g/1//Xv9d/1z/W/9b/1r/Wv9a/1r/Wv9b/1v/XP9d/17/X/9g/2H/Y/9k/2b/aP9q/2z/bv9x/3P/dv95/3z/f/+C/4X/if+M/5D/k/+X/5v/n/+j/6f/q/+v/7T/uP+9/8H/xv/K/8//1P/Z/97/4//o/+3/8v/3//z/AAAFAAoADwAUABkAHgAjACgALQAyADcAPABBAEYASgBPAFQAWABdAGEAZgBqAG4AcgB2AHoAfgCCAIYAigCNAJEAlACXAJoAnQCgAKMAJgCoAKoArQCvALEAswC0ALYAtwC5ALoAuwC8AL0AvgC+AL8AvwC/AL8AvwC/AL4AvgC9ALwAuwC6ALkAtwC2ALQAsgCwAK4ArACpAKcApACiAJ8AnACZAJYAkgCPAIwAiACFAIEAfQB6AHYAcgBuAGoAZgBiAF4AWgBWAFIATgBKAEYAQgA+ADoANgAyAC4AKgAmACIAHgAaABcAEwAPAAwACAAFAAIAAAAAAA==";

// Image compression helper for hatali sorular
function compressImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let w = img.width;
        let h = img.height;
        if (w > 800) {
          h = Math.round((h * 800) / w);
          w = 800;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.6));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ===================== THEME COLORS =====================
const lightColors = {
  bg: "#f0f4f0",
  card: "#ffffff",
  cardHover: "#e8f0e8",
  primary: "#2e7d32",
  primaryHover: "#1b5e20",
  success: "#388e3c",
  warning: "#f57f17",
  danger: "#c62828",
  text: "#1a2e1a",
  textMuted: "#5a7a5a",
  border: "#c8d8c8",
  inputBg: "#f5f9f5",
  temel: "#00695c",
  klinik: "#1565c0",
};

const darkColors = {
  bg: "#121a12",
  card: "#1a2e1a",
  cardHover: "#243424",
  primary: "#43a047",
  primaryHover: "#388e3c",
  success: "#4caf50",
  warning: "#ffb300",
  danger: "#ef5350",
  text: "#e8f5e9",
  textMuted: "#81c784",
  border: "#2e4a2e",
  inputBg: "#0d160d",
  temel: "#26a69a",
  klinik: "#42a5f5",
};

function getColors(theme) {
  return theme === "dark" ? darkColors : lightColors;
}

function getBaseStyles(colors, theme) {
  return {
    container: {
      minHeight: "100vh",
      background: theme === "dark"
        ? "linear-gradient(135deg, #121a12 0%, #1a2e1a 100%)"
        : "linear-gradient(135deg, #f0f4f0 0%, #e8f0e8 100%)",
      color: colors.text,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: "0",
    },
    header: {
      background: theme === "dark"
        ? "linear-gradient(135deg, #0d1f0d 0%, #1a3a1a 100%)"
        : "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #43a047 100%)",
      padding: "20px 24px",
      borderBottom: `1px solid ${colors.border}`,
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(12px)",
    },
    headerContent: {
      maxWidth: 1200,
      margin: "0 auto",
    },
    title: {
      fontSize: 26,
      fontWeight: 800,
      margin: 0,
      background: "linear-gradient(135deg, #43a047, #81c784)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      fontSize: 13,
      color: "#ffffffcc",
      margin: "4px 0 0",
    },
    nav: {
      display: "flex",
      gap: 4,
      marginTop: 16,
      overflowX: "auto",
      paddingBottom: 4,
      WebkitOverflowScrolling: "touch",
      scrollbarWidth: "thin",
    },
    navBtn: (active) => ({
      padding: "8px 16px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 600,
      background: active ? "rgba(255,255,255,0.25)" : "transparent",
      color: active ? "#fff" : "#ffffffaa",
      transition: "all 0.2s",
      whiteSpace: "nowrap",
    }),
    main: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "24px 16px",
    },
    card: {
      background: colors.card,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      border: `1px solid ${colors.border}`,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 16,
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    input: {
      background: colors.inputBg,
      border: `1px solid ${colors.border}`,
      borderRadius: 8,
      padding: "8px 12px",
      color: colors.text,
      fontSize: 14,
      width: "100%",
      boxSizing: "border-box",
      outline: "none",
    },
    select: {
      background: colors.inputBg,
      border: `1px solid ${colors.border}`,
      borderRadius: 8,
      padding: "8px 12px",
      color: colors.text,
      fontSize: 14,
      width: "100%",
      boxSizing: "border-box",
      outline: "none",
    },
    btn: (variant = "primary") => ({
      padding: "8px 16px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 600,
      background: variant === "primary" ? colors.primary : variant === "danger" ? colors.danger : variant === "success" ? colors.success : colors.cardHover,
      color: "#fff",
      transition: "all 0.2s",
    }),
    grid2: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: 16,
    },
    grid3: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 12,
    },
    badge: (color) => ({
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 6,
      fontSize: 11,
      fontWeight: 600,
      background: color + "22",
      color: color,
    }),
    progressBar: (pct, color) => ({
      height: 6,
      borderRadius: 3,
      background: colors.border,
      position: "relative",
      overflow: "hidden",
      flex: 1,
    }),
    progressFill: (pct, color) => ({
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: `${Math.min(100, pct)}%`,
      borderRadius: 3,
      background: color || colors.primary,
      transition: "width 0.5s ease",
    }),
    label: {
      fontSize: 12,
      color: colors.textMuted,
      marginBottom: 4,
      display: "block",
      fontWeight: 500,
    },
    statBox: {
      textAlign: "center",
      padding: 16,
      borderRadius: 10,
      background: colors.inputBg,
      minWidth: 100,
    },
    statValue: {
      fontSize: 28,
      fontWeight: 800,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textMuted,
      marginTop: 4,
    },
    deleteBtn: {
      background: "none",
      border: "none",
      color: colors.danger,
      cursor: "pointer",
      fontSize: 16,
      padding: "4px 8px",
      borderRadius: 4,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13,
      minWidth: 500,
    },
    th: {
      textAlign: "left",
      padding: "8px 12px",
      borderBottom: `1px solid ${colors.border}`,
      color: colors.textMuted,
      fontWeight: 600,
      fontSize: 12,
      whiteSpace: "nowrap",
    },
    td: {
      padding: "10px 12px",
      borderBottom: `1px solid ${colors.border}22`,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: 200,
    },
  };
}

// ===================== MINI CHART (SVG Bar) =====================
function MiniBarChart({ data, height = 120, barColor, colors }) {
  if (!data || data.length === 0) return <div style={{ color: colors.textMuted, fontSize: 13 }}>Henüz veri yok</div>;
  const max = Math.max(...data.map(d => d.value), 1);
  const barW = Math.min(32, Math.floor(280 / data.length) - 4);
  const w = data.length * (barW + 4);
  return (
    <svg width="100%" height={height + 24} viewBox={`0 0 ${Math.max(w, 100)} ${height + 24}`} style={{ overflow: "visible" }}>
      {data.map((d, i) => {
        const h = (d.value / max) * height;
        return (
          <g key={i}>
            <rect x={i * (barW + 4)} y={height - h} width={barW} height={h} rx={3} fill={d.color || barColor || colors.primary} opacity={0.85} />
            <text x={i * (barW + 4) + barW / 2} y={height - h - 4} textAnchor="middle" fill={colors.textMuted} fontSize={10}>{d.value.toFixed(1)}</text>
            <text x={i * (barW + 4) + barW / 2} y={height + 14} textAnchor="middle" fill={colors.textMuted} fontSize={9}>{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function MiniLineChart({ data, height = 100, color, colors }) {
  if (!data || data.length < 2) return <div style={{ color: colors.textMuted, fontSize: 13 }}>En az 2 veri noktası gerekli</div>;
  const max = Math.max(...data.map(d => d.value), 1);
  const min = Math.min(...data.map(d => d.value), 0);
  const range = max - min || 1;
  const w = 300;
  const stepX = w / (data.length - 1);
  const points = data.map((d, i) => `${i * stepX},${height - ((d.value - min) / range) * (height - 10)}`).join(" ");
  return (
    <svg width="100%" height={height + 24} viewBox={`0 0 ${w} ${height + 24}`} style={{ overflow: "visible" }}>
      <polyline points={points} fill="none" stroke={color || colors.primary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={i * stepX} cy={height - ((d.value - min) / range) * (height - 10)} r={3} fill={color || colors.primary} />
          <text x={i * stepX} y={height + 16} textAnchor="middle" fill={colors.textMuted} fontSize={9}>{d.label}</text>
        </g>
      ))}
    </svg>
  );
}

// ===================== COMPONENTS =====================

// --- Dashboard ---
function Dashboard({ data, setData, colors, baseStyles }) {
  const kalan = kalanGun(data.sinavTarihi);
  const toplamSoru = data.soruCozumleri.reduce((s, c) => s + c.dogru + c.yanlis + (c.bos || 0), 0);
  const toplamDogru = data.soruCozumleri.reduce((s, c) => s + c.dogru, 0);
  const toplamYanlis = data.soruCozumleri.reduce((s, c) => s + c.yanlis, 0);
  const basariOrani = toplamSoru > 0 ? ((toplamDogru / toplamSoru) * 100).toFixed(1) : 0;
  const sonDenemeler = [...data.denemeler].sort((a, b) => new Date(b.tarih) - new Date(a.tarih)).slice(0, 5);

  const allKeys = getAllKonuKeys();
  const tamamlananKonuSayisi = allKeys.filter(k => data.konuDurumlari[k] === "tamamlandi").length;
  const toplamKonu = allKeys.length;

  const calismaSuresi = data.calismaKayitlari.reduce((s, c) => s + (c.sure || 0), 0);
  const saatStr = (calismaSuresi / 60).toFixed(0);

  // Gunluk hedef
  const bugunStr = new Date().toISOString().slice(0, 10);
  const bugunSoru = data.soruCozumleri.filter(s => s.tarih === bugunStr).reduce((s, c) => s + c.dogru + c.yanlis + (c.bos || 0), 0);
  const hedefYuzde = data.gunlukHedef > 0 ? Math.min(100, (bugunSoru / data.gunlukHedef) * 100) : 0;

  // Streak hesaplama
  const streak = useMemo(() => {
    const tarihSet = new Set();
    data.soruCozumleri.forEach(s => tarihSet.add(s.tarih));
    const sortedDates = [...tarihSet].sort();
    let current = 0;
    let best = 0;
    // Check from today backwards
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let checkDate = new Date(today);
    // Check if today has questions, if not start from yesterday
    const todayStr = checkDate.toISOString().slice(0, 10);
    if (!tarihSet.has(todayStr)) {
      checkDate.setDate(checkDate.getDate() - 1);
    }
    while (true) {
      const ds = checkDate.toISOString().slice(0, 10);
      if (tarihSet.has(ds)) {
        current++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    // Best streak from all dates
    if (sortedDates.length > 0) {
      let tempStreak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const prev = new Date(sortedDates[i - 1]);
        const curr = new Date(sortedDates[i]);
        const diff = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
        if (diff === 1) {
          tempStreak++;
        } else {
          best = Math.max(best, tempStreak);
          tempStreak = 1;
        }
      }
      best = Math.max(best, tempStreak);
    }
    best = Math.max(best, current);
    return { current, best };
  }, [data.soruCozumleri]);

  // Zayıf konu onerileri
  const zayifKonular = useMemo(() => {
    const bransStats = tumBranslar.map(b => {
      const kayitlar = data.soruCozumleri.filter(s => s.bransId === b.id);
      const topDogru = kayitlar.reduce((s, c) => s + c.dogru, 0);
      const topYanlis = kayitlar.reduce((s, c) => s + c.yanlis, 0);
      const topBos = kayitlar.reduce((s, c) => s + (c.bos || 0), 0);
      const topSoru = topDogru + topYanlis + topBos;
      const basari = topSoru > 0 ? (topDogru / topSoru) * 100 : -1;
      return { ...b, topSoru, basari };
    }).filter(b => b.topSoru >= 5);
    return bransStats.sort((a, b) => a.basari - b.basari).slice(0, 3);
  }, [data.soruCozumleri]);

  // Export/Import
  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tus-takip-yedek-${bugunStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed && typeof parsed === "object" && parsed.sinavTarihi) {
          if (confirm("Mevcut veriler yeni verilerle değiştirilecek. Emin misiniz?")) {
            setData(parsed);
          }
        } else {
          alert("Geçersiz yedek dosyası!");
        }
      } catch {
        alert("Dosya okunamadı! Geçerli bir JSON dosyası seçin.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const getBransProgressColor = (pct) => {
    if (pct >= 90) return colors.success;
    if (pct >= 50) return colors.warning;
    if (pct > 0) return colors.klinik;
    return colors.border;
  };

  return (
    <div>
      {/* Countdown */}
      <div style={{ ...baseStyles.card, background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)", textAlign: "center", padding: 32 }}>
        <div style={{ fontSize: 14, color: "#ffffffcc", marginBottom: 8 }}>TUS Sınavına Kalan</div>
        <div style={{ fontSize: 56, fontWeight: 900, background: kalan <= 30 ? "linear-gradient(135deg, #c62828, #f57f17)" : "linear-gradient(135deg, #43a047, #81c784)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {kalan > 0 ? kalan : 0} Gün
        </div>
        <div style={{ fontSize: 13, color: "#ffffffcc", marginTop: 4 }}>
          Hedef: {formatDate(data.sinavTarihi)} | Hedef Puan: {data.hedefPuan}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
          <label style={{ fontSize: 12, color: "#ffffffcc" }}>
            Sınav Tarihi:
            <input type="date" value={data.sinavTarihi} onChange={e => setData(d => ({ ...d, sinavTarihi: e.target.value }))} style={{ ...baseStyles.input, width: 150, marginLeft: 6, color: "#fff", background: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)" }} />
          </label>
          <label style={{ fontSize: 12, color: "#ffffffcc" }}>
            Hedef Puan:
            <input type="number" value={data.hedefPuan} min={0} max={100} onChange={e => setData(d => ({ ...d, hedefPuan: Number(e.target.value) }))} style={{ ...baseStyles.input, width: 80, marginLeft: 6, color: "#fff", background: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)" }} />
          </label>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Çözülen Soru", value: toplamSoru, color: colors.primary },
          { label: "Başarı Oranı", value: `%${basariOrani}`, color: colors.success },
          { label: "Toplam Net", value: hesaplaNet(toplamDogru, toplamYanlis).toFixed(1), color: colors.warning },
          { label: "Deneme Sayısı", value: data.denemeler.length, color: "#43a047" },
          { label: "Konu İlerlemesi", value: `${tamamlananKonuSayisi}/${toplamKonu}`, color: colors.klinik },
          { label: "Çalışma Süresi", value: `${saatStr} sa`, color: "#66bb6a" },
        ].map((s, i) => (
          <div key={i} style={baseStyles.statBox}>
            <div style={{ ...baseStyles.statValue, color: s.color }}>{s.value}</div>
            <div style={baseStyles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Gunluk Hedef + Streak */}
      <div style={baseStyles.grid2}>
        <div style={baseStyles.card}>
          <div style={baseStyles.cardTitle}>Günlük Hedef</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: colors.textMuted, whiteSpace: "nowrap" }}>Hedef:</label>
            <input type="number" min={1} value={data.gunlukHedef} onChange={e => setData(d => ({ ...d, gunlukHedef: Math.max(1, Number(e.target.value) || 1) }))} style={{ ...baseStyles.input, width: 80 }} />
            <span style={{ fontSize: 12, color: colors.textMuted }}>soru/gün</span>
          </div>
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
              <span>Bugün: <strong>{bugunSoru}</strong> / {data.gunlukHedef} soru</span>
              <span style={{ fontWeight: 700, color: hedefYuzde >= 100 ? colors.success : colors.primary }}>%{hedefYuzde.toFixed(0)}</span>
            </div>
            <div style={{ height: 10, borderRadius: 5, background: colors.border, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 5, width: `${Math.min(100, hedefYuzde)}%`, background: hedefYuzde >= 100 ? colors.success : colors.primary, transition: "width 0.5s ease" }} />
            </div>
          </div>
          {hedefYuzde >= 100 && <div style={{ fontSize: 13, color: colors.success, fontWeight: 600, textAlign: "center", marginTop: 8 }}>Günlük hedefe ulaştın! Tebrikler!</div>}
        </div>
        <div style={baseStyles.card}>
          <div style={baseStyles.cardTitle}>Çalışma Serisi</div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: streak.current > 0 ? colors.warning : colors.textMuted }}>
                {streak.current > 0 ? "\u{1F525}" : ""} {streak.current}
              </div>
              <div style={{ fontSize: 12, color: colors.textMuted }}>Mevcut Seri</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: colors.primary }}>
                {streak.best}
              </div>
              <div style={{ fontSize: 12, color: colors.textMuted }}>En İyi Seri</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: colors.textMuted, textAlign: "center", marginTop: 8 }}>
            Art arda en az 1 soru çözülen gün sayısı
          </div>
        </div>
      </div>

      {/* Zayif Konu Onerileri */}
      <div style={baseStyles.card}>
        <div style={{ ...baseStyles.cardTitle, color: colors.warning }}>Bugün Şu Konulara Odaklan</div>
        {zayifKonular.length === 0 ? (
          <div style={{ color: colors.textMuted, fontSize: 13, textAlign: "center", padding: 12 }}>
            Daha fazla soru çözdükçe sana özel öneriler burada görünecek. Devam et!
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {zayifKonular.map((b, i) => (
              <div key={b.id} style={{ padding: "10px 16px", borderRadius: 8, background: colors.danger + "15", border: `1px solid ${colors.danger}33`, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>{b.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted }}>{b.topSoru} soru - %{b.basari.toFixed(0)} başarı</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Son Denemeler */}
      {sonDenemeler.length > 0 && (
        <div style={baseStyles.card}>
          <div style={baseStyles.cardTitle}>Son Denemeler</div>
          <MiniLineChart
            data={sonDenemeler.reverse().map(d => ({
              value: d.toplamNet,
              label: new Date(d.tarih).toLocaleDateString("tr-TR", { day: "numeric", month: "short" }),
            }))}
            color={colors.success}
            colors={colors}
          />
        </div>
      )}

      {/* Konu Ilerlemesi Ozet */}
      <div style={baseStyles.grid2}>
        <div style={baseStyles.card}>
          <div style={baseStyles.cardTitle}><span style={{ color: colors.temel }}>&#9632;</span> Temel Bilimler İlerleme</div>
          {temelBranslar.map(b => {
            const pct = getBransProgress(b, data.konuDurumlari);
            const c = getBransProgressColor(pct);
            return (
              <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 14, width: 20 }}>{b.icon}</span>
                <span style={{ fontSize: 12, width: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.name}</span>
                <div style={baseStyles.progressBar(pct)}>
                  <div style={baseStyles.progressFill(pct, c)} />
                </div>
                <span style={{ fontSize: 10, color: colors.textMuted, width: 32, textAlign: "right" }}>{Math.round(pct)}%</span>
              </div>
            );
          })}
        </div>
        <div style={baseStyles.card}>
          <div style={baseStyles.cardTitle}><span style={{ color: colors.klinik }}>&#9632;</span> Klinik Bilimler İlerleme</div>
          {klinikBranslar.map(b => {
            const pct = getBransProgress(b, data.konuDurumlari);
            const c = getBransProgressColor(pct);
            const isKucukStaj = b.id === "kucukStajlar";
            return (
              <div key={b.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 14, width: 20 }}>{b.icon}</span>
                  <span style={{ fontSize: 12, width: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.name}</span>
                  <div style={baseStyles.progressBar(pct)}>
                    <div style={baseStyles.progressFill(pct, c)} />
                  </div>
                  <span style={{ fontSize: 10, color: colors.textMuted, width: 32, textAlign: "right" }}>{Math.round(pct)}%</span>
                </div>
                {isKucukStaj && b.konular && b.konular.map(k => {
                  const key = `${b.id}_${k.name}`;
                  const durum = data.konuDurumlari[key] || "baslanmadi";
                  const subPct = durum === "tamamlandi" ? 100 : durum === "devam" ? 50 : durum === "tekrar" ? 75 : 0;
                  const subColor = getBransProgressColor(subPct);
                  return (
                    <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, paddingLeft: 40 }}>
                      <span style={{ fontSize: 11, width: 130, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: colors.textMuted }}>{k.name}</span>
                      <div style={{ ...baseStyles.progressBar(subPct), height: 4 }}>
                        <div style={{ ...baseStyles.progressFill(subPct, subColor), height: 4 }} />
                      </div>
                      <span style={{ fontSize: 9, color: colors.textMuted, width: 28, textAlign: "right" }}>{Math.round(subPct)}%</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Veri Yedekleme */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Veri Yedekleme</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <button onClick={exportData} style={baseStyles.btn("primary")}>Verileri Dışa Aktar (JSON)</button>
          <label style={{ ...baseStyles.btn("success"), display: "inline-block", cursor: "pointer" }}>
            Verileri İçe Aktar
            <input type="file" accept=".json" onChange={importData} style={{ display: "none" }} />
          </label>
        </div>
      </div>
    </div>
  );
}

// --- Konu Takibi (Enhanced with subtopics) ---
function KonuTakibi({ data, setData, colors, baseStyles }) {
  const [expandedBrans, setExpandedBrans] = useState({});
  const [expandedKonu, setExpandedKonu] = useState({});

  const durumlar = [
    { id: "baslanmadi", label: "Başlanmadı", color: colors.textMuted },
    { id: "devam", label: "Devam Ediyor", color: colors.warning },
    { id: "tekrar", label: "Tekrar Aşamasında", color: colors.klinik },
    { id: "tamamlandi", label: "Tamamlandı", color: colors.success },
  ];

  const setDurum = (key, durum) => {
    setData(d => ({
      ...d,
      konuDurumlari: { ...d.konuDurumlari, [key]: durum },
    }));
  };

  const toggleExpand = (bransId) => {
    setExpandedBrans(prev => ({ ...prev, [bransId]: !prev[bransId] }));
  };

  const getBransProgressColor = (pct) => {
    if (pct >= 90) return colors.success;
    if (pct >= 50) return colors.warning;
    if (pct > 0) return colors.klinik;
    return colors.border;
  };

  const renderBransGrubu = (baslik, branslar, renk) => (
    <div style={baseStyles.card}>
      <div style={{ ...baseStyles.cardTitle, fontSize: 18 }}>
        <span style={{ color: renk }}>&#9632;</span> {baslik}
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {branslar.map(b => {
          const hasKonular = b.konular && b.konular.length > 0;
          const isExpanded = expandedBrans[b.id];
          const pct = getBransProgress(b, data.konuDurumlari);
          const pctColor = getBransProgressColor(pct);

          return (
            <div key={b.id}>
              {/* Brans header */}
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                  background: colors.inputBg, borderRadius: hasKonular && isExpanded ? "8px 8px 0 0" : 8,
                  cursor: hasKonular ? "pointer" : "default", flexWrap: "wrap",
                }}
                onClick={() => hasKonular && toggleExpand(b.id)}
              >
                {hasKonular && (
                  <span style={{ fontSize: 12, color: colors.textMuted, width: 16, textAlign: "center", transition: "transform 0.2s", transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}>
                    &#9654;
                  </span>
                )}
                <span style={{ fontSize: 20, width: 28 }}>{b.icon}</span>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted }}>
                    Soru payı: ~{b.soruSayisi}
                    {hasKonular && ` | ${b.konular.length} alt konu`}
                  </div>
                </div>
                {/* Brans-level progress bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 120 }}>
                  <div style={{ ...baseStyles.progressBar(pct), width: 80 }}>
                    <div style={baseStyles.progressFill(pct, pctColor)} />
                  </div>
                  <span style={{ fontSize: 11, color: pctColor, fontWeight: 600, width: 32, textAlign: "right" }}>{Math.round(pct)}%</span>
                </div>
                {/* For brans without konular, show status buttons */}
                {!hasKonular && (
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {durumlar.map(d => {
                      const durum = data.konuDurumlari[b.id] || "baslanmadi";
                      return (
                        <button
                          key={d.id}
                          onClick={(e) => { e.stopPropagation(); setDurum(b.id, d.id); }}
                          style={{
                            padding: "4px 10px", borderRadius: 6,
                            border: durum === d.id ? `2px solid ${d.color}` : `1px solid ${colors.border}`,
                            background: durum === d.id ? d.color + "22" : "transparent",
                            color: durum === d.id ? d.color : colors.textMuted,
                            fontSize: 11, fontWeight: 600, cursor: "pointer",
                          }}
                        >
                          {d.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Expanded subtopics */}
              {hasKonular && isExpanded && (
                <div style={{ background: colors.card, borderRadius: "0 0 8px 8px", border: `1px solid ${colors.border}`, borderTop: "none", padding: "8px 0" }}>
                  {b.konular.map((k, ki) => {
                    const key = `${b.id}_${k.name}`;
                    const durum = data.konuDurumlari[key] || "baslanmadi";
                    const avg = ortalama(k.dagilim);
                    const hasAltBasliklar = k.altBasliklar && k.altBasliklar.length > 0;
                    const isKonuExpanded = expandedKonu[key];
                    // Calculate konu progress from altBasliklar
                    const konuPct = hasAltBasliklar
                      ? k.altBasliklar.reduce((s, ab) => s + durumToPct(data.konuDurumlari[`${b.id}_${k.name}_${ab}`] || "baslanmadi"), 0) / k.altBasliklar.length
                      : durumToPct(durum);
                    const konuPctColor = konuPct >= 90 ? colors.success : konuPct >= 50 ? colors.warning : konuPct > 0 ? colors.klinik : colors.border;
                    return (
                      <div key={ki}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 16px 6px 52px", flexWrap: "wrap", cursor: hasAltBasliklar ? "pointer" : "default" }}
                          onClick={() => hasAltBasliklar && setExpandedKonu(prev => ({ ...prev, [key]: !prev[key] }))}
                        >
                          {hasAltBasliklar && (
                            <span style={{ fontSize: 10, color: colors.textMuted, width: 14, textAlign: "center", transition: "transform 0.2s", transform: isKonuExpanded ? "rotate(90deg)" : "rotate(0deg)" }}>
                              &#9654;
                            </span>
                          )}
                          <div style={{ flex: 1, minWidth: 160 }}>
                            <div style={{ fontSize: 13, fontWeight: 500 }}>{k.name}</div>
                            <div style={{ fontSize: 10, color: colors.textMuted }}>
                              Ort: {avg.toFixed(1)} soru/sınav
                              {hasAltBasliklar && ` | ${k.altBasliklar.length} alt başlık`}
                            </div>
                          </div>
                          {/* High yield indicator */}
                          {avg >= 2.5 && (
                            <span style={{ ...baseStyles.badge(colors.warning), fontSize: 9, padding: "1px 6px" }}>
                              Yüksek Verim
                            </span>
                          )}
                          {hasAltBasliklar && (
                            <div style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 80 }}>
                              <div style={{ ...baseStyles.progressBar(konuPct), width: 50, height: 4 }}>
                                <div style={{ ...baseStyles.progressFill(konuPct, konuPctColor), height: 4 }} />
                              </div>
                              <span style={{ fontSize: 9, color: konuPctColor, fontWeight: 600 }}>{Math.round(konuPct)}%</span>
                            </div>
                          )}
                          {!hasAltBasliklar && (
                            <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                              {durumlar.map(d => (
                                <button
                                  key={d.id}
                                  onClick={(e) => { e.stopPropagation(); setDurum(key, d.id); }}
                                  style={{
                                    padding: "3px 8px", borderRadius: 5,
                                    border: durum === d.id ? `2px solid ${d.color}` : `1px solid ${colors.border}`,
                                    background: durum === d.id ? d.color + "22" : "transparent",
                                    color: durum === d.id ? d.color : colors.textMuted,
                                    fontSize: 10, fontWeight: 600, cursor: "pointer",
                                  }}
                                >
                                  {d.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Alt Basliklar (third level) */}
                        {hasAltBasliklar && isKonuExpanded && (
                          <div style={{ paddingLeft: 80, paddingRight: 16, paddingBottom: 4 }}>
                            {k.altBasliklar.map((ab, abi) => {
                              const abKey = `${b.id}_${k.name}_${ab}`;
                              const abDurum = data.konuDurumlari[abKey] || "baslanmadi";
                              return (
                                <div key={abi} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", flexWrap: "wrap" }}>
                                  <div style={{ flex: 1, minWidth: 120 }}>
                                    <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 500 }}>{ab}</div>
                                  </div>
                                  <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                                    {durumlar.map(d => (
                                      <button
                                        key={d.id}
                                        onClick={() => setDurum(abKey, d.id)}
                                        style={{
                                          padding: "2px 6px", borderRadius: 4,
                                          border: abDurum === d.id ? `2px solid ${d.color}` : `1px solid ${colors.border}`,
                                          background: abDurum === d.id ? d.color + "22" : "transparent",
                                          color: abDurum === d.id ? d.color : colors.textMuted,
                                          fontSize: 9, fontWeight: 600, cursor: "pointer",
                                        }}
                                      >
                                        {d.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // Summary counts
  const allKeys = getAllKonuKeys();
  const ozet = durumlar.map(d => ({
    ...d,
    count: allKeys.filter(k => (data.konuDurumlari[k] || "baslanmadi") === d.id).length,
  }));

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        {ozet.map(d => (
          <div key={d.id} style={{ ...baseStyles.statBox, flex: "1 1 120px" }}>
            <div style={{ ...baseStyles.statValue, fontSize: 24, color: d.color }}>{d.count}</div>
            <div style={baseStyles.statLabel}>{d.label}</div>
          </div>
        ))}
      </div>
      {renderBransGrubu("Temel Bilimler", temelBranslar, colors.temel)}
      {renderBransGrubu("Klinik Bilimler", klinikBranslar, colors.klinik)}
    </div>
  );
}

// --- Soru Cozumu ---
function SoruCozumu({ data, setData, colors, baseStyles }) {
  const [form, setForm] = useState({ bransId: tumBranslar[0].id, konuAdi: "", dogru: "", yanlis: "", bos: "", kaynak: "", tarih: new Date().toISOString().slice(0, 10) });

  const selectedBrans = tumBranslar.find(b => b.id === form.bransId);

  const ekle = () => {
    const dogru = parseInt(form.dogru) || 0;
    const yanlis = parseInt(form.yanlis) || 0;
    const bos = parseInt(form.bos) || 0;
    if (dogru + yanlis + bos === 0) return;
    const yeni = { id: Date.now(), bransId: form.bransId, konuAdi: form.konuAdi || "", dogru, yanlis, bos, kaynak: form.kaynak, tarih: form.tarih, net: hesaplaNet(dogru, yanlis) };
    setData(d => ({ ...d, soruCozumleri: [yeni, ...d.soruCozumleri] }));
    setForm(f => ({ ...f, dogru: "", yanlis: "", bos: "" }));
  };

  const sil = (id) => {
    setData(d => ({ ...d, soruCozumleri: d.soruCozumleri.filter(s => s.id !== id) }));
  };

  const son7 = useMemo(() => {
    const gunler = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString("tr-TR", { weekday: "short" });
      const gunSoru = data.soruCozumleri.filter(s => s.tarih === key);
      const toplam = gunSoru.reduce((s, c) => s + c.dogru + c.yanlis + (c.bos || 0), 0);
      gunler.push({ label, value: toplam });
    }
    return gunler;
  }, [data.soruCozumleri]);

  return (
    <div>
      {/* Form */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Soru Çözümü Ekle</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          <div>
            <label style={baseStyles.label}>Branş</label>
            <select value={form.bransId} onChange={e => setForm(f => ({ ...f, bransId: e.target.value, konuAdi: "" }))} style={baseStyles.select}>
              <optgroup label="Temel Tıp">
                {temelBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
              </optgroup>
              <optgroup label="Klinik Tıp">
                {klinikBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
              </optgroup>
            </select>
          </div>
          {selectedBrans && selectedBrans.konular && selectedBrans.konular.length > 0 && (
            <div>
              <label style={baseStyles.label}>Alt Konu</label>
              <select value={form.konuAdi} onChange={e => setForm(f => ({ ...f, konuAdi: e.target.value }))} style={baseStyles.select}>
                <option value="">Genel / Tümü</option>
                {selectedBrans.konular.map((k, i) => (
                  <option key={i} value={k.name}>{k.name}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label style={baseStyles.label}>Tarih</label>
            <input type="date" value={form.tarih} onChange={e => setForm(f => ({ ...f, tarih: e.target.value }))} style={baseStyles.input} />
          </div>
          <div>
            <label style={baseStyles.label}>Doğru</label>
            <input type="number" min={0} value={form.dogru} onChange={e => setForm(f => ({ ...f, dogru: e.target.value }))} style={baseStyles.input} placeholder="0" />
          </div>
          <div>
            <label style={baseStyles.label}>Yanlış</label>
            <input type="number" min={0} value={form.yanlis} onChange={e => setForm(f => ({ ...f, yanlis: e.target.value }))} style={baseStyles.input} placeholder="0" />
          </div>
          <div>
            <label style={baseStyles.label}>Boş</label>
            <input type="number" min={0} value={form.bos} onChange={e => setForm(f => ({ ...f, bos: e.target.value }))} style={baseStyles.input} placeholder="0" />
          </div>
          <div>
            <label style={baseStyles.label}>Kaynak</label>
            <input type="text" value={form.kaynak} onChange={e => setForm(f => ({ ...f, kaynak: e.target.value }))} style={baseStyles.input} placeholder="Tusdata, ÖSYM..." />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <span style={{ fontSize: 13, color: colors.textMuted }}>
            Net: <strong style={{ color: colors.success }}>{hesaplaNet(parseInt(form.dogru) || 0, parseInt(form.yanlis) || 0).toFixed(2)}</strong>
          </span>
          <button onClick={ekle} style={baseStyles.btn("primary")}>Ekle</button>
        </div>
      </div>

      {/* Son 7 gun grafigi */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Son 7 Gün Soru Çözümü</div>
        <MiniBarChart data={son7} barColor={colors.primary} colors={colors} />
      </div>

      {/* Kayitlar */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Soru Çözüm Kayıtları ({data.soruCozumleri.length})</div>
        {data.soruCozumleri.length === 0 ? (
          <div style={{ color: colors.textMuted, fontSize: 13, textAlign: "center", padding: 20 }}>Henüz soru çözümü eklenmedi</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={baseStyles.table}>
              <thead>
                <tr>
                  <th style={baseStyles.th}>Tarih</th>
                  <th style={baseStyles.th}>Branş</th>
                  <th style={baseStyles.th}>Konu</th>
                  <th style={baseStyles.th}>D</th>
                  <th style={baseStyles.th}>Y</th>
                  <th style={baseStyles.th}>B</th>
                  <th style={baseStyles.th}>Net</th>
                  <th style={baseStyles.th}>Kaynak</th>
                  <th style={baseStyles.th}></th>
                </tr>
              </thead>
              <tbody>
                {data.soruCozumleri.slice(0, 50).map(s => {
                  const b = tumBranslar.find(x => x.id === s.bransId);
                  return (
                    <tr key={s.id}>
                      <td style={baseStyles.td}>{formatDate(s.tarih)}</td>
                      <td style={baseStyles.td}>{b ? `${b.icon} ${b.name}` : s.bransId}</td>
                      <td style={{ ...baseStyles.td, color: colors.textMuted, fontSize: 12 }}>{s.konuAdi || "-"}</td>
                      <td style={{ ...baseStyles.td, color: colors.success }}>{s.dogru}</td>
                      <td style={{ ...baseStyles.td, color: colors.danger }}>{s.yanlis}</td>
                      <td style={{ ...baseStyles.td, color: colors.textMuted }}>{s.bos || 0}</td>
                      <td style={{ ...baseStyles.td, fontWeight: 700 }}>{s.net.toFixed(1)}</td>
                      <td style={{ ...baseStyles.td, color: colors.textMuted }}>{s.kaynak || "-"}</td>
                      <td style={baseStyles.td}><button onClick={() => sil(s.id)} style={baseStyles.deleteBtn}>×</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Denemeler ---
function Denemeler({ data, setData, colors, baseStyles }) {
  const [form, setForm] = useState({
    ad: "",
    tarih: new Date().toISOString().slice(0, 10),
    temelDogru: "",
    temelYanlis: "",
    klinikDogru: "",
    klinikYanlis: "",
  });

  const ekle = () => {
    const td = parseInt(form.temelDogru) || 0;
    const ty = parseInt(form.temelYanlis) || 0;
    const kd = parseInt(form.klinikDogru) || 0;
    const ky = parseInt(form.klinikYanlis) || 0;
    if (td + ty + kd + ky === 0) return;
    const temelNet = hesaplaNet(td, ty);
    const klinikNet = hesaplaNet(kd, ky);
    const toplamNet = temelNet + klinikNet;
    const yeni = {
      id: Date.now(),
      ad: form.ad || `Deneme ${data.denemeler.length + 1}`,
      tarih: form.tarih,
      temelDogru: td, temelYanlis: ty, temelNet,
      klinikDogru: kd, klinikYanlis: ky, klinikNet,
      toplamNet,
    };
    setData(d => ({ ...d, denemeler: [yeni, ...d.denemeler] }));
    setForm({ ad: "", tarih: new Date().toISOString().slice(0, 10), temelDogru: "", temelYanlis: "", klinikDogru: "", klinikYanlis: "" });
  };

  const sil = (id) => {
    setData(d => ({ ...d, denemeler: d.denemeler.filter(x => x.id !== id) }));
  };

  const sorted = [...data.denemeler].sort((a, b) => new Date(a.tarih) - new Date(b.tarih));
  const lineData = sorted.map(d => ({
    value: d.toplamNet,
    label: new Date(d.tarih).toLocaleDateString("tr-TR", { day: "numeric", month: "short" }),
  }));

  const enIyi = sorted.length > 0 ? Math.max(...sorted.map(d => d.toplamNet)) : 0;
  const sonNet = sorted.length > 0 ? sorted[sorted.length - 1].toplamNet : 0;
  const ort = sorted.length > 0 ? (sorted.reduce((s, d) => s + d.toplamNet, 0) / sorted.length).toFixed(1) : 0;

  return (
    <div>
      {/* Form */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Deneme Sonucu Ekle</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          <div>
            <label style={baseStyles.label}>Deneme Adı</label>
            <input type="text" value={form.ad} onChange={e => setForm(f => ({ ...f, ad: e.target.value }))} style={baseStyles.input} placeholder="Deneme 1" />
          </div>
          <div>
            <label style={baseStyles.label}>Tarih</label>
            <input type="date" value={form.tarih} onChange={e => setForm(f => ({ ...f, tarih: e.target.value }))} style={baseStyles.input} />
          </div>
          <div>
            <label style={baseStyles.label}>Temel Doğru</label>
            <input type="number" min={0} max={120} value={form.temelDogru} onChange={e => setForm(f => ({ ...f, temelDogru: e.target.value }))} style={baseStyles.input} placeholder="0" />
          </div>
          <div>
            <label style={baseStyles.label}>Temel Yanlış</label>
            <input type="number" min={0} max={120} value={form.temelYanlis} onChange={e => setForm(f => ({ ...f, temelYanlis: e.target.value }))} style={baseStyles.input} placeholder="0" />
          </div>
          <div>
            <label style={baseStyles.label}>Klinik Doğru</label>
            <input type="number" min={0} max={120} value={form.klinikDogru} onChange={e => setForm(f => ({ ...f, klinikDogru: e.target.value }))} style={baseStyles.input} placeholder="0" />
          </div>
          <div>
            <label style={baseStyles.label}>Klinik Yanlış</label>
            <input type="number" min={0} max={120} value={form.klinikYanlis} onChange={e => setForm(f => ({ ...f, klinikYanlis: e.target.value }))} style={baseStyles.input} placeholder="0" />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <span style={{ fontSize: 13, color: colors.textMuted }}>
            Temel: <strong style={{ color: colors.temel }}>{hesaplaNet(parseInt(form.temelDogru) || 0, parseInt(form.temelYanlis) || 0).toFixed(1)}</strong> |
            Klinik: <strong style={{ color: colors.klinik }}>{hesaplaNet(parseInt(form.klinikDogru) || 0, parseInt(form.klinikYanlis) || 0).toFixed(1)}</strong> |
            Toplam: <strong style={{ color: colors.success }}>{(hesaplaNet(parseInt(form.temelDogru) || 0, parseInt(form.temelYanlis) || 0) + hesaplaNet(parseInt(form.klinikDogru) || 0, parseInt(form.klinikYanlis) || 0)).toFixed(1)}</strong>
          </span>
          <button onClick={ekle} style={baseStyles.btn("primary")}>Ekle</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 16 }}>
        <div style={baseStyles.statBox}>
          <div style={{ ...baseStyles.statValue, fontSize: 24, color: colors.success }}>{enIyi.toFixed(1)}</div>
          <div style={baseStyles.statLabel}>En İyi Net</div>
        </div>
        <div style={baseStyles.statBox}>
          <div style={{ ...baseStyles.statValue, fontSize: 24, color: colors.primary }}>{sonNet.toFixed(1)}</div>
          <div style={baseStyles.statLabel}>Son Net</div>
        </div>
        <div style={baseStyles.statBox}>
          <div style={{ ...baseStyles.statValue, fontSize: 24, color: colors.warning }}>{ort}</div>
          <div style={baseStyles.statLabel}>Ortalama</div>
        </div>
        <div style={baseStyles.statBox}>
          <div style={{ ...baseStyles.statValue, fontSize: 24, color: "#43a047" }}>{data.denemeler.length}</div>
          <div style={baseStyles.statLabel}>Deneme</div>
        </div>
      </div>

      {/* Chart */}
      {lineData.length >= 2 && (
        <div style={baseStyles.card}>
          <div style={baseStyles.cardTitle}>Net İlerleme Grafiği</div>
          <MiniLineChart data={lineData} color={colors.success} colors={colors} />
        </div>
      )}

      {/* Tablo */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Deneme Sonuçları</div>
        {data.denemeler.length === 0 ? (
          <div style={{ color: colors.textMuted, fontSize: 13, textAlign: "center", padding: 20 }}>Henüz deneme eklenmedi</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={baseStyles.table}>
              <thead>
                <tr>
                  <th style={baseStyles.th}>Tarih</th>
                  <th style={baseStyles.th}>Ad</th>
                  <th style={baseStyles.th}>Temel Net</th>
                  <th style={baseStyles.th}>Klinik Net</th>
                  <th style={baseStyles.th}>Toplam Net</th>
                  <th style={baseStyles.th}></th>
                </tr>
              </thead>
              <tbody>
                {data.denemeler.map(d => (
                  <tr key={d.id}>
                    <td style={baseStyles.td}>{formatDate(d.tarih)}</td>
                    <td style={baseStyles.td}>{d.ad}</td>
                    <td style={{ ...baseStyles.td, color: colors.temel, fontWeight: 600 }}>{d.temelNet.toFixed(1)}</td>
                    <td style={{ ...baseStyles.td, color: colors.klinik, fontWeight: 600 }}>{d.klinikNet.toFixed(1)}</td>
                    <td style={{ ...baseStyles.td, color: colors.success, fontWeight: 700, fontSize: 15 }}>{d.toplamNet.toFixed(1)}</td>
                    <td style={baseStyles.td}><button onClick={() => sil(d.id)} style={baseStyles.deleteBtn}>×</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Calisma Plani ---
function CalismePlani({ data, setData, colors, baseStyles }) {
  const [form, setForm] = useState({ gun: haftaGunleri[0], bransId: tumBranslar[0].id, sure: 60, not: "" });

  const ekle = () => {
    const key = form.gun;
    const yeni = { id: Date.now(), bransId: form.bransId, sure: parseInt(form.sure) || 60, not: form.not };
    setData(d => ({
      ...d,
      haftalikPlan: {
        ...d.haftalikPlan,
        [key]: [...(d.haftalikPlan[key] || []), yeni],
      },
    }));
    setForm(f => ({ ...f, not: "" }));
  };

  const sil = (gun, id) => {
    setData(d => ({
      ...d,
      haftalikPlan: {
        ...d.haftalikPlan,
        [gun]: (d.haftalikPlan[gun] || []).filter(x => x.id !== id),
      },
    }));
  };

  const gunToplamSure = (gun) => (data.haftalikPlan[gun] || []).reduce((s, x) => s + x.sure, 0);

  return (
    <div>
      {/* Ekleme Formu */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Haftalık Plan Ekle</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          <div>
            <label style={baseStyles.label}>Gün</label>
            <select value={form.gun} onChange={e => setForm(f => ({ ...f, gun: e.target.value }))} style={baseStyles.select}>
              {haftaGunleri.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label style={baseStyles.label}>Branş</label>
            <select value={form.bransId} onChange={e => setForm(f => ({ ...f, bransId: e.target.value }))} style={baseStyles.select}>
              <optgroup label="Temel Tıp">
                {temelBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
              </optgroup>
              <optgroup label="Klinik Tıp">
                {klinikBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
              </optgroup>
            </select>
          </div>
          <div>
            <label style={baseStyles.label}>Süre (dk)</label>
            <input type="number" min={15} step={15} value={form.sure} onChange={e => setForm(f => ({ ...f, sure: e.target.value }))} style={baseStyles.input} />
          </div>
          <div>
            <label style={baseStyles.label}>Not</label>
            <input type="text" value={form.not} onChange={e => setForm(f => ({ ...f, not: e.target.value }))} style={baseStyles.input} placeholder="Kaynak, konu..." />
          </div>
        </div>
        <div style={{ marginTop: 12, textAlign: "right" }}>
          <button onClick={ekle} style={baseStyles.btn("primary")}>Ekle</button>
        </div>
      </div>

      {/* Haftalik Takvim */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
        {haftaGunleri.map(gun => {
          const items = data.haftalikPlan[gun] || [];
          const topSure = gunToplamSure(gun);
          return (
            <div key={gun} style={{ ...baseStyles.card, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{gun}</div>
                <span style={baseStyles.badge(topSure > 0 ? colors.primary : colors.textMuted)}>
                  {topSure > 0 ? `${(topSure / 60).toFixed(1)} sa` : "Boş"}
                </span>
              </div>
              {items.length === 0 ? (
                <div style={{ color: colors.textMuted, fontSize: 12, textAlign: "center", padding: 8 }}>Plan eklenmedi</div>
              ) : items.map(item => {
                const b = tumBranslar.find(x => x.id === item.bransId);
                return (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", marginBottom: 4, background: colors.inputBg, borderRadius: 6 }}>
                    <span style={{ fontSize: 14 }}>{b?.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{b?.name}</div>
                      <div style={{ fontSize: 10, color: colors.textMuted }}>{item.sure} dk {item.not ? `· ${item.not}` : ""}</div>
                    </div>
                    <button onClick={() => sil(gun, item.id)} style={baseStyles.deleteBtn}>×</button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Calisma Kaydi ---
function CalismaKaydi({ data, setData, colors, baseStyles }) {
  const [form, setForm] = useState({ bransId: tumBranslar[0].id, sure: 60, tarih: new Date().toISOString().slice(0, 10), not: "" });

  const ekle = () => {
    const sure = parseInt(form.sure) || 0;
    if (sure <= 0) return;
    const yeni = { id: Date.now(), bransId: form.bransId, sure, tarih: form.tarih, not: form.not };
    setData(d => ({ ...d, calismaKayitlari: [yeni, ...d.calismaKayitlari] }));
    setForm(f => ({ ...f, not: "" }));
  };

  const sil = (id) => {
    setData(d => ({ ...d, calismaKayitlari: d.calismaKayitlari.filter(x => x.id !== id) }));
  };

  const son7 = useMemo(() => {
    const gunler = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString("tr-TR", { weekday: "short" });
      const topSure = data.calismaKayitlari.filter(c => c.tarih === key).reduce((s, c) => s + c.sure, 0);
      gunler.push({ label, value: topSure / 60, color: topSure >= 240 ? colors.success : topSure >= 120 ? colors.warning : colors.danger });
    }
    return gunler;
  }, [data.calismaKayitlari, colors]);

  return (
    <div>
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Çalışma Kaydı Ekle</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          <div>
            <label style={baseStyles.label}>Branş</label>
            <select value={form.bransId} onChange={e => setForm(f => ({ ...f, bransId: e.target.value }))} style={baseStyles.select}>
              <optgroup label="Temel Tıp">
                {temelBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
              </optgroup>
              <optgroup label="Klinik Tıp">
                {klinikBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
              </optgroup>
            </select>
          </div>
          <div>
            <label style={baseStyles.label}>Tarih</label>
            <input type="date" value={form.tarih} onChange={e => setForm(f => ({ ...f, tarih: e.target.value }))} style={baseStyles.input} />
          </div>
          <div>
            <label style={baseStyles.label}>Süre (dk)</label>
            <input type="number" min={5} step={5} value={form.sure} onChange={e => setForm(f => ({ ...f, sure: e.target.value }))} style={baseStyles.input} />
          </div>
          <div>
            <label style={baseStyles.label}>Not</label>
            <input type="text" value={form.not} onChange={e => setForm(f => ({ ...f, not: e.target.value }))} style={baseStyles.input} placeholder="Konu detayı..." />
          </div>
        </div>
        <div style={{ marginTop: 12, textAlign: "right" }}>
          <button onClick={ekle} style={baseStyles.btn("primary")}>Ekle</button>
        </div>
      </div>

      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Son 7 Gün Çalışma (saat)</div>
        <MiniBarChart data={son7} height={100} colors={colors} />
      </div>

      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Çalışma Kayıtları ({data.calismaKayitlari.length})</div>
        {data.calismaKayitlari.length === 0 ? (
          <div style={{ color: colors.textMuted, fontSize: 13, textAlign: "center", padding: 20 }}>Henüz kayıt yok</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={baseStyles.table}>
              <thead>
                <tr>
                  <th style={baseStyles.th}>Tarih</th>
                  <th style={baseStyles.th}>Branş</th>
                  <th style={baseStyles.th}>Süre</th>
                  <th style={baseStyles.th}>Not</th>
                  <th style={baseStyles.th}></th>
                </tr>
              </thead>
              <tbody>
                {data.calismaKayitlari.slice(0, 50).map(c => {
                  const b = tumBranslar.find(x => x.id === c.bransId);
                  return (
                    <tr key={c.id}>
                      <td style={baseStyles.td}>{formatDate(c.tarih)}</td>
                      <td style={baseStyles.td}>{b ? `${b.icon} ${b.name}` : c.bransId}</td>
                      <td style={baseStyles.td}>{c.sure} dk</td>
                      <td style={{ ...baseStyles.td, color: colors.textMuted }}>{c.not || "-"}</td>
                      <td style={baseStyles.td}><button onClick={() => sil(c.id)} style={baseStyles.deleteBtn}>×</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Pomodoro Zamanlayici ---
function PomodoroTimer({ data, setData, colors, baseStyles }) {
  const WORK_TIME = 25 * 60;
  const SHORT_BREAK = 5 * 60;
  const LONG_BREAK = 15 * 60;

  const [secondsLeft, setSecondsLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("work"); // work, shortBreak, longBreak
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [selectedBrans, setSelectedBrans] = useState(tumBranslar[0].id);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            // Play beep
            try { new Audio(BEEP_SOUND).play(); } catch (e) { /* ignore */ }
            // Session ended
            if (sessionType === "work") {
              const newCount = pomodoroCount + 1;
              setPomodoroCount(newCount);
              // Add to calisma kaydi
              const bugun = new Date().toISOString().slice(0, 10);
              const yeniKayit = { id: Date.now(), bransId: selectedBrans, sure: 25, tarih: bugun, not: "Pomodoro" };
              setData(d => ({
                ...d,
                calismaKayitlari: [yeniKayit, ...d.calismaKayitlari],
                pomodoroSayisi: (d.pomodoroSayisi || 0) + 1,
              }));
              // Determine next break
              if (newCount % 4 === 0) {
                setSessionType("longBreak");
                setIsRunning(false);
                return LONG_BREAK;
              } else {
                setSessionType("shortBreak");
                setIsRunning(false);
                return SHORT_BREAK;
              }
            } else {
              // Break ended, start work
              setSessionType("work");
              setIsRunning(false);
              return WORK_TIME;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, sessionType, pomodoroCount, selectedBrans, setData]);

  const toggleRunning = () => setIsRunning(!isRunning);

  const reset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setSessionType("work");
    setSecondsLeft(WORK_TIME);
    setPomodoroCount(0);
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  const sessionLabel = sessionType === "work" ? "Çalışma" : sessionType === "shortBreak" ? "Kısa Mola" : "Uzun Mola";
  const sessionColor = sessionType === "work" ? colors.primary : sessionType === "shortBreak" ? colors.success : colors.warning;
  const totalTime = sessionType === "work" ? WORK_TIME : sessionType === "shortBreak" ? SHORT_BREAK : LONG_BREAK;
  const progress = ((totalTime - secondsLeft) / totalTime) * 100;

  return (
    <div>
      <div style={{ ...baseStyles.card, textAlign: "center", padding: 32 }}>
        <div style={{ fontSize: 14, color: colors.textMuted, marginBottom: 8 }}>{sessionLabel}</div>
        <div style={{ fontSize: 72, fontWeight: 900, color: sessionColor, fontVariantNumeric: "tabular-nums" }}>
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
        <div style={{ height: 8, borderRadius: 4, background: colors.border, margin: "16px auto", maxWidth: 300, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 4, width: `${progress}%`, background: sessionColor, transition: "width 1s linear" }} />
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: colors.textMuted, marginBottom: 16 }}>
          {pomodoroCount % 4}/4 pomodoro (Toplam: {pomodoroCount})
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 16 }}>
          <button onClick={toggleRunning} style={baseStyles.btn(isRunning ? "danger" : "primary")}>
            {isRunning ? "Duraklat" : "Başlat"}
          </button>
          <button onClick={reset} style={baseStyles.btn("ghost")}>Sıfırla</button>
        </div>
        <div style={{ maxWidth: 300, margin: "0 auto" }}>
          <label style={baseStyles.label}>Çalışılan Branş</label>
          <select value={selectedBrans} onChange={e => setSelectedBrans(e.target.value)} style={baseStyles.select}>
            <optgroup label="Temel Tıp">
              {temelBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
            </optgroup>
            <optgroup label="Klinik Tıp">
              {klinikBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
            </optgroup>
          </select>
        </div>
      </div>
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Pomodoro İstatistikleri</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12 }}>
          <div style={baseStyles.statBox}>
            <div style={{ ...baseStyles.statValue, fontSize: 24, color: colors.primary }}>{data.pomodoroSayisi || 0}</div>
            <div style={baseStyles.statLabel}>Toplam Pomodoro</div>
          </div>
          <div style={baseStyles.statBox}>
            <div style={{ ...baseStyles.statValue, fontSize: 24, color: colors.success }}>{((data.pomodoroSayisi || 0) * 25 / 60).toFixed(1)} sa</div>
            <div style={baseStyles.statLabel}>Toplam Süre</div>
          </div>
          <div style={baseStyles.statBox}>
            <div style={{ ...baseStyles.statValue, fontSize: 24, color: colors.warning }}>{pomodoroCount}</div>
            <div style={baseStyles.statLabel}>Bu Oturum</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Not Defteri ---
function NotDefteri({ data, setData, colors, baseStyles }) {
  const [selectedBrans, setSelectedBrans] = useState("");
  const [selectedKonu, setSelectedKonu] = useState("");
  const [selectedAltBaslik, setSelectedAltBaslik] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingKey, setEditingKey] = useState(null);
  const [editText, setEditText] = useState("");
  const [treeExpandedBrans, setTreeExpandedBrans] = useState({});
  const [treeExpandedKonu, setTreeExpandedKonu] = useState({});

  const brans = tumBranslar.find(b => b.id === selectedBrans);
  const selectedKonuObj = brans && brans.konular ? brans.konular.find(k => k.name === selectedKonu) : null;
  const notlar = data.notlar || {};

  const getNoteKey = () => {
    if (!selectedBrans) return null;
    if (selectedAltBaslik && selectedKonu) return `${selectedBrans}_${selectedKonu}_${selectedAltBaslik}`;
    if (selectedKonu) return `${selectedBrans}_${selectedKonu}`;
    return selectedBrans;
  };

  const saveNote = () => {
    const key = editingKey;
    if (!key) return;
    setData(d => ({
      ...d,
      notlar: { ...d.notlar, [key]: { text: editText, tarih: new Date().toISOString() } },
    }));
    setEditingKey(null);
    setEditText("");
  };

  const deleteNote = (key) => {
    const updated = { ...notlar };
    delete updated[key];
    setData(d => ({ ...d, notlar: updated }));
  };

  const startEdit = (key) => {
    const targetKey = key || getNoteKey();
    if (!targetKey) return;
    const existing = notlar[targetKey];
    setEditingKey(targetKey);
    setEditText(existing ? existing.text : "");
  };

  const allNoteKeys = Object.keys(notlar).filter(k => {
    if (!searchTerm) return true;
    const note = notlar[k];
    return k.toLowerCase().includes(searchTerm.toLowerCase()) || (note.text && note.text.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const getNoteLabel = (key) => {
    const parts = key.split("_");
    const b = tumBranslar.find(x => x.id === parts[0]);
    const bName = b ? `${b.icon} ${b.name}` : parts[0];
    if (parts.length === 3) {
      return `${bName} > ${parts[1]} > ${parts[2]}`;
    }
    if (parts.length === 2) {
      return `${bName} > ${parts[1]}`;
    }
    return bName;
  };

  const getNoteLevel = (key) => {
    const parts = key.split("_");
    if (parts.length === 3) return "altBaslik";
    if (parts.length === 2) return "konu";
    return "brans";
  };

  const levelBadge = (level) => {
    const config = level === "brans" ? { label: "Branş", color: colors.primary }
      : level === "konu" ? { label: "Alt Konu", color: colors.klinik }
      : { label: "Alt Başlık", color: colors.temel };
    return (
      <span style={{ ...baseStyles.badge(config.color), fontSize: 9, padding: "1px 6px" }}>{config.label}</span>
    );
  };

  // Count notes per brans for tree
  const noteCountForKey = (prefix) => Object.keys(notlar).filter(k => k === prefix || k.startsWith(prefix + "_")).length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16, alignItems: "start" }}>
      {/* Left: Tree Navigation */}
      <div style={baseStyles.card}>
        <div style={{ ...baseStyles.cardTitle, fontSize: 14 }}>Branş Ağacı</div>
        <div style={{ maxHeight: 500, overflowY: "auto" }}>
          {[{ label: "Temel Bilimler", list: temelBranslar, color: colors.temel }, { label: "Klinik Bilimler", list: klinikBranslar, color: colors.klinik }].map(group => (
            <div key={group.label} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: group.color, marginBottom: 4, textTransform: "uppercase" }}>{group.label}</div>
              {group.list.map(b => {
                const bNoteCount = noteCountForKey(b.id);
                const isBransExpanded = treeExpandedBrans[b.id];
                const hasKonular = b.konular && b.konular.length > 0;
                return (
                  <div key={b.id}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 6px", borderRadius: 6, cursor: "pointer", fontSize: 12, background: selectedBrans === b.id && !selectedKonu ? colors.primary + "22" : "transparent" }}
                      onClick={() => { setSelectedBrans(b.id); setSelectedKonu(""); setSelectedAltBaslik(""); if (hasKonular) setTreeExpandedBrans(p => ({ ...p, [b.id]: !p[b.id] })); }}
                    >
                      {hasKonular && <span style={{ fontSize: 9, color: colors.textMuted, width: 10, transition: "transform 0.2s", transform: isBransExpanded ? "rotate(90deg)" : "rotate(0deg)" }}>&#9654;</span>}
                      {!hasKonular && <span style={{ width: 10 }} />}
                      <span>{b.icon}</span>
                      <span style={{ flex: 1, fontWeight: 500 }}>{b.name}</span>
                      {bNoteCount > 0 && <span style={{ fontSize: 9, color: colors.primary, fontWeight: 700, background: colors.primary + "22", borderRadius: 8, padding: "1px 5px" }}>{bNoteCount}</span>}
                    </div>
                    {hasKonular && isBransExpanded && b.konular.map((k, ki) => {
                      const hasAB = k.altBasliklar && k.altBasliklar.length > 0;
                      const kKey = `${b.id}_${k.name}`;
                      const isKonuExp = treeExpandedKonu[kKey];
                      const kNoteCount = noteCountForKey(kKey);
                      return (
                        <div key={ki}>
                          <div
                            style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 6px 3px 26px", borderRadius: 5, cursor: "pointer", fontSize: 11, background: selectedBrans === b.id && selectedKonu === k.name && !selectedAltBaslik ? colors.klinik + "22" : "transparent" }}
                            onClick={() => { setSelectedBrans(b.id); setSelectedKonu(k.name); setSelectedAltBaslik(""); if (hasAB) setTreeExpandedKonu(p => ({ ...p, [kKey]: !p[kKey] })); }}
                          >
                            {hasAB && <span style={{ fontSize: 8, color: colors.textMuted, width: 8, transition: "transform 0.2s", transform: isKonuExp ? "rotate(90deg)" : "rotate(0deg)" }}>&#9654;</span>}
                            {!hasAB && <span style={{ width: 8 }} />}
                            <span style={{ flex: 1, color: colors.textMuted }}>{k.name}</span>
                            {kNoteCount > 0 && <span style={{ fontSize: 8, color: colors.klinik, fontWeight: 700, background: colors.klinik + "22", borderRadius: 6, padding: "0px 4px" }}>{kNoteCount}</span>}
                          </div>
                          {hasAB && isKonuExp && k.altBasliklar.map((ab, abi) => {
                            const abKey = `${b.id}_${k.name}_${ab}`;
                            const abHasNote = !!notlar[abKey];
                            return (
                              <div
                                key={abi}
                                style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 6px 2px 44px", borderRadius: 4, cursor: "pointer", fontSize: 10, background: selectedBrans === b.id && selectedKonu === k.name && selectedAltBaslik === ab ? colors.temel + "22" : "transparent" }}
                                onClick={() => { setSelectedBrans(b.id); setSelectedKonu(k.name); setSelectedAltBaslik(ab); }}
                              >
                                <span style={{ flex: 1, color: colors.textMuted }}>{ab}</span>
                                {abHasNote && <span style={{ width: 5, height: 5, borderRadius: "50%", background: colors.temel }} />}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Note Editor and List */}
      <div>
        <div style={baseStyles.card}>
          <div style={baseStyles.cardTitle}>Not Ekle / Düzenle</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={baseStyles.label}>Branş</label>
              <select value={selectedBrans} onChange={e => { setSelectedBrans(e.target.value); setSelectedKonu(""); setSelectedAltBaslik(""); }} style={baseStyles.select}>
                <option value="">Seçiniz...</option>
                <optgroup label="Temel Bilimler">
                  {temelBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
                </optgroup>
                <optgroup label="Klinik Bilimler">
                  {klinikBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
                </optgroup>
              </select>
            </div>
            {brans && brans.konular && brans.konular.length > 0 && (
              <div>
                <label style={baseStyles.label}>Alt Konu</label>
                <select value={selectedKonu} onChange={e => { setSelectedKonu(e.target.value); setSelectedAltBaslik(""); }} style={baseStyles.select}>
                  <option value="">Genel Not</option>
                  {brans.konular.map((k, i) => <option key={i} value={k.name}>{k.name}</option>)}
                </select>
              </div>
            )}
            {selectedKonuObj && selectedKonuObj.altBasliklar && selectedKonuObj.altBasliklar.length > 0 && (
              <div>
                <label style={baseStyles.label}>Alt Başlık</label>
                <select value={selectedAltBaslik} onChange={e => setSelectedAltBaslik(e.target.value)} style={baseStyles.select}>
                  <option value="">Konu Genel</option>
                  {selectedKonuObj.altBasliklar.map((ab, i) => <option key={i} value={ab}>{ab}</option>)}
                </select>
              </div>
            )}
          </div>
          {selectedBrans && (
            <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 8 }}>
              Hedef: <strong style={{ color: colors.text }}>{getNoteLabel(getNoteKey() || "")}</strong>
            </div>
          )}
          {selectedBrans && !editingKey && (
            <button onClick={() => startEdit()} style={baseStyles.btn("primary")}>
              {notlar[getNoteKey()] ? "Notu Düzenle" : "Yeni Not Yaz"}
            </button>
          )}
          {editingKey && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 6 }}>
                Düzenlenen: <strong>{getNoteLabel(editingKey)}</strong> {levelBadge(getNoteLevel(editingKey))}
              </div>
              <textarea
                value={editText}
                onChange={e => setEditText(e.target.value)}
                style={{ ...baseStyles.input, minHeight: 200, resize: "vertical", fontFamily: "inherit" }}
                placeholder="Notlarınızı buraya yazın..."
              />
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button onClick={saveNote} style={baseStyles.btn("success")}>Kaydet</button>
                <button onClick={() => setEditingKey(null)} style={baseStyles.btn("ghost")}>İptal</button>
              </div>
            </div>
          )}
        </div>

        <div style={baseStyles.card}>
          <div style={baseStyles.cardTitle}>Tüm Notlar ({allNoteKeys.length})</div>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ ...baseStyles.input, marginBottom: 12 }}
            placeholder="Notlarda ara..."
          />
          {allNoteKeys.length === 0 ? (
            <div style={{ color: colors.textMuted, fontSize: 13, textAlign: "center", padding: 20 }}>Henüz not eklenmedi</div>
          ) : allNoteKeys.map(key => {
            const note = notlar[key];
            const level = getNoteLevel(key);
            return (
              <div key={key} style={{ padding: 12, marginBottom: 8, background: colors.inputBg, borderRadius: 8, border: `1px solid ${colors.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{getNoteLabel(key)}</div>
                    {levelBadge(level)}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: colors.textMuted }}>{note.tarih ? formatDate(note.tarih) : ""}</span>
                    <button onClick={() => { setEditingKey(key); setEditText(note.text); }} style={{ ...baseStyles.deleteBtn, color: colors.primary, fontSize: 12 }}>Düzenle</button>
                    <button onClick={() => deleteNote(key)} style={baseStyles.deleteBtn}>×</button>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: colors.text, whiteSpace: "pre-wrap", maxHeight: 150, overflow: "auto" }}>{note.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- Flashcard / Bilgi Kartlari ---
function FlashcardTab({ data, setData, colors, baseStyles }) {
  const [form, setForm] = useState({ bransId: tumBranslar[0].id, front: "", back: "" });
  const [studyMode, setStudyMode] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filterBrans, setFilterBrans] = useState("");

  const flashcards = data.flashcards || [];
  const filteredCards = filterBrans ? flashcards.filter(c => c.bransId === filterBrans) : flashcards;
  const studyCards = filteredCards.filter(c => !c.biliyor);

  const addCard = () => {
    if (!form.front.trim() || !form.back.trim()) return;
    const yeni = { id: Date.now(), bransId: form.bransId, front: form.front, back: form.back, biliyor: false, tarih: new Date().toISOString().slice(0, 10) };
    setData(d => ({ ...d, flashcards: [yeni, ...(d.flashcards || [])] }));
    setForm(f => ({ ...f, front: "", back: "" }));
  };

  const deleteCard = (id) => {
    setData(d => ({ ...d, flashcards: (d.flashcards || []).filter(c => c.id !== id) }));
  };

  const markCard = (id, biliyor) => {
    setData(d => ({
      ...d,
      flashcards: (d.flashcards || []).map(c => c.id === id ? { ...c, biliyor } : c),
    }));
    setFlipped(false);
    setCurrentIdx(prev => Math.min(prev, studyCards.length - 2));
  };

  const totalCards = flashcards.length;
  const knownCards = flashcards.filter(c => c.biliyor).length;
  const unknownCards = totalCards - knownCards;

  return (
    <div>
      {!studyMode ? (
        <>
          <div style={baseStyles.card}>
            <div style={baseStyles.cardTitle}>Yeni Kart Ekle</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              <div>
                <label style={baseStyles.label}>Branş</label>
                <select value={form.bransId} onChange={e => setForm(f => ({ ...f, bransId: e.target.value }))} style={baseStyles.select}>
                  <optgroup label="Temel Tıp">
                    {temelBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
                  </optgroup>
                  <optgroup label="Klinik Tıp">
                    {klinikBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
                  </optgroup>
                </select>
              </div>
              <div>
                <label style={baseStyles.label}>Ön Yüz (Soru)</label>
                <textarea value={form.front} onChange={e => setForm(f => ({ ...f, front: e.target.value }))} style={{ ...baseStyles.input, minHeight: 60, resize: "vertical" }} placeholder="Soru..." />
              </div>
              <div>
                <label style={baseStyles.label}>Arka Yüz (Cevap)</label>
                <textarea value={form.back} onChange={e => setForm(f => ({ ...f, back: e.target.value }))} style={{ ...baseStyles.input, minHeight: 60, resize: "vertical" }} placeholder="Cevap..." />
              </div>
            </div>
            <div style={{ marginTop: 12, textAlign: "right" }}>
              <button onClick={addCard} style={baseStyles.btn("primary")}>Kart Ekle</button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 16 }}>
            <div style={baseStyles.statBox}>
              <div style={{ ...baseStyles.statValue, fontSize: 24, color: colors.primary }}>{totalCards}</div>
              <div style={baseStyles.statLabel}>Toplam Kart</div>
            </div>
            <div style={baseStyles.statBox}>
              <div style={{ ...baseStyles.statValue, fontSize: 24, color: colors.success }}>{knownCards}</div>
              <div style={baseStyles.statLabel}>Biliyorum</div>
            </div>
            <div style={baseStyles.statBox}>
              <div style={{ ...baseStyles.statValue, fontSize: 24, color: colors.danger }}>{unknownCards}</div>
              <div style={baseStyles.statLabel}>Tekrar Et</div>
            </div>
          </div>

          {studyCards.length > 0 && (
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <button onClick={() => { setStudyMode(true); setCurrentIdx(0); setFlipped(false); }} style={baseStyles.btn("success")}>
                Çalışmaya Başla ({studyCards.length} kart)
              </button>
            </div>
          )}

          {/* Filter and list */}
          <div style={baseStyles.card}>
            <div style={baseStyles.cardTitle}>Tüm Kartlar</div>
            <select value={filterBrans} onChange={e => setFilterBrans(e.target.value)} style={{ ...baseStyles.select, marginBottom: 12, maxWidth: 300 }}>
              <option value="">Tüm Branşlar</option>
              {tumBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
            </select>
            {filteredCards.length === 0 ? (
              <div style={{ color: colors.textMuted, fontSize: 13, textAlign: "center", padding: 20 }}>Henüz kart eklenmedi</div>
            ) : filteredCards.map(c => {
              const b = tumBranslar.find(x => x.id === c.bransId);
              return (
                <div key={c.id} style={{ padding: 12, marginBottom: 8, background: colors.inputBg, borderRadius: 8, border: `1px solid ${colors.border}`, display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 4 }}>{b ? `${b.icon} ${b.name}` : ""} {c.biliyor ? "- Biliyorum" : "- Tekrar Et"}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{c.front}</div>
                    <div style={{ fontSize: 12, color: colors.textMuted }}>{c.back}</div>
                  </div>
                  <button onClick={() => deleteCard(c.id)} style={baseStyles.deleteBtn}>×</button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div style={{ ...baseStyles.card, textAlign: "center", padding: 32 }}>
          {studyCards.length === 0 || currentIdx >= studyCards.length ? (
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: colors.success, marginBottom: 16 }}>Tebrikler! Tüm kartları tamamladın!</div>
              <button onClick={() => setStudyMode(false)} style={baseStyles.btn("primary")}>Geri Dön</button>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: 8 }}>Kart {currentIdx + 1} / {studyCards.length}</div>
              <div
                onClick={() => setFlipped(!flipped)}
                style={{
                  padding: 32, borderRadius: 16, minHeight: 150, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontSize: 18, fontWeight: 600,
                  background: flipped ? colors.success + "15" : colors.primary + "15",
                  border: `2px solid ${flipped ? colors.success : colors.primary}`,
                  transition: "all 0.3s",
                }}
              >
                {flipped ? studyCards[currentIdx].back : studyCards[currentIdx].front}
              </div>
              <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 8 }}>Çevirmek için kartına tıkla</div>
              {flipped && (
                <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
                  <button onClick={() => markCard(studyCards[currentIdx].id, true)} style={baseStyles.btn("success")}>Biliyorum</button>
                  <button onClick={() => { setFlipped(false); setCurrentIdx(prev => Math.min(prev + 1, studyCards.length - 1)); }} style={baseStyles.btn("danger")}>Tekrar Et</button>
                </div>
              )}
              <div style={{ marginTop: 16 }}>
                <button onClick={() => setStudyMode(false)} style={baseStyles.btn("ghost")}>Çalışmayı Bitir</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// --- Hatali Sorular Defteri ---
function HataliSorular({ data, setData, colors, baseStyles }) {
  const [form, setForm] = useState({ bransId: tumBranslar[0].id, konuAdi: "", kaynak: "", not: "", foto: null });
  const [expandedId, setExpandedId] = useState(null);
  const fileInputRef = useRef(null);

  const selectedBrans = tumBranslar.find(b => b.id === form.bransId);

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const compressed = await compressImage(file);
    setForm(f => ({ ...f, foto: compressed }));
  };

  const ekle = () => {
    if (!form.not.trim() && !form.kaynak.trim()) return;
    const yeni = {
      id: Date.now(),
      bransId: form.bransId,
      konuAdi: form.konuAdi || "",
      kaynak: form.kaynak,
      not: form.not,
      foto: form.foto,
      tarih: new Date().toISOString().slice(0, 10),
    };
    setData(d => ({ ...d, hataliSorular: [yeni, ...(d.hataliSorular || [])] }));
    setForm(f => ({ ...f, konuAdi: "", kaynak: "", not: "", foto: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const sil = (id) => {
    setData(d => ({ ...d, hataliSorular: (d.hataliSorular || []).filter(x => x.id !== id) }));
  };

  const hataliSorular = data.hataliSorular || [];

  return (
    <div>
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Hatalı Soru Ekle</div>
        <div style={{ padding: "8px 12px", marginBottom: 12, borderRadius: 8, background: colors.warning + "15", border: `1px solid ${colors.warning}33`, fontSize: 12, color: colors.warning }}>
          Not: Fotoğraflar localStorage'da saklanır (~5MB limit). Görüntüler otomatik sıkıştırılır.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          <div>
            <label style={baseStyles.label}>Branş</label>
            <select value={form.bransId} onChange={e => setForm(f => ({ ...f, bransId: e.target.value, konuAdi: "" }))} style={baseStyles.select}>
              <optgroup label="Temel Tıp">
                {temelBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
              </optgroup>
              <optgroup label="Klinik Tıp">
                {klinikBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
              </optgroup>
            </select>
          </div>
          {selectedBrans && selectedBrans.konular && selectedBrans.konular.length > 0 && (
            <div>
              <label style={baseStyles.label}>Alt Konu</label>
              <select value={form.konuAdi} onChange={e => setForm(f => ({ ...f, konuAdi: e.target.value }))} style={baseStyles.select}>
                <option value="">Genel</option>
                {selectedBrans.konular.map((k, i) => <option key={i} value={k.name}>{k.name}</option>)}
              </select>
            </div>
          )}
          <div>
            <label style={baseStyles.label}>Kaynak</label>
            <input type="text" value={form.kaynak} onChange={e => setForm(f => ({ ...f, kaynak: e.target.value }))} style={baseStyles.input} placeholder="Tusdata, ÖSYM..." />
          </div>
          <div>
            <label style={baseStyles.label}>Fotoğraf</label>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhoto} style={{ ...baseStyles.input, padding: "6px 8px" }} />
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <label style={baseStyles.label}>Not (Neden yanlış?)</label>
          <textarea
            value={form.not}
            onChange={e => setForm(f => ({ ...f, not: e.target.value }))}
            style={{ ...baseStyles.input, minHeight: 80, resize: "vertical" }}
            placeholder="Hata nedeninizi açıklayın..."
          />
        </div>
        {form.foto && (
          <div style={{ marginTop: 8 }}>
            <img src={form.foto} alt="Önizleme" style={{ maxWidth: 200, maxHeight: 150, borderRadius: 8, border: `1px solid ${colors.border}` }} />
          </div>
        )}
        <div style={{ marginTop: 12, textAlign: "right" }}>
          <button onClick={ekle} style={baseStyles.btn("primary")}>Ekle</button>
        </div>
      </div>

      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Hatalı Sorular ({hataliSorular.length})</div>
        {hataliSorular.length === 0 ? (
          <div style={{ color: colors.textMuted, fontSize: 13, textAlign: "center", padding: 20 }}>Henüz hatalı soru eklenmedi</div>
        ) : hataliSorular.map(s => {
          const b = tumBranslar.find(x => x.id === s.bransId);
          const isExpanded = expandedId === s.id;
          return (
            <div key={s.id} style={{ padding: 12, marginBottom: 8, background: colors.inputBg, borderRadius: 8, border: `1px solid ${colors.border}` }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }} onClick={() => setExpandedId(isExpanded ? null : s.id)}>
                {s.foto && (
                  <img src={s.foto} alt="" style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6, border: `1px solid ${colors.border}` }} />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{b ? `${b.icon} ${b.name}` : s.bransId} {s.konuAdi ? ` > ${s.konuAdi}` : ""}</div>
                    <span style={{ fontSize: 10, color: colors.textMuted }}>{formatDate(s.tarih)}</span>
                  </div>
                  {s.kaynak && <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>Kaynak: {s.kaynak}</div>}
                  <div style={{ fontSize: 12, color: colors.text, marginTop: 4, whiteSpace: isExpanded ? "pre-wrap" : "nowrap", overflow: isExpanded ? "visible" : "hidden", textOverflow: "ellipsis", maxWidth: isExpanded ? "none" : 400 }}>{s.not}</div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); sil(s.id); }} style={baseStyles.deleteBtn}>×</button>
              </div>
              {isExpanded && s.foto && (
                <div style={{ marginTop: 12, textAlign: "center" }}>
                  <img src={s.foto} alt="Soru fotoğrafı" style={{ maxWidth: "100%", maxHeight: 500, borderRadius: 8, border: `1px solid ${colors.border}` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Analiz ---
function Analiz({ data, colors, baseStyles }) {
  // Brans bazli soru cozum analizi
  const bransAnaliz = useMemo(() => {
    return tumBranslar.map(b => {
      const kayitlar = data.soruCozumleri.filter(s => s.bransId === b.id);
      const topDogru = kayitlar.reduce((s, c) => s + c.dogru, 0);
      const topYanlis = kayitlar.reduce((s, c) => s + c.yanlis, 0);
      const topBos = kayitlar.reduce((s, c) => s + (c.bos || 0), 0);
      const topSoru = topDogru + topYanlis + topBos;
      const net = hesaplaNet(topDogru, topYanlis);
      const basari = topSoru > 0 ? (topDogru / topSoru) * 100 : 0;
      const calismaSuresi = data.calismaKayitlari.filter(c => c.bransId === b.id).reduce((s, c) => s + c.sure, 0);
      return { ...b, topSoru, topDogru, topYanlis, topBos, net, basari, calismaSuresi };
    }).filter(b => b.topSoru > 0 || b.calismaSuresi > 0);
  }, [data.soruCozumleri, data.calismaKayitlari]);

  // Subtopic level analysis
  const konuAnaliz = useMemo(() => {
    const results = [];
    branslarWithKonular.forEach(b => {
      b.konular.forEach(k => {
        const kayitlar = data.soruCozumleri.filter(s => s.bransId === b.id && s.konuAdi === k.name);
        const topDogru = kayitlar.reduce((s, c) => s + c.dogru, 0);
        const topYanlis = kayitlar.reduce((s, c) => s + c.yanlis, 0);
        const topBos = kayitlar.reduce((s, c) => s + (c.bos || 0), 0);
        const topSoru = topDogru + topYanlis + topBos;
        const net = hesaplaNet(topDogru, topYanlis);
        const basari = topSoru > 0 ? (topDogru / topSoru) * 100 : 0;
        const avg = ortalama(k.dagilim);
        if (topSoru > 0) {
          results.push({ bransName: b.name, bransIcon: b.icon, konuName: k.name, topSoru, topDogru, topYanlis, topBos, net, basari, avg });
        }
      });
    });
    return results;
  }, [data.soruCozumleri]);

  const enGuclu = [...bransAnaliz].filter(b => b.topSoru >= 10).sort((a, b) => b.basari - a.basari).slice(0, 5);
  const enZayif = [...bransAnaliz].filter(b => b.topSoru >= 10).sort((a, b) => a.basari - b.basari).slice(0, 5);

  // Hic soru cozulmeyen branslar
  const hicCozulmeyenler = tumBranslar.filter(b => !bransAnaliz.find(a => a.id === b.id && a.topSoru > 0));

  // Haftalik / Aylik rapor
  const haftalikRapor = useMemo(() => {
    const now = new Date();
    const buHaftaBasi = new Date(now);
    buHaftaBasi.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
    buHaftaBasi.setHours(0, 0, 0, 0);
    const gecenHaftaBasi = new Date(buHaftaBasi);
    gecenHaftaBasi.setDate(gecenHaftaBasi.getDate() - 7);

    const buHaftaStr = buHaftaBasi.toISOString().slice(0, 10);
    const gecenHaftaStr = gecenHaftaBasi.toISOString().slice(0, 10);
    const buHaftaSonu = new Date(buHaftaBasi);
    buHaftaSonu.setDate(buHaftaSonu.getDate() + 7);
    const buHaftaSonuStr = buHaftaSonu.toISOString().slice(0, 10);

    const buHaftaSorular = data.soruCozumleri.filter(s => s.tarih >= buHaftaStr && s.tarih < buHaftaSonuStr);
    const gecenHaftaSorular = data.soruCozumleri.filter(s => s.tarih >= gecenHaftaStr && s.tarih < buHaftaStr);

    const buHaftaTopSoru = buHaftaSorular.reduce((s, c) => s + c.dogru + c.yanlis + (c.bos || 0), 0);
    const gecenHaftaTopSoru = gecenHaftaSorular.reduce((s, c) => s + c.dogru + c.yanlis + (c.bos || 0), 0);
    const buHaftaDogru = buHaftaSorular.reduce((s, c) => s + c.dogru, 0);
    const gecenHaftaDogru = gecenHaftaSorular.reduce((s, c) => s + c.dogru, 0);
    const buHaftaBasari = buHaftaTopSoru > 0 ? (buHaftaDogru / buHaftaTopSoru) * 100 : 0;
    const gecenHaftaBasari = gecenHaftaTopSoru > 0 ? (gecenHaftaDogru / gecenHaftaTopSoru) * 100 : 0;

    const buHaftaCalisma = data.calismaKayitlari.filter(c => c.tarih >= buHaftaStr && c.tarih < buHaftaSonuStr).reduce((s, c) => s + c.sure, 0);
    const gecenHaftaCalisma = data.calismaKayitlari.filter(c => c.tarih >= gecenHaftaStr && c.tarih < buHaftaStr).reduce((s, c) => s + c.sure, 0);

    return {
      buHafta: { soru: buHaftaTopSoru, basari: buHaftaBasari, calisma: buHaftaCalisma },
      gecenHafta: { soru: gecenHaftaTopSoru, basari: gecenHaftaBasari, calisma: gecenHaftaCalisma },
    };
  }, [data.soruCozumleri, data.calismaKayitlari]);

  const aylikRapor = useMemo(() => {
    const now = new Date();
    const buAyBasi = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
    const gecenAyBasi = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().slice(0, 10);
    const buAySonu = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString().slice(0, 10);

    const buAySorular = data.soruCozumleri.filter(s => s.tarih >= buAyBasi && s.tarih < buAySonu);
    const gecenAySorular = data.soruCozumleri.filter(s => s.tarih >= gecenAyBasi && s.tarih < buAyBasi);

    const buAyTopSoru = buAySorular.reduce((s, c) => s + c.dogru + c.yanlis + (c.bos || 0), 0);
    const gecenAyTopSoru = gecenAySorular.reduce((s, c) => s + c.dogru + c.yanlis + (c.bos || 0), 0);
    const buAyDogru = buAySorular.reduce((s, c) => s + c.dogru, 0);
    const gecenAyDogru = gecenAySorular.reduce((s, c) => s + c.dogru, 0);
    const buAyBasari = buAyTopSoru > 0 ? (buAyDogru / buAyTopSoru) * 100 : 0;
    const gecenAyBasari = gecenAyTopSoru > 0 ? (gecenAyDogru / gecenAyTopSoru) * 100 : 0;

    const buAyCalisma = data.calismaKayitlari.filter(c => c.tarih >= buAyBasi && c.tarih < buAySonu).reduce((s, c) => s + c.sure, 0);
    const gecenAyCalisma = data.calismaKayitlari.filter(c => c.tarih >= gecenAyBasi && c.tarih < buAyBasi).reduce((s, c) => s + c.sure, 0);

    return {
      buAy: { soru: buAyTopSoru, basari: buAyBasari, calisma: buAyCalisma },
      gecenAy: { soru: gecenAyTopSoru, basari: gecenAyBasari, calisma: gecenAyCalisma },
    };
  }, [data.soruCozumleri, data.calismaKayitlari]);

  const trendArrow = (current, previous) => {
    if (current > previous) return { icon: "\u2191", color: colors.success };
    if (current < previous) return { icon: "\u2193", color: colors.danger };
    return { icon: "\u2192", color: colors.textMuted };
  };

  const RaporCard = ({ title, current, previous, label }) => {
    const soruTrend = trendArrow(current.soru, previous.soru);
    const basariTrend = trendArrow(current.basari, previous.basari);
    const calismaTrend = trendArrow(current.calisma, previous.calisma);
    return (
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>{title}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: colors.primary }}>{current.soru}</div>
            <div style={{ fontSize: 11, color: colors.textMuted }}>Soru</div>
            <div style={{ fontSize: 12, color: soruTrend.color, fontWeight: 600 }}>{soruTrend.icon} {previous.soru} {label}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: colors.success }}>%{current.basari.toFixed(0)}</div>
            <div style={{ fontSize: 11, color: colors.textMuted }}>Başarı</div>
            <div style={{ fontSize: 12, color: basariTrend.color, fontWeight: 600 }}>{basariTrend.icon} %{previous.basari.toFixed(0)} {label}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: colors.warning }}>{(current.calisma / 60).toFixed(1)} sa</div>
            <div style={{ fontSize: 11, color: colors.textMuted }}>Çalışma</div>
            <div style={{ fontSize: 12, color: calismaTrend.color, fontWeight: 600 }}>{calismaTrend.icon} {(previous.calisma / 60).toFixed(1)} sa {label}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Haftalik ve Aylik Rapor */}
      <div style={baseStyles.grid2}>
        <RaporCard title="Bu Hafta" current={haftalikRapor.buHafta} previous={haftalikRapor.gecenHafta} label="geçen hafta" />
        <RaporCard title="Bu Ay" current={aylikRapor.buAy} previous={aylikRapor.gecenAy} label="geçen ay" />
      </div>

      {/* Guclu/Zayif Yonler */}
      <div style={baseStyles.grid2}>
        <div style={baseStyles.card}>
          <div style={{ ...baseStyles.cardTitle, color: colors.success }}>En Güçlü Branşlar</div>
          {enGuclu.length === 0 ? (
            <div style={{ color: colors.textMuted, fontSize: 13 }}>En az 10 soru çözülmüş branş gerekli</div>
          ) : enGuclu.map((b, i) => (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "8px 10px", background: colors.inputBg, borderRadius: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: colors.success, width: 24 }}>#{i + 1}</span>
              <span style={{ fontSize: 16 }}>{b.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{b.name}</div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>{b.topSoru} soru · {b.net.toFixed(1)} net</div>
              </div>
              <span style={{ fontWeight: 700, color: colors.success }}>%{b.basari.toFixed(0)}</span>
            </div>
          ))}
        </div>
        <div style={baseStyles.card}>
          <div style={{ ...baseStyles.cardTitle, color: colors.danger }}>En Zayıf Branşlar</div>
          {enZayif.length === 0 ? (
            <div style={{ color: colors.textMuted, fontSize: 13 }}>En az 10 soru çözülmüş branş gerekli</div>
          ) : enZayif.map((b, i) => (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "8px 10px", background: colors.inputBg, borderRadius: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: colors.danger, width: 24 }}>#{i + 1}</span>
              <span style={{ fontSize: 16 }}>{b.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{b.name}</div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>{b.topSoru} soru · {b.net.toFixed(1)} net</div>
              </div>
              <span style={{ fontWeight: 700, color: colors.danger }}>%{b.basari.toFixed(0)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brans Detay */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Branş Bazlı Detaylı Analiz</div>
        {bransAnaliz.length === 0 ? (
          <div style={{ color: colors.textMuted, fontSize: 13, textAlign: "center", padding: 20 }}>Soru çözümü veya çalışma kaydı ekledikten sonra analiz görünecektir</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={baseStyles.table}>
              <thead>
                <tr>
                  <th style={baseStyles.th}>Branş</th>
                  <th style={baseStyles.th}>Soru</th>
                  <th style={baseStyles.th}>D/Y/B</th>
                  <th style={baseStyles.th}>Net</th>
                  <th style={baseStyles.th}>Başarı</th>
                  <th style={baseStyles.th}>Çalışma</th>
                </tr>
              </thead>
              <tbody>
                {bransAnaliz.sort((a, b) => b.topSoru - a.topSoru).map(b => (
                  <tr key={b.id}>
                    <td style={baseStyles.td}>{b.icon} {b.name}</td>
                    <td style={baseStyles.td}>{b.topSoru}</td>
                    <td style={baseStyles.td}>
                      <span style={{ color: colors.success }}>{b.topDogru}</span>/
                      <span style={{ color: colors.danger }}>{b.topYanlis}</span>/
                      <span style={{ color: colors.textMuted }}>{b.topBos}</span>
                    </td>
                    <td style={{ ...baseStyles.td, fontWeight: 700 }}>{b.net.toFixed(1)}</td>
                    <td style={baseStyles.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ ...baseStyles.progressBar(b.basari), width: 60 }}>
                          <div style={baseStyles.progressFill(b.basari, b.basari >= 70 ? colors.success : b.basari >= 50 ? colors.warning : colors.danger)} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: b.basari >= 70 ? colors.success : b.basari >= 50 ? colors.warning : colors.danger }}>%{b.basari.toFixed(0)}</span>
                      </div>
                    </td>
                    <td style={{ ...baseStyles.td, color: colors.textMuted }}>{b.calismaSuresi > 0 ? `${(b.calismaSuresi / 60).toFixed(1)} sa` : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Konu (Subtopic) Analiz */}
      {konuAnaliz.length > 0 && (
        <div style={baseStyles.card}>
          <div style={baseStyles.cardTitle}>Alt Konu Bazlı Analiz</div>
          <div style={{ overflowX: "auto" }}>
            <table style={baseStyles.table}>
              <thead>
                <tr>
                  <th style={baseStyles.th}>Branş</th>
                  <th style={baseStyles.th}>Konu</th>
                  <th style={baseStyles.th}>Soru</th>
                  <th style={baseStyles.th}>Net</th>
                  <th style={baseStyles.th}>Başarı</th>
                  <th style={baseStyles.th}>Ort. Sınav</th>
                </tr>
              </thead>
              <tbody>
                {konuAnaliz.sort((a, b) => b.topSoru - a.topSoru).map((k, i) => (
                  <tr key={i}>
                    <td style={baseStyles.td}>{k.bransIcon} {k.bransName}</td>
                    <td style={{ ...baseStyles.td, fontSize: 12 }}>{k.konuName}</td>
                    <td style={baseStyles.td}>{k.topSoru}</td>
                    <td style={{ ...baseStyles.td, fontWeight: 700 }}>{k.net.toFixed(1)}</td>
                    <td style={baseStyles.td}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: k.basari >= 70 ? colors.success : k.basari >= 50 ? colors.warning : colors.danger }}>
                        %{k.basari.toFixed(0)}
                      </span>
                    </td>
                    <td style={{ ...baseStyles.td, color: colors.textMuted }}>{k.avg.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hic cozulmeyen */}
      {hicCozulmeyenler.length > 0 && (
        <div style={baseStyles.card}>
          <div style={{ ...baseStyles.cardTitle, color: colors.warning }}>Henüz Soru Çözülmeyen Branşlar</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {hicCozulmeyenler.map(b => (
              <span key={b.id} style={{ ...baseStyles.badge(colors.warning), padding: "4px 10px", fontSize: 12 }}>{b.icon} {b.name}</span>
            ))}
          </div>
        </div>
      )}

      {/* Temel vs Klinik karsilastirma */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Temel Tıp vs Klinik Tıp</div>
        {(() => {
          const temelKayitlar = data.soruCozumleri.filter(s => temelBranslar.find(b => b.id === s.bransId));
          const klinikKayitlar = data.soruCozumleri.filter(s => klinikBranslar.find(b => b.id === s.bransId));
          const tD = temelKayitlar.reduce((s, c) => s + c.dogru, 0);
          const tY = temelKayitlar.reduce((s, c) => s + c.yanlis, 0);
          const tS = tD + tY + temelKayitlar.reduce((s, c) => s + (c.bos || 0), 0);
          const kD = klinikKayitlar.reduce((s, c) => s + c.dogru, 0);
          const kY = klinikKayitlar.reduce((s, c) => s + c.yanlis, 0);
          const kS = kD + kY + klinikKayitlar.reduce((s, c) => s + (c.bos || 0), 0);
          return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ textAlign: "center", padding: 16, borderRadius: 8, background: colors.temel + "15" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.temel, marginBottom: 8 }}>Temel Tıp</div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>{tS > 0 ? ((tD / tS) * 100).toFixed(0) : 0}%</div>
                <div style={{ fontSize: 12, color: colors.textMuted }}>{tS} soru · {hesaplaNet(tD, tY).toFixed(1)} net</div>
              </div>
              <div style={{ textAlign: "center", padding: 16, borderRadius: 8, background: colors.klinik + "15" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.klinik, marginBottom: 8 }}>Klinik Tıp</div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>{kS > 0 ? ((kD / kS) * 100).toFixed(0) : 0}%</div>
                <div style={{ fontSize: 12, color: colors.textMuted }}>{kS} soru · {hesaplaNet(kD, kY).toFixed(1)} net</div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ===================== MAIN APP =====================
const tabs = [
  { id: "dashboard", label: "Genel Bakış" },
  { id: "konular", label: "Konu Takibi" },
  { id: "sorular", label: "Soru Çözümü" },
  { id: "denemeler", label: "Denemeler" },
  { id: "plan", label: "Çalışma Planı" },
  { id: "kayit", label: "Çalışma Kaydı" },
  { id: "pomodoro", label: "Pomodoro" },
  { id: "notlar", label: "Notlar" },
  { id: "kartlar", label: "Kartlar" },
  { id: "hatali", label: "Hatalı Sorular" },
  { id: "analiz", label: "Analiz" },
];

export default function TusTakip() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setDataRaw] = useState(() => loadData() || defaultData());
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem(THEME_KEY) || "light"; } catch { return "light"; }
  });

  const colors = useMemo(() => getColors(theme), [theme]);
  const baseStyles = useMemo(() => getBaseStyles(colors, theme), [colors, theme]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* ignore */ }
  };

  const setData = useCallback((updater) => {
    setDataRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveData(next);
      return next;
    });
  }, []);

  // Migrate missing fields and old brans-level konuDurumlari
  useEffect(() => {
    let needs = false;
    const d = { ...data };
    if (!d.calismaKayitlari) { d.calismaKayitlari = []; needs = true; }
    if (!d.haftalikPlan) { d.haftalikPlan = {}; needs = true; }
    if (d.gunlukHedef === undefined) { d.gunlukHedef = 100; needs = true; }
    if (d.pomodoroSayisi === undefined) { d.pomodoroSayisi = 0; needs = true; }
    if (!d.notlar) { d.notlar = {}; needs = true; }
    if (!d.flashcards) { d.flashcards = []; needs = true; }
    if (!d.hataliSorular) { d.hataliSorular = []; needs = true; }

    // Migrate old brans-level konuDurumlari to subtopic level where applicable
    const kd = { ...d.konuDurumlari };
    tumBranslar.forEach(b => {
      if (b.konular && b.konular.length > 0 && kd[b.id] && kd[b.id] !== "baslanmadi") {
        const oldStatus = kd[b.id];
        b.konular.forEach(k => {
          const key = `${b.id}_${k.name}`;
          if (!kd[key]) {
            kd[key] = oldStatus;
            needs = true;
          }
        });
        delete kd[b.id];
        needs = true;
      }
    });

    // Remove old standalone brans IDs that are now subtopics
    oldRemovedBransIds.forEach(id => {
      if (kd[id]) {
        delete kd[id];
        needs = true;
      }
    });

    if (needs) {
      d.konuDurumlari = kd;
      setData(d);
    }
  }, []);

  const resetData = () => {
    if (confirm("Tüm veriler silinecek. Emin misiniz?")) {
      setData(defaultData());
    }
  };

  return (
    <div style={baseStyles.container}>
      <header style={baseStyles.header}>
        <div style={baseStyles.headerContent}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1 style={baseStyles.title}>TUS Takip</h1>
              <p style={baseStyles.subtitle}>Tıpta Uzmanlık Sınavı Hazırlık Takip Sistemi</p>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={toggleTheme} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, padding: "4px 8px", borderRadius: 8 }} title={theme === "light" ? "Karanlık Mod" : "Aydınlık Mod"}>
                {theme === "light" ? "\u{1F319}" : "\u2600\uFE0F"}
              </button>
              <button onClick={resetData} style={{ ...baseStyles.btn("ghost"), fontSize: 11, opacity: 0.7, color: "#fff" }}>Sıfırla</button>
            </div>
          </div>
          <nav style={baseStyles.nav}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={baseStyles.navBtn(activeTab === t.id)}>
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main style={baseStyles.main}>
        {activeTab === "dashboard" && <Dashboard data={data} setData={setData} colors={colors} baseStyles={baseStyles} />}
        {activeTab === "konular" && <KonuTakibi data={data} setData={setData} colors={colors} baseStyles={baseStyles} />}
        {activeTab === "sorular" && <SoruCozumu data={data} setData={setData} colors={colors} baseStyles={baseStyles} />}
        {activeTab === "denemeler" && <Denemeler data={data} setData={setData} colors={colors} baseStyles={baseStyles} />}
        {activeTab === "plan" && <CalismePlani data={data} setData={setData} colors={colors} baseStyles={baseStyles} />}
        {activeTab === "kayit" && <CalismaKaydi data={data} setData={setData} colors={colors} baseStyles={baseStyles} />}
        {activeTab === "pomodoro" && <PomodoroTimer data={data} setData={setData} colors={colors} baseStyles={baseStyles} />}
        {activeTab === "notlar" && <NotDefteri data={data} setData={setData} colors={colors} baseStyles={baseStyles} />}
        {activeTab === "kartlar" && <FlashcardTab data={data} setData={setData} colors={colors} baseStyles={baseStyles} />}
        {activeTab === "hatali" && <HataliSorular data={data} setData={setData} colors={colors} baseStyles={baseStyles} />}
        {activeTab === "analiz" && <Analiz data={data} colors={colors} baseStyles={baseStyles} />}
      </main>
    </div>
  );
}
