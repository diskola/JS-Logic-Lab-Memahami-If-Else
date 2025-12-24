
import { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'voting',
    title: 'Cek Kelayakan Memilih',
    description: 'Menentukan apakah seseorang sudah cukup umur (17 tahun) untuk mengikuti Pemilu.',
    variableName: 'umur',
    inputType: 'number',
    defaultValue: 18,
    placeholder: 'Masukkan umur (misal: 17)'
  },
  {
    id: 'grading',
    title: 'Sistem Penilaian',
    description: 'Mengkonversi nilai angka menjadi predikat (Lulus atau Tidak Lulus).',
    variableName: 'nilai',
    inputType: 'number',
    defaultValue: 80,
    placeholder: 'Masukkan nilai (0-100)'
  },
  {
    id: 'weather',
    title: 'Rekomendasi Pakaian',
    description: 'Memberikan saran pakaian berdasarkan kondisi cuaca.',
    variableName: 'cuaca',
    inputType: 'text',
    defaultValue: 'hujan',
    placeholder: 'Ketik "hujan" atau "cerah"'
  },
  {
    id: 'shopping',
    title: 'Diskon Belanja',
    description: 'Menggunakan operator ">" untuk memberikan hadiah hanya jika belanja lebih dari 100rb.',
    variableName: 'total',
    inputType: 'number',
    defaultValue: 150000,
    placeholder: 'Masukkan total belanja (Rp)'
  }
];
