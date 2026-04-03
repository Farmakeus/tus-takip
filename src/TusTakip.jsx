import React, { useState, useEffect, useCallback, useMemo } from "react";

// ===================== DATA =====================
const temelBranslar = [
  {
    id: "anatomi", name: "Anatomi", icon: "\u{1F9B4}", soruSayisi: 13,
    donemler: ["2026 Mart", "2025 A\u011f.", "2025 Mart", "2024 A\u011f.", "2024 Mart", "2023 Eyl."],
    konular: [
      { name: "Kemikler", dagilim: [1, 0, 3, 1, 0, 1] },
      { name: "Eklemler", dagilim: [0, 1, 0, 0, 0, 0] },
      { name: "Kaslar", dagilim: [2, 1, 2, 3, 2, 3] },
      { name: "Solunum Sistemi", dagilim: [2, 1, 1, 1, 2, 1] },
      { name: "Dola\u015f\u0131m Sistemi", dagilim: [3, 3, 0, 2, 1, 1] },
      { name: "Gastrointestinal Sistem", dagilim: [2, 3, 2, 1, 1, 1] },
      { name: "\u00dcrogenital Sistem", dagilim: [1, 1, 1, 1, 2, 1] },
      { name: "N\u00f6roanatomi", dagilim: [2, 3, 4, 4, 5, 5] },
    ],
  },
  {
    id: "fizyoloji", name: "Fizyoloji", icon: "\u26a1", soruSayisi: 15,
    donemler: ["2026 Mart", "2025 A\u011f.", "2025 Mart", "2024 A\u011f.", "2024 Mart", "2023 Eyl."],
    konular: [
      { name: "H\u00fccre", dagilim: [1, 2, 2, 1, 2, 0] },
      { name: "Doku", dagilim: [2, 2, 2, 2, 2, 3] },
      { name: "Kas", dagilim: [1, 1, 1, 1, 1, 0] },
      { name: "Genital Sistem ve Genel Embriyoloji", dagilim: [2, 3, 2, 2, 3, 2] },
      { name: "Hemopoetik Sistem", dagilim: [0, 1, 0, 1, 0, 0] },
      { name: "Gastrointestinal Sistem", dagilim: [2, 2, 1, 0, 1, 2] },
      { name: "Kardiyovask\u00fcler Sistem", dagilim: [2, 1, 3, 1, 1, 1] },
      { name: "Endokrin Sistem", dagilim: [1, 0, 1, 2, 1, 1] },
      { name: "Solunum Sistemi", dagilim: [0, 1, 1, 1, 1, 1] },
      { name: "Sinir Sistemi", dagilim: [3, 2, 2, 3, 2, 3] },
      { name: "\u00dcriner Sistem", dagilim: [1, 0, 0, 1, 1, 2] },
    ],
  },
  {
    id: "biyokimya", name: "Biyokimya", icon: "\u{1F9EA}", soruSayisi: 18,
    donemler: ["2025 A\u011f.", "2025 Mart", "2024 A\u011f.", "2024 Mart", "2023 Eyl.", "2023 Nis."],
    konular: [
      { name: "H\u00fccre ve Organeller", dagilim: [0, 0, 0, 0, 1, 1] },
      { name: "Metabolizma", dagilim: [1, 0, 0, 0, 1, 2] },
      { name: "Karbonhidratlar", dagilim: [3, 3, 2, 2, 3, 2] },
      { name: "Lipitler", dagilim: [2, 3, 2, 6, 2, 5] },
      { name: "Aminoasitler ve Proteinler", dagilim: [7, 8, 8, 8, 6, 7] },
      { name: "N\u00fckleik Asitler", dagilim: [1, 1, 1, 1, 2, 2] },
      { name: "Vitaminler ve Mineraller", dagilim: [2, 1, 2, 0, 0, 1] },
      { name: "Hormonlar", dagilim: [2, 2, 3, 1, 3, 2] },
    ],
  },
  {
    id: "mikrobiyoloji", name: "Mikrobiyoloji", icon: "\u{1F9A0}", soruSayisi: 18,
    donemler: ["2026 Mart", "2025 A\u011f.", "2025 Mart", "2024 A\u011f.", "2024 Mart", "2023 Eyl."],
    konular: [
      { name: "Temel Mikrobiyoloji", dagilim: [3, 2, 3, 4, 4, 2] },
      { name: "Bakteriyoloji", dagilim: [6, 8, 6, 5, 6, 7] },
      { name: "Parazitoloji", dagilim: [2, 2, 2, 2, 2, 2] },
      { name: "Mikoloji", dagilim: [3, 2, 2, 3, 2, 2] },
      { name: "Viroloji", dagilim: [2, 3, 3, 2, 3, 3] },
      { name: "\u0130mmunoloji", dagilim: [2, 1, 2, 2, 1, 2] },
    ],
  },
  {
    id: "patoloji", name: "Patoloji", icon: "\u{1F52C}", soruSayisi: 18,
    donemler: ["2026 Mart", "2025 A\u011f.", "2025 Mart", "2024 A\u011f.", "2024 Mart", "2023 Eyl."],
    konular: [
      { name: "H\u00fccre", dagilim: [1, 1, 2, 1, 2, 3] },
      { name: "\u0130nflamasyon", dagilim: [1, 1, 0, 1, 0, 1] },
      { name: "\u0130mmun Sistem", dagilim: [1, 1, 3, 0, 0, 1] },
      { name: "Onar\u0131m ve Yara \u0130yile\u015fmesi", dagilim: [1, 0, 1, 0, 0, 1] },
      { name: "Hemodinamik Hastal\u0131klar", dagilim: [1, 0, 0, 2, 0, 1] },
      { name: "Neoplazi", dagilim: [2, 3, 0, 2, 2, 1] },
      { name: "Solunum Sistemi", dagilim: [2, 0, 1, 2, 1, 1] },
      { name: "Kardiyovask\u00fcler Sistem", dagilim: [0, 1, 1, 1, 1, 0] },
      { name: "Hemopoetik Sistem", dagilim: [1, 1, 1, 0, 1, 0] },
      { name: "Gastrointestinal Sistem", dagilim: [2, 1, 2, 1, 2, 3] },
      { name: "Hepatobilier Sistem", dagilim: [1, 0, 1, 1, 2, 0] },
      { name: "\u00dcriner Sistem", dagilim: [1, 1, 0, 1, 2, 2] },
      { name: "Endokrin Sistem", dagilim: [0, 2, 1, 0, 0, 0] },
      { name: "Kad\u0131n Genital Sistemi", dagilim: [1, 1, 1, 0, 2, 1] },
      { name: "Erkek Genital Sistemi", dagilim: [1, 1, 1, 1, 0, 0] },
      { name: "Meme Hastal\u0131klar\u0131", dagilim: [1, 1, 1, 2, 0, 1] },
      { name: "Sinir Sistemi", dagilim: [0, 1, 0, 0, 0, 0] },
      { name: "Kas \u0130skelet Sistemi", dagilim: [0, 1, 1, 2, 2, 1] },
      { name: "Deri Hastal\u0131klar\u0131", dagilim: [1, 1, 1, 1, 1, 1] },
    ],
  },
  {
    id: "farmakoloji", name: "Farmakoloji", icon: "\u{1F48A}", soruSayisi: 18,
    donemler: ["2025 A\u011f.", "2025 Mart", "2024 A\u011f.", "2024 Mart", "2023 Eyl.", "2023 Nis."],
    konular: [
      { name: "Genel Farmakoloji", dagilim: [1, 1, 1, 2, 2, 3] },
      { name: "Otonom Sinir Sistemi", dagilim: [2, 1, 1, 1, 2, 2] },
      { name: "Santral Sinir Sistemi", dagilim: [3, 3, 3, 4, 3, 3] },
      { name: "Kardiyovask\u00fcler Sistem", dagilim: [2, 2, 2, 1, 2, 3] },
      { name: "Solunum Sistemi", dagilim: [1, 0, 0, 0, 1, 0] },
      { name: "Gastrointestinal Sistem", dagilim: [0, 2, 2, 0, 1, 2] },
      { name: "Endokrin Sistem", dagilim: [4, 2, 3, 3, 2, 2] },
      { name: "Otakoidler", dagilim: [0, 1, 0, 0, 0, 0] },
      { name: "NSA\u0130\u0130", dagilim: [0, 0, 0, 1, 0, 1] },
      { name: "Kemoterapotikler", dagilim: [3, 5, 5, 5, 5, 5] },
      { name: "Toksikoloji", dagilim: [2, 1, 1, 1, 0, 1] },
    ],
  },
  { id: "histoloji", name: "Histoloji ve Embriyoloji", icon: "\u{1F9EB}", soruSayisi: 8 },
  { id: "tibbigenetik", name: "T\u0131bbi Genetik", icon: "\u{1F9EC}", soruSayisi: 5 },
  { id: "biyoistatistik", name: "Biyoistatistik", icon: "\u{1F4CA}", soruSayisi: 5 },
  { id: "tibbiekoloji", name: "T\u0131bbi Ekoloji", icon: "\u{1F33F}", soruSayisi: 3 },
  { id: "tibbietik", name: "T\u0131bbi Etik / Deontoloji", icon: "\u2696\ufe0f", soruSayisi: 3 },
];

