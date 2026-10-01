import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function DeleteAccount() {
  const [step, setStep] = useState(1);
  const [cookie, setCookie] = useState('');
  const [hp, setHp] = useState('');
  const [pin, setPin] = useState('');
  const [uid, setUid] = useState('');
  const [otp, setOtp] = useState('');
  const [userData, setUserData] = useState<{ username: string; nama: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getCookie = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/rmw-cookie');
      const data = await res.json();
      setCookie(data.cookie);
      setStep(2);
    } catch (e) {
      setError('Gagal mengambil sesi');
    } finally {
      setLoading(false);
    }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/rmw-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hp, pin, cookie })
      });
      if (!res.ok) throw new Error('Login gagal');
      const data = await res.json();
      setUid(data.uid);
      await requestOtp(data.uid);
    } catch (e) {
      setError('Login gagal, cek nomor HP dan PIN');
    } finally {
      setLoading(false);
    }
  };

  const requestOtp = async (u: string) => {
    try {
      const res = await fetch('/api/rmw-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: u, cookie })
      });
      if (!res.ok) throw new Error('OTP gagal');
      setStep(3);
    } catch (e) {
      setError('Gagal mengirim OTP');
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/rmw-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, otp, cookie })
      });
      if (!res.ok) throw new Error('Verifikasi gagal');
      const data = await res.json();
      setUserData(data);
      setStep(4);
    } catch (e) {
      setError('Kode OTP salah atau kadaluarsa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#667eea', textDecoration: 'none', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          <ArrowLeft size={18} /> Kembali
        </a>
        
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>RMW Indonesia | Hapus Akun</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Permintaan penghapusan akun akan diproses dalam 30 hari</p>

        {error && (
          <div style={{ padding: '1rem', background: '#fee', borderRadius: '8px', marginBottom: '1rem', color: '#c33' }}>
            {error}
          </div>
        )}

        {step === 1 && (
          <div>
            <div style={{ padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Proses Penghapusan Akun</h3>
              <ol style={{ paddingLeft: '1.25rem', lineHeight: '1.8', color: '#555' }}>
                <li>Verifikasi identitas dengan nomor HP dan PIN</li>
                <li>Konfirmasi dengan kode OTP</li>
                <li>Akun Anda masuk antrian penghapusan selama <strong>30 hari</strong></li>
                <li>Setelah 30 hari, data Anda dihapus permanen</li>
              </ol>
            </div>
            <div style={{ padding: '1.5rem', background: '#e8f4fd', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #0288d1' }}>
              <h3 style={{ marginBottom: '0.75rem', fontSize: '1rem', color: '#01579b' }}>Data yang Dihapus</h3>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.7', color: '#01579b', margin: 0 }}>
                <li>Informasi profil dan akun pengguna</li>
                <li>Riwayat transaksi dan aktivitas</li>
                <li>Saldo dan poin reward</li>
                <li>Preferensi dan pengaturan aplikasi</li>
              </ul>
            </div>
            <div style={{ padding: '1.5rem', background: '#fff9e6', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #ff9800' }}>
              <h3 style={{ marginBottom: '0.75rem', fontSize: '1rem', color: '#e65100' }}>Data yang Dipertahankan</h3>
              <p style={{ margin: 0, lineHeight: '1.7', color: '#e65100', fontSize: '0.95rem' }}>Sesuai peraturan perpajakan dan hukum yang berlaku, data transaksi keuangan tertentu akan disimpan untuk keperluan audit dan pelaporan pajak selama periode yang diwajibkan (umumnya 5-10 tahun).</p>
            </div>
            <div style={{ padding: '1rem', background: '#fff3cd', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #ffc107' }}>
              <strong style={{ color: '#856404' }}>⚠️ Perhatian:</strong>
              <p style={{ margin: '0.5rem 0 0 0', color: '#856404', fontSize: '0.95rem' }}>Penghapusan akun bersifat permanen. Setelah 30 hari masa tunggu, data pribadi Anda tidak dapat dipulihkan kembali.</p>
            </div>
            <p style={{ marginBottom: '1.5rem', color: '#666' }}>Untuk melanjutkan permintaan penghapusan akun, klik tombol di bawah untuk memulai verifikasi.</p>
            <button onClick={getCookie} disabled={loading} style={{ width: '100%', padding: '1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: 500 }}>
              {loading ? 'Memuat...' : 'Mulai Verifikasi'}
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={login}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Nomor HP</label>
              <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem' }} placeholder="08xxxxxxxxxx" />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>PIN</label>
              <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem' }} />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}>
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={verify}>
            <p style={{ marginBottom: '1rem', color: '#666' }}>Kode OTP telah dikirim. Masukkan kode untuk melanjutkan.</p>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Kode OTP</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem' }} placeholder="123456" />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}>
              {loading ? 'Memverifikasi...' : 'Verifikasi'}
            </button>
          </form>
        )}

        {step === 4 && userData && (
          <div>
            <div style={{ padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Data Akun Anda</h3>
              <div style={{ marginBottom: '0.5rem' }}><strong>ID:</strong> {userData.username}</div>
              <div><strong>Nama:</strong> {userData.nama}</div>
            </div>
            <div style={{ padding: '1.5rem', background: '#d4edda', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #28a745' }}>
              <strong style={{ color: '#155724' }}>✓ Verifikasi Berhasil</strong>
              <p style={{ margin: '0.5rem 0 0 0', color: '#155724', fontSize: '0.95rem' }}>Permintaan penghapusan akun Anda telah diterima dan akan diproses dalam <strong>30 hari kerja</strong>.</p>
            </div>
            <div style={{ padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #dee2e6' }}>
              <h3 style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>Apa yang Terjadi Selanjutnya?</h3>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', color: '#555', margin: 0 }}>
                <li>Akun Anda masuk dalam antrian penghapusan selama 30 hari</li>
                <li>Selama periode ini, Anda dapat membatalkan permintaan dengan menghubungi CS</li>
                <li>Setelah 30 hari, data pribadi Anda akan dihapus secara permanen</li>
                <li>Data keuangan untuk keperluan pajak tetap disimpan sesuai peraturan</li>
              </ul>
            </div>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>Untuk membatalkan atau konfirmasi penghapusan akun, hubungi customer service kami.</p>
            <a href="https://wa.me/628117000123?text=Saya%20ingin%20mengajukan%20penghapusan%20akun%20dengan%20ID%20" target="_blank" rel="noreferrer" style={{ display: 'block', textAlign: 'center', padding: '1rem', background: '#25D366', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 500 }}>
              Hubungi Customer Service
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
