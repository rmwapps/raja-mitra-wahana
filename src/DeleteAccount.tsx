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
        
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Hapus Akun</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Proses penghapusan akun RMW Indonesia</p>

        {error && (
          <div style={{ padding: '1rem', background: '#fee', borderRadius: '8px', marginBottom: '1rem', color: '#c33' }}>
            {error}
          </div>
        )}

        {step === 1 && (
          <div>
            <p style={{ marginBottom: '1.5rem' }}>Untuk melanjutkan, klik tombol di bawah untuk memulai sesi.</p>
            <button onClick={getCookie} disabled={loading} style={{ width: '100%', padding: '1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}>
              {loading ? 'Memuat...' : 'Mulai'}
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
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>Untuk menghapus akun, hubungi customer service kami.</p>
            <a href="https://wa.me/628117000123" target="_blank" rel="noreferrer" style={{ display: 'block', textAlign: 'center', padding: '1rem', background: '#25D366', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 500 }}>
              Hubungi Customer Service
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