const klinikBranslar = [
  {
    id: "dahiliye", name: "\u0130\u00e7 Hastal\u0131klar\u0131", icon: "\u{1F3E5}", soruSayisi: 23,
    donemler: ["2025 A\u011f.", "2025 Mart", "2024 A\u011f.", "2024 Mart", "2023 Eyl.", "2023 Nis."],
    konular: [
      { name: "Hematoloji", dagilim: [1, 2, 2, 2, 2, 2] },
      { name: "Onkoloji", dagilim: [1, 2, 2, 2, 2, 2] },
      { name: "Nefroloji", dagilim: [2, 2, 2, 2, 2, 3] },
      { name: "Kardiyoloji", dagilim: [3, 3, 3, 2, 3, 4] },
      { name: "G\u00f6\u011f\u00fcs Hastal\u0131klar\u0131", dagilim: [2, 2, 2, 3, 2, 3] },
      { name: "Gastroenteroloji", dagilim: [2, 0, 2, 2, 0, 2] },
      { name: "Hepatoloji", dagilim: [3, 3, 1, 1, 3, 2] },
      { name: "Endokrin", dagilim: [2, 2, 2, 2, 2, 3] },
      { name: "Romatoloji", dagilim: [3, 2, 2, 2, 2, 2] },
      { name: "Enfeksiyon Hastal\u0131klar\u0131", dagilim: [3, 3, 3, 3, 3, 4] },
      { name: "Allerji-\u0130mmunoloji", dagilim: [0, 1, 1, 1, 1, 1] },
      { name: "Geriatri", dagilim: [1, 1, 1, 1, 1, 1] },
    ],
  },
  {
    id: "cerrrahi", name: "Genel Cerrahi", icon: "\u{1F52A}", soruSayisi: 18,
    donemler: ["2025 A\u011f.", "2025 Mart", "2024 A\u011f.", "2024 Mart", "2023 Eyl.", "2023 Nis."],
    konular: [
      { name: "Temel Cerrahi", dagilim: [5, 7, 7, 5, 5, 7] },
      { name: "Meme Hastal\u0131klar\u0131", dagilim: [2, 2, 2, 2, 2, 2] },
      { name: "Tiroid Hastal\u0131klar\u0131", dagilim: [1, 1, 2, 0, 2, 1] },
      { name: "Paratiroid Hastal\u0131klar\u0131", dagilim: [1, 1, 0, 0, 0, 0] },
      { name: "Adrenal Bez Hastal\u0131klar\u0131", dagilim: [0, 0, 0, 2, 0, 1] },
      { name: "\u00d6zefagus", dagilim: [1, 1, 0, 0, 0, 1] },
      { name: "Mide", dagilim: [1, 2, 3, 1, 1, 1] },
      { name: "\u0130nce Barsak", dagilim: [2, 0, 0, 2, 1, 2] },
      { name: "Kolorektal", dagilim: [1, 1, 1, 2, 3, 0] },
      { name: "Appendiks", dagilim: [0, 0, 0, 0, 0, 1] },
      { name: "Anal Kanal ve Perianal B\u00f6lge", dagilim: [0, 0, 0, 0, 1, 1] },
      { name: "Karaci\u011fer", dagilim: [2, 0, 1, 2, 1, 2] },
      { name: "Safra Yolu ve Safra Kesesi", dagilim: [1, 1, 1, 1, 1, 2] },
      { name: "Pankreas", dagilim: [1, 1, 1, 1, 2, 1] },
      { name: "Dalak", dagilim: [1, 1, 1, 1, 1, 1] },
    ],
  },
  {
    id: "pediatri", name: "Pediatri", icon: "\u{1F476}", soruSayisi: 25,
    donemler: ["2025 A\u011f.", "2025 Mart", "2024 A\u011f.", "2024 Mart", "2023 Eyl.", "2023 Nis."],
    konular: [
      { name: "Yenido\u011fan", dagilim: [3, 2, 2, 2, 2, 3] },
      { name: "Genetik", dagilim: [0, 0, 2, 1, 1, 1] },
      { name: "B\u00fcy\u00fcme ve Geli\u015fme", dagilim: [0, 2, 2, 1, 1, 2] },
      { name: "Beslenme", dagilim: [1, 1, 1, 0, 1, 1] },
      { name: "Gastroenteroloji ve Hepatoloji", dagilim: [2, 1, 1, 2, 1, 2] },
      { name: "N\u00f6roloji", dagilim: [2, 0, 2, 2, 2, 3] },
      { name: "Kardiyoloji", dagilim: [1, 2, 3, 3, 3, 2] },
      { name: "G\u00f6\u011f\u00fcs Hastal\u0131klar\u0131", dagilim: [2, 1, 1, 1, 2, 1] },
      { name: "D\u00f6k\u00fcnt\u00fcl\u00fc Hastal\u0131klar", dagilim: [1, 0, 0, 0, 1, 0] },
      { name: "Ba\u011f\u0131\u015f\u0131klama", dagilim: [1, 0, 1, 0, 1, 4] },
      { name: "Allerji", dagilim: [0, 1, 1, 1, 0, 1] },
      { name: "\u0130mmunoloji", dagilim: [1, 2, 1, 1, 1, 0] },
      { name: "Enfeksiyon Hastal\u0131klar\u0131", dagilim: [0, 2, 1, 1, 0, 0] },
      { name: "Endokrinoloji", dagilim: [1, 2, 1, 1, 1, 2] },
      { name: "Metabolik Hastal\u0131klar", dagilim: [1, 2, 1, 2, 1, 1] },
      { name: "Hematoloji", dagilim: [1, 0, 0, 2, 2, 1] },
      { name: "Onkoloji", dagilim: [2, 2, 1, 1, 0, 2] },
      { name: "Nefroloji", dagilim: [3, 2, 1, 1, 2, 1] },
      { name: "Romatoloji", dagilim: [1, 1, 1, 1, 1, 1] },
      { name: "Acil T\u0131p, Zehirlenmeler ve Yo\u011fun Bak\u0131m", dagilim: [1, 1, 1, 1, 2, 1] },
      { name: "\u00c7ocuk Psikiyatrisi", dagilim: [1, 1, 1, 1, 0, 1] },
      { name: "\u00c7ocuk Cerrahisi", dagilim: [0, 0, 0, 0, 0, 0] },
    ],
  },
  {
    id: "kadinDogum", name: "Kad\u0131n Hastal\u0131klar\u0131 ve Do\u011fum", icon: "\u{1F930}", soruSayisi: 10,
    donemler: ["2026 Mart", "2025 A\u011f.", "2025 Mart", "2024 A\u011f.", "2024 Mart", "2023 Eyl."],
    konular: [
      { name: "Jinekoloji", dagilim: [2, 1, 1, 1, 3, 2] },
      { name: "Endokrinoloji", dagilim: [3, 3, 3, 2, 2, 4] },
      { name: "Onkoloji", dagilim: [1, 3, 2, 3, 1, 0] },
      { name: "Obstetri", dagilim: [4, 3, 4, 4, 4, 4] },
    ],
  },
  {
    id: "kucukStajlar", name: "K\u00fc\u00e7\u00fck Stajlar", icon: "\u{1F3EB}", soruSayisi: 22,
    donemler: ["2026 Mart", "2025 A\u011f.", "2025 Mart", "2024 A\u011f.", "2024 Mart", "2023 Eyl."],
    konular: [
      { name: "N\u00f6roloji", dagilim: [3, 2, 3, 3, 1, 2] },
      { name: "Beyin Cerrahisi", dagilim: [1, 1, 2, 1, 2, 1] },
      { name: "Psikiyatri", dagilim: [2, 2, 2, 1, 2, 2] },
      { name: "Halk Sa\u011fl\u0131\u011f\u0131", dagilim: [1, 1, 1, 1, 1, 1] },
      { name: "Dermatoloji", dagilim: [2, 2, 2, 2, 2, 2] },
      { name: "Radyoloji", dagilim: [2, 1, 1, 1, 1, 1] },
      { name: "N\u00fckleer T\u0131p", dagilim: [0, 1, 1, 1, 1, 1] },
      { name: "KBB", dagilim: [1, 1, 1, 2, 1, 1] },
      { name: "G\u00f6z Hastal\u0131klar\u0131", dagilim: [1, 1, 1, 1, 1, 1] },
      { name: "Ortopedi", dagilim: [1, 2, 2, 1, 2, 1] },
      { name: "FTR", dagilim: [1, 2, 0, 2, 0, 1] },
      { name: "\u00dcroloji", dagilim: [0, 1, 1, 1, 1, 1] },
      { name: "\u00c7ocuk Cerrahisi", dagilim: [1, 1, 1, 1, 1, 1] },
      { name: "Kalp Damar Cerrahisi", dagilim: [1, 1, 1, 2, 2, 1] },
      { name: "G\u00f6\u011f\u00fcs Cerrahisi", dagilim: [1, 0, 1, 0, 1, 1] },
      { name: "Plastik Cerrahi", dagilim: [1, 0, 0, 0, 0, 0] },
      { name: "Anestezi", dagilim: [1, 1, 1, 1, 1, 1] },
      { name: "Acil T\u0131p ve Zehirlenmeler", dagilim: [2, 2, 1, 1, 2, 3] },
      { name: "Adli T\u0131p", dagilim: [0, 0, 0, 0, 0, 0] },
    ],
  },
];

const tumBranslar = [
  ...temelBranslar.map(b => ({ ...b, kategori: "Temel T\u0131p" })),
  ...klinikBranslar.map(b => ({ ...b, kategori: "Klinik T\u0131p" })),
];

// All branslar that have konular (subtopics)
const branslarWithKonular = tumBranslar.filter(b => b.konular && b.konular.length > 0);

const haftaGunleri = ["Pazartesi", "Sal\u0131", "\u00c7ar\u015famba", "Per\u015fembe", "Cuma", "Cumartesi", "Pazar"];

// ===================== HELPERS =====================
const LS_KEY = "tus_takip_data";

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
    sinavTarihi: "2026-09-13",
    konuDurumlari: {},
    soruCozumleri: [],
    denemeler: [],
    haftalikPlan: {},
    calismaKayitlari: [],
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
      });
    } else {
      keys.push(b.id);
    }
  });
  return keys;
}

// Get brans-level progress from subtopic statuses
function getBransProgress(brans, konuDurumlari) {
  if (!brans.konular || brans.konular.length === 0) {
    const durum = konuDurumlari[brans.id] || "baslanmadi";
    return durum === "tamamlandi" ? 100 : durum === "devam" ? 50 : durum === "tekrar" ? 75 : 0;
  }
  let total = 0;
  brans.konular.forEach(k => {
    const key = `${brans.id}_${k.name}`;
    const durum = konuDurumlari[key] || "baslanmadi";
    total += durum === "tamamlandi" ? 100 : durum === "devam" ? 50 : durum === "tekrar" ? 75 : 0;
  });
  return total / brans.konular.length;
}

function getBransProgressColor(pct) {
  if (pct >= 90) return colors.success;
  if (pct >= 50) return colors.warning;
  if (pct > 0) return colors.klinik;
  return colors.border;
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

// ===================== STYLES =====================
const colors = {
  bg: "#0f172a",
  card: "#1e293b",
  cardHover: "#334155",
  primary: "#3b82f6",
  primaryHover: "#2563eb",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  border: "#334155",
  inputBg: "#0f172a",
  temel: "#8b5cf6",
  klinik: "#06b6d4",
};

const baseStyles = {
  container: {
    minHeight: "100vh",
    background: `linear-gradient(135deg, ${colors.bg} 0%, #1a1a2e 100%)`,
    color: colors.text,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: "0",
  },
  header: {
    background: "linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)",
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
    background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    margin: "4px 0 0",
  },
  nav: {
    display: "flex",
    gap: 4,
    marginTop: 16,
    overflowX: "auto",
    paddingBottom: 4,
  },
  navBtn: (active) => ({
    padding: "8px 16px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    background: active ? colors.primary : "transparent",
    color: active ? "#fff" : colors.textMuted,
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
  },
  th: {
    textAlign: "left",
    padding: "8px 12px",
    borderBottom: `1px solid ${colors.border}`,
    color: colors.textMuted,
    fontWeight: 600,
    fontSize: 12,
  },
  td: {
    padding: "10px 12px",
    borderBottom: `1px solid ${colors.border}22`,
  },
};

// ===================== MINI CHART (SVG Bar) =====================
function MiniBarChart({ data, height = 120, barColor = colors.primary }) {
  if (!data || data.length === 0) return <div style={{ color: colors.textMuted, fontSize: 13 }}>Hen\u00fcz veri yok</div>;
  const max = Math.max(...data.map(d => d.value), 1);
  const barW = Math.min(32, Math.floor(280 / data.length) - 4);
  const w = data.length * (barW + 4);
  return (
    <svg width="100%" height={height + 24} viewBox={`0 0 ${Math.max(w, 100)} ${height + 24}`} style={{ overflow: "visible" }}>
      {data.map((d, i) => {
        const h = (d.value / max) * height;
        return (
          <g key={i}>
            <rect x={i * (barW + 4)} y={height - h} width={barW} height={h} rx={3} fill={d.color || barColor} opacity={0.85} />
            <text x={i * (barW + 4) + barW / 2} y={height - h - 4} textAnchor="middle" fill={colors.textMuted} fontSize={10}>{d.value.toFixed(1)}</text>
            <text x={i * (barW + 4) + barW / 2} y={height + 14} textAnchor="middle" fill={colors.textMuted} fontSize={9}>{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function MiniLineChart({ data, height = 100, color = colors.primary }) {
  if (!data || data.length < 2) return <div style={{ color: colors.textMuted, fontSize: 13 }}>En az 2 veri noktas\u0131 gerekli</div>;
  const max = Math.max(...data.map(d => d.value), 1);
  const min = Math.min(...data.map(d => d.value), 0);
  const range = max - min || 1;
  const w = 300;
  const stepX = w / (data.length - 1);
  const points = data.map((d, i) => `${i * stepX},${height - ((d.value - min) / range) * (height - 10)}`).join(" ");
  return (
    <svg width="100%" height={height + 24} viewBox={`0 0 ${w} ${height + 24}`} style={{ overflow: "visible" }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={i * stepX} cy={height - ((d.value - min) / range) * (height - 10)} r={3} fill={color} />
          <text x={i * stepX} y={height + 16} textAnchor="middle" fill={colors.textMuted} fontSize={9}>{d.label}</text>
        </g>
      ))}
    </svg>
  );
}

// ===================== COMPONENTS =====================

// --- Dashboard ---
function Dashboard({ data, setData }) {
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

  return (
    <div>
      {/* Countdown */}
      <div style={{ ...baseStyles.card, background: "linear-gradient(135deg, #1e3a5f 0%, #2d1b69 100%)", textAlign: "center", padding: 32 }}>
        <div style={{ fontSize: 14, color: colors.textMuted, marginBottom: 8 }}>TUS S\u0131nav\u0131na Kalan</div>
        <div style={{ fontSize: 56, fontWeight: 900, background: kalan <= 30 ? "linear-gradient(135deg, #ef4444, #f59e0b)" : "linear-gradient(135deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {kalan > 0 ? kalan : 0} G\u00fcn
        </div>
        <div style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
          Hedef: {formatDate(data.sinavTarihi)} | Hedef Puan: {data.hedefPuan}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
          <label style={{ fontSize: 12, color: colors.textMuted }}>
            S\u0131nav Tarihi:
            <input type="date" value={data.sinavTarihi} onChange={e => setData(d => ({ ...d, sinavTarihi: e.target.value }))} style={{ ...baseStyles.input, width: 150, marginLeft: 6 }} />
          </label>
          <label style={{ fontSize: 12, color: colors.textMuted }}>
            Hedef Puan:
            <input type="number" value={data.hedefPuan} min={0} max={100} onChange={e => setData(d => ({ ...d, hedefPuan: Number(e.target.value) }))} style={{ ...baseStyles.input, width: 80, marginLeft: 6 }} />
          </label>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 16 }}>
        {[
          { label: "\u00c7\u00f6z\u00fclen Soru", value: toplamSoru, color: colors.primary },
          { label: "Ba\u015far\u0131 Oran\u0131", value: `%${basariOrani}`, color: colors.success },
          { label: "Toplam Net", value: hesaplaNet(toplamDogru, toplamYanlis).toFixed(1), color: colors.warning },
          { label: "Deneme Say\u0131s\u0131", value: data.denemeler.length, color: "#a78bfa" },
          { label: "Konu \u0130lerlemesi", value: `${tamamlananKonuSayisi}/${toplamKonu}`, color: colors.klinik },
          { label: "\u00c7al\u0131\u015fma S\u00fcresi", value: `${saatStr} sa`, color: "#f472b6" },
        ].map((s, i) => (
          <div key={i} style={baseStyles.statBox}>
            <div style={{ ...baseStyles.statValue, color: s.color }}>{s.value}</div>
            <div style={baseStyles.statLabel}>{s.label}</div>
          </div>
        ))}
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
          />
        </div>
      )}

      {/* Konu Ilerlemesi Ozet */}
      <div style={baseStyles.grid2}>
        <div style={baseStyles.card}>
          <div style={baseStyles.cardTitle}><span style={{ color: colors.temel }}>&#9632;</span> Temel T\u0131p \u0130lerlemesi</div>
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
          <div style={baseStyles.cardTitle}><span style={{ color: colors.klinik }}>&#9632;</span> Klinik T\u0131p \u0130lerlemesi</div>
          {klinikBranslar.map(b => {
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
      </div>
    </div>
  );
}

// --- Konu Takibi (Enhanced with subtopics) ---
function KonuTakibi({ data, setData }) {
  const [expandedBrans, setExpandedBrans] = useState({});

  const durumlar = [
    { id: "baslanmadi", label: "Ba\u015flanmad\u0131", color: colors.textMuted },
    { id: "devam", label: "Devam Ediyor", color: colors.warning },
    { id: "tekrar", label: "Tekrar A\u015famas\u0131nda", color: colors.klinik },
    { id: "tamamlandi", label: "Tamamland\u0131", color: colors.success },
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
                    Soru pay\u0131: ~{b.soruSayisi}
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
                    return (
                      <div key={ki} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 16px 6px 52px", flexWrap: "wrap" }}>
                        <div style={{ flex: 1, minWidth: 160 }}>
                          <div style={{ fontSize: 13, fontWeight: 500 }}>{k.name}</div>
                          <div style={{ fontSize: 10, color: colors.textMuted }}>Ort: {avg.toFixed(1)} soru/s\u0131nav</div>
                        </div>
                        {/* High yield indicator */}
                        {avg >= 2.5 && (
                          <span style={{ ...baseStyles.badge(colors.warning), fontSize: 9, padding: "1px 6px" }}>
                            Y\u00fcksek Verim
                          </span>
                        )}
                        <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                          {durumlar.map(d => (
                            <button
                              key={d.id}
                              onClick={() => setDurum(key, d.id)}
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
      {renderBransGrubu("Temel T\u0131p Bilimleri", temelBranslar, colors.temel)}
      {renderBransGrubu("Klinik T\u0131p Bilimleri", klinikBranslar, colors.klinik)}
    </div>
  );
}

// --- Soru Dagilimi (NEW - Heatmap) ---
function SoruDagilimi() {
  const [selectedBrans, setSelectedBrans] = useState(branslarWithKonular[0]?.id || "");

  const brans = tumBranslar.find(b => b.id === selectedBrans);

  const getHeatmapColor = (value, maxVal) => {
    if (value === 0) return "transparent";
    const intensity = Math.min(1, value / Math.max(maxVal, 1));
    // Blue-purple gradient
    const r = Math.round(59 + intensity * (139 - 59));
    const g = Math.round(130 + intensity * (92 - 130));
    const b_val = Math.round(246 + intensity * (246 - 246));
    const alpha = 0.15 + intensity * 0.7;
    return `rgba(${r}, ${g}, ${b_val}, ${alpha})`;
  };

  if (!brans || !brans.konular) return null;

  // Find max value for color scaling
  const allValues = brans.konular.flatMap(k => k.dagilim);
  const maxVal = Math.max(...allValues, 1);

  return (
    <div>
      {/* Brans Selector */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Soru Da\u011f\u0131l\u0131m\u0131 - Bran\u015f Se\u00e7imi</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {branslarWithKonular.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBrans(b.id)}
              style={{
                padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600,
                background: selectedBrans === b.id ? colors.primary : colors.inputBg,
                color: selectedBrans === b.id ? "#fff" : colors.textMuted,
                transition: "all 0.2s",
              }}
            >
              {b.icon} {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap Table */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>
          {brans.icon} {brans.name} - S\u0131nav D\u00f6nemi Soru Da\u011f\u0131l\u0131m\u0131
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ ...baseStyles.table, minWidth: 600 }}>
            <thead>
              <tr>
                <th style={{ ...baseStyles.th, position: "sticky", left: 0, background: colors.card, zIndex: 2, minWidth: 180 }}>Konu</th>
                {brans.donemler.map((d, i) => (
                  <th key={i} style={{ ...baseStyles.th, textAlign: "center", minWidth: 70 }}>{d}</th>
                ))}
                <th style={{ ...baseStyles.th, textAlign: "center", minWidth: 60, fontWeight: 700 }}>Ort.</th>
                <th style={{ ...baseStyles.th, textAlign: "center", minWidth: 60 }}>Top.</th>
                <th style={{ ...baseStyles.th, minWidth: 80 }}>Verim</th>
              </tr>
            </thead>
            <tbody>
              {brans.konular.map((k, ki) => {
                const avg = ortalama(k.dagilim);
                const total = k.dagilim.reduce((s, v) => s + v, 0);
                const isHighYield = avg >= 2.5;
                return (
                  <tr key={ki}>
                    <td style={{ ...baseStyles.td, position: "sticky", left: 0, background: colors.card, zIndex: 1, fontWeight: 500, fontSize: 12 }}>
                      {k.name}
                    </td>
                    {k.dagilim.map((val, vi) => (
                      <td
                        key={vi}
                        style={{
                          ...baseStyles.td,
                          textAlign: "center",
                          fontWeight: val > 0 ? 700 : 400,
                          color: val === 0 ? colors.textMuted + "44" : colors.text,
                          background: getHeatmapColor(val, maxVal),
                          borderRadius: 0,
                        }}
                      >
                        {val}
                      </td>
                    ))}
                    <td style={{ ...baseStyles.td, textAlign: "center", fontWeight: 700, color: colors.primary, fontSize: 13 }}>
                      {avg.toFixed(1)}
                    </td>
                    <td style={{ ...baseStyles.td, textAlign: "center", color: colors.textMuted }}>
                      {total}
                    </td>
                    <td style={baseStyles.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ flex: 1, height: 8, borderRadius: 4, background: colors.border, overflow: "hidden" }}>
                          <div style={{
                            height: "100%", borderRadius: 4,
                            width: `${Math.min(100, (avg / Math.max(...brans.konular.map(x => ortalama(x.dagilim)), 1)) * 100)}%`,
                            background: isHighYield ? colors.warning : avg >= 1.5 ? colors.primary : colors.textMuted,
                            transition: "width 0.3s",
                          }} />
                        </div>
                        {isHighYield && (
                          <span style={{ fontSize: 9, color: colors.warning, fontWeight: 700 }}>!</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td style={{ ...baseStyles.td, fontWeight: 700, position: "sticky", left: 0, background: colors.card, zIndex: 1 }}>Toplam</td>
                {brans.donemler.map((_, di) => {
                  const colTotal = brans.konular.reduce((s, k) => s + k.dagilim[di], 0);
                  return (
                    <td key={di} style={{ ...baseStyles.td, textAlign: "center", fontWeight: 700, color: colors.primary }}>
                      {colTotal}
                    </td>
                  );
                })}
                <td style={{ ...baseStyles.td, textAlign: "center", fontWeight: 700, color: colors.success }}>
                  {(brans.konular.reduce((s, k) => s + ortalama(k.dagilim), 0)).toFixed(1)}
                </td>
                <td style={{ ...baseStyles.td, textAlign: "center", fontWeight: 700 }}>
                  {brans.konular.reduce((s, k) => s + k.dagilim.reduce((a, b) => a + b, 0), 0)}
                </td>
                <td style={baseStyles.td}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* High Yield Summary */}
      <div style={baseStyles.card}>
        <div style={{ ...baseStyles.cardTitle, color: colors.warning }}>Y\u00fcksek Verimli Konular (Ort. \u2265 2.5 soru)</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {brans.konular
            .filter(k => ortalama(k.dagilim) >= 2.5)
            .sort((a, b) => ortalama(b.dagilim) - ortalama(a.dagilim))
            .map((k, i) => (
              <div key={i} style={{
                padding: "6px 12px", borderRadius: 8,
                background: colors.warning + "15", border: `1px solid ${colors.warning}33`,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{k.name}</span>
                <span style={{ fontSize: 11, color: colors.warning, fontWeight: 700 }}>
                  {ortalama(k.dagilim).toFixed(1)}
                </span>
              </div>
            ))
          }
          {brans.konular.filter(k => ortalama(k.dagilim) >= 2.5).length === 0 && (
            <div style={{ color: colors.textMuted, fontSize: 13 }}>Bu bran\u015fta y\u00fcksek verimli konu bulunmuyor</div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Soru Cozumu ---
function SoruCozumu({ data, setData }) {
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

  // Son 7 gun soru cozum grafigi
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
        <div style={baseStyles.cardTitle}>Soru \u00c7\u00f6z\u00fcm\u00fc Ekle</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          <div>
            <label style={baseStyles.label}>Bran\u015f</label>
            <select value={form.bransId} onChange={e => setForm(f => ({ ...f, bransId: e.target.value, konuAdi: "" }))} style={baseStyles.select}>
              <optgroup label="Temel T\u0131p">
                {temelBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
              </optgroup>
              <optgroup label="Klinik T\u0131p">
                {klinikBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
              </optgroup>
            </select>
          </div>
          {selectedBrans && selectedBrans.konular && selectedBrans.konular.length > 0 && (
            <div>
              <label style={baseStyles.label}>Alt Konu</label>
              <select value={form.konuAdi} onChange={e => setForm(f => ({ ...f, konuAdi: e.target.value }))} style={baseStyles.select}>
                <option value="">Genel / T\u00fcm\u00fc</option>
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
            <label style={baseStyles.label}>Do\u011fru</label>
            <input type="number" min={0} value={form.dogru} onChange={e => setForm(f => ({ ...f, dogru: e.target.value }))} style={baseStyles.input} placeholder="0" />
          </div>
          <div>
            <label style={baseStyles.label}>Yanl\u0131\u015f</label>
            <input type="number" min={0} value={form.yanlis} onChange={e => setForm(f => ({ ...f, yanlis: e.target.value }))} style={baseStyles.input} placeholder="0" />
          </div>
          <div>
            <label style={baseStyles.label}>Bo\u015f</label>
            <input type="number" min={0} value={form.bos} onChange={e => setForm(f => ({ ...f, bos: e.target.value }))} style={baseStyles.input} placeholder="0" />
          </div>
          <div>
            <label style={baseStyles.label}>Kaynak</label>
            <input type="text" value={form.kaynak} onChange={e => setForm(f => ({ ...f, kaynak: e.target.value }))} style={baseStyles.input} placeholder="Tusdata, \u00d6SYM..." />
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
        <div style={baseStyles.cardTitle}>Son 7 G\u00fcn Soru \u00c7\u00f6z\u00fcm\u00fc</div>
        <MiniBarChart data={son7} barColor={colors.primary} />
      </div>

      {/* Kayitlar */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Soru \u00c7\u00f6z\u00fcm Kay\u0131tlar\u0131 ({data.soruCozumleri.length})</div>
        {data.soruCozumleri.length === 0 ? (
          <div style={{ color: colors.textMuted, fontSize: 13, textAlign: "center", padding: 20 }}>Hen\u00fcz soru \u00e7\u00f6z\u00fcm\u00fc eklenmedi</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={baseStyles.table}>
              <thead>
                <tr>
                  <th style={baseStyles.th}>Tarih</th>
                  <th style={baseStyles.th}>Bran\u015f</th>
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
                      <td style={baseStyles.td}><button onClick={() => sil(s.id)} style={baseStyles.deleteBtn}>\u00d7</button></td>
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
function Denemeler({ data, setData }) {
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
            <label style={baseStyles.label}>Deneme Ad\u0131</label>
            <input type="text" value={form.ad} onChange={e => setForm(f => ({ ...f, ad: e.target.value }))} style={baseStyles.input} placeholder="Deneme 1" />
          </div>
          <div>
            <label style={baseStyles.label}>Tarih</label>
            <input type="date" value={form.tarih} onChange={e => setForm(f => ({ ...f, tarih: e.target.value }))} style={baseStyles.input} />
          </div>
          <div>
            <label style={baseStyles.label}>Temel Do\u011fru</label>
            <input type="number" min={0} max={120} value={form.temelDogru} onChange={e => setForm(f => ({ ...f, temelDogru: e.target.value }))} style={baseStyles.input} placeholder="0" />
          </div>
          <div>
            <label style={baseStyles.label}>Temel Yanl\u0131\u015f</label>
            <input type="number" min={0} max={120} value={form.temelYanlis} onChange={e => setForm(f => ({ ...f, temelYanlis: e.target.value }))} style={baseStyles.input} placeholder="0" />
          </div>
          <div>
            <label style={baseStyles.label}>Klinik Do\u011fru</label>
            <input type="number" min={0} max={120} value={form.klinikDogru} onChange={e => setForm(f => ({ ...f, klinikDogru: e.target.value }))} style={baseStyles.input} placeholder="0" />
          </div>
          <div>
            <label style={baseStyles.label}>Klinik Yanl\u0131\u015f</label>
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
          <div style={baseStyles.statLabel}>En \u0130yi Net</div>
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
          <div style={{ ...baseStyles.statValue, fontSize: 24, color: "#a78bfa" }}>{data.denemeler.length}</div>
          <div style={baseStyles.statLabel}>Deneme</div>
        </div>
      </div>

      {/* Chart */}
      {lineData.length >= 2 && (
        <div style={baseStyles.card}>
          <div style={baseStyles.cardTitle}>Net \u0130lerleme Grafi\u011fi</div>
          <MiniLineChart data={lineData} color={colors.success} />
        </div>
      )}

      {/* Tablo */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Deneme Sonu\u00e7lar\u0131</div>
        {data.denemeler.length === 0 ? (
          <div style={{ color: colors.textMuted, fontSize: 13, textAlign: "center", padding: 20 }}>Hen\u00fcz deneme eklenmedi</div>
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
                    <td style={baseStyles.td}><button onClick={() => sil(d.id)} style={baseStyles.deleteBtn}>\u00d7</button></td>
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
function CalismePlani({ data, setData }) {
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
        <div style={baseStyles.cardTitle}>Haftal\u0131k Plan Ekle</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          <div>
            <label style={baseStyles.label}>G\u00fcn</label>
            <select value={form.gun} onChange={e => setForm(f => ({ ...f, gun: e.target.value }))} style={baseStyles.select}>
              {haftaGunleri.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label style={baseStyles.label}>Bran\u015f</label>
            <select value={form.bransId} onChange={e => setForm(f => ({ ...f, bransId: e.target.value }))} style={baseStyles.select}>
              <optgroup label="Temel T\u0131p">
                {temelBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
              </optgroup>
              <optgroup label="Klinik T\u0131p">
                {klinikBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
              </optgroup>
            </select>
          </div>
          <div>
            <label style={baseStyles.label}>S\u00fcre (dk)</label>
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
                  {topSure > 0 ? `${(topSure / 60).toFixed(1)} sa` : "Bo\u015f"}
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
                      <div style={{ fontSize: 10, color: colors.textMuted }}>{item.sure} dk {item.not ? `\u00b7 ${item.not}` : ""}</div>
                    </div>
                    <button onClick={() => sil(gun, item.id)} style={baseStyles.deleteBtn}>\u00d7</button>
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
function CalismaKaydi({ data, setData }) {
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

  // Son 7 gun calisma
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
  }, [data.calismaKayitlari]);

  return (
    <div>
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>\u00c7al\u0131\u015fma Kayd\u0131 Ekle</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          <div>
            <label style={baseStyles.label}>Bran\u015f</label>
            <select value={form.bransId} onChange={e => setForm(f => ({ ...f, bransId: e.target.value }))} style={baseStyles.select}>
              <optgroup label="Temel T\u0131p">
                {temelBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
              </optgroup>
              <optgroup label="Klinik T\u0131p">
                {klinikBranslar.map(b => <option key={b.id} value={b.id}>{b.icon} {b.name}</option>)}
              </optgroup>
            </select>
          </div>
          <div>
            <label style={baseStyles.label}>Tarih</label>
            <input type="date" value={form.tarih} onChange={e => setForm(f => ({ ...f, tarih: e.target.value }))} style={baseStyles.input} />
          </div>
          <div>
            <label style={baseStyles.label}>S\u00fcre (dk)</label>
            <input type="number" min={5} step={5} value={form.sure} onChange={e => setForm(f => ({ ...f, sure: e.target.value }))} style={baseStyles.input} />
          </div>
          <div>
            <label style={baseStyles.label}>Not</label>
            <input type="text" value={form.not} onChange={e => setForm(f => ({ ...f, not: e.target.value }))} style={baseStyles.input} placeholder="Konu detay\u0131..." />
          </div>
        </div>
        <div style={{ marginTop: 12, textAlign: "right" }}>
          <button onClick={ekle} style={baseStyles.btn("primary")}>Ekle</button>
        </div>
      </div>

      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Son 7 G\u00fcn \u00c7al\u0131\u015fma (saat)</div>
        <MiniBarChart data={son7} height={100} />
      </div>

      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>\u00c7al\u0131\u015fma Kay\u0131tlar\u0131 ({data.calismaKayitlari.length})</div>
        {data.calismaKayitlari.length === 0 ? (
          <div style={{ color: colors.textMuted, fontSize: 13, textAlign: "center", padding: 20 }}>Hen\u00fcz kay\u0131t yok</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={baseStyles.table}>
              <thead>
                <tr>
                  <th style={baseStyles.th}>Tarih</th>
                  <th style={baseStyles.th}>Bran\u015f</th>
                  <th style={baseStyles.th}>S\u00fcre</th>
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
                      <td style={baseStyles.td}><button onClick={() => sil(c.id)} style={baseStyles.deleteBtn}>\u00d7</button></td>
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

// --- Analiz ---
function Analiz({ data }) {
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

  return (
    <div>
      {/* Guclu/Zayif Yonler */}
      <div style={baseStyles.grid2}>
        <div style={baseStyles.card}>
          <div style={{ ...baseStyles.cardTitle, color: colors.success }}>En G\u00fc\u00e7l\u00fc Bran\u015flar</div>
          {enGuclu.length === 0 ? (
            <div style={{ color: colors.textMuted, fontSize: 13 }}>En az 10 soru \u00e7\u00f6z\u00fclm\u00fc\u015f bran\u015f gerekli</div>
          ) : enGuclu.map((b, i) => (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "8px 10px", background: colors.inputBg, borderRadius: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: colors.success, width: 24 }}>#{i + 1}</span>
              <span style={{ fontSize: 16 }}>{b.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{b.name}</div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>{b.topSoru} soru \u00b7 {b.net.toFixed(1)} net</div>
              </div>
              <span style={{ fontWeight: 700, color: colors.success }}>%{b.basari.toFixed(0)}</span>
            </div>
          ))}
        </div>
        <div style={baseStyles.card}>
          <div style={{ ...baseStyles.cardTitle, color: colors.danger }}>En Zay\u0131f Bran\u015flar</div>
          {enZayif.length === 0 ? (
            <div style={{ color: colors.textMuted, fontSize: 13 }}>En az 10 soru \u00e7\u00f6z\u00fclm\u00fc\u015f bran\u015f gerekli</div>
          ) : enZayif.map((b, i) => (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "8px 10px", background: colors.inputBg, borderRadius: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: colors.danger, width: 24 }}>#{i + 1}</span>
              <span style={{ fontSize: 16 }}>{b.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{b.name}</div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>{b.topSoru} soru \u00b7 {b.net.toFixed(1)} net</div>
              </div>
              <span style={{ fontWeight: 700, color: colors.danger }}>%{b.basari.toFixed(0)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brans Detay */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Bran\u015f Bazl\u0131 Detayl\u0131 Analiz</div>
        {bransAnaliz.length === 0 ? (
          <div style={{ color: colors.textMuted, fontSize: 13, textAlign: "center", padding: 20 }}>Soru \u00e7\u00f6z\u00fcm\u00fc veya \u00e7al\u0131\u015fma kayd\u0131 ekledikten sonra analiz g\u00f6r\u00fcnecektir</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={baseStyles.table}>
              <thead>
                <tr>
                  <th style={baseStyles.th}>Bran\u015f</th>
                  <th style={baseStyles.th}>Soru</th>
                  <th style={baseStyles.th}>D/Y/B</th>
                  <th style={baseStyles.th}>Net</th>
                  <th style={baseStyles.th}>Ba\u015far\u0131</th>
                  <th style={baseStyles.th}>\u00c7al\u0131\u015fma</th>
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
          <div style={baseStyles.cardTitle}>Alt Konu Bazl\u0131 Analiz</div>
          <div style={{ overflowX: "auto" }}>
            <table style={baseStyles.table}>
              <thead>
                <tr>
                  <th style={baseStyles.th}>Bran\u015f</th>
                  <th style={baseStyles.th}>Konu</th>
                  <th style={baseStyles.th}>Soru</th>
                  <th style={baseStyles.th}>Net</th>
                  <th style={baseStyles.th}>Ba\u015far\u0131</th>
                  <th style={baseStyles.th}>Ort. S\u0131nav</th>
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
          <div style={{ ...baseStyles.cardTitle, color: colors.warning }}>Hen\u00fcz Soru \u00c7\u00f6z\u00fclmeyen Bran\u015flar</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {hicCozulmeyenler.map(b => (
              <span key={b.id} style={{ ...baseStyles.badge(colors.warning), padding: "4px 10px", fontSize: 12 }}>{b.icon} {b.name}</span>
            ))}
          </div>
        </div>
      )}

      {/* Temel vs Klinik karsilastirma */}
      <div style={baseStyles.card}>
        <div style={baseStyles.cardTitle}>Temel T\u0131p vs Klinik T\u0131p</div>
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
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.temel, marginBottom: 8 }}>Temel T\u0131p</div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>{tS > 0 ? ((tD / tS) * 100).toFixed(0) : 0}%</div>
                <div style={{ fontSize: 12, color: colors.textMuted }}>{tS} soru \u00b7 {hesaplaNet(tD, tY).toFixed(1)} net</div>
              </div>
              <div style={{ textAlign: "center", padding: 16, borderRadius: 8, background: colors.klinik + "15" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.klinik, marginBottom: 8 }}>Klinik T\u0131p</div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>{kS > 0 ? ((kD / kS) * 100).toFixed(0) : 0}%</div>
                <div style={{ fontSize: 12, color: colors.textMuted }}>{kS} soru \u00b7 {hesaplaNet(kD, kY).toFixed(1)} net</div>
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
  { id: "dashboard", label: "Genel Bak\u0131\u015f" },
  { id: "konular", label: "Konu Takibi" },
  { id: "dagilim", label: "Soru Da\u011f\u0131l\u0131m\u0131" },
  { id: "sorular", label: "Soru \u00c7\u00f6z\u00fcm\u00fc" },
  { id: "denemeler", label: "Denemeler" },
  { id: "plan", label: "\u00c7al\u0131\u015fma Plan\u0131" },
  { id: "kayit", label: "\u00c7al\u0131\u015fma Kayd\u0131" },
  { id: "analiz", label: "Analiz" },
];

export default function TusTakip() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setDataRaw] = useState(() => loadData() || defaultData());

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

    // Migrate old brans-level konuDurumlari to subtopic level where applicable
    const kd = { ...d.konuDurumlari };
    tumBranslar.forEach(b => {
      if (b.konular && b.konular.length > 0 && kd[b.id] && kd[b.id] !== "baslanmadi") {
        // If old brans-level status exists, propagate to all subtopics that don't have a status yet
        const oldStatus = kd[b.id];
        b.konular.forEach(k => {
          const key = `${b.id}_${k.name}`;
          if (!kd[key]) {
            kd[key] = oldStatus;
            needs = true;
          }
        });
        // Remove old brans-level key
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
    if (confirm("T\u00fcm veriler silinecek. Emin misiniz?")) {
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
              <p style={baseStyles.subtitle}>T\u0131pta Uzmanl\u0131k S\u0131nav\u0131 Haz\u0131rl\u0131k Takip Sistemi</p>
            </div>
            <button onClick={resetData} style={{ ...baseStyles.btn("ghost"), fontSize: 11, opacity: 0.5 }}>S\u0131f\u0131rla</button>
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
        {activeTab === "dashboard" && <Dashboard data={data} setData={setData} />}
        {activeTab === "konular" && <KonuTakibi data={data} setData={setData} />}
        {activeTab === "dagilim" && <SoruDagilimi />}
        {activeTab === "sorular" && <SoruCozumu data={data} setData={setData} />}
        {activeTab === "denemeler" && <Denemeler data={data} setData={setData} />}
        {activeTab === "plan" && <CalismePlani data={data} setData={setData} />}
        {activeTab === "kayit" && <CalismaKaydi data={data} setData={setData} />}
        {activeTab === "analiz" && <Analiz data={data} />}
      </main>
    </div>
  );
}
