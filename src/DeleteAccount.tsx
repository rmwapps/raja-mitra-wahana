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
    <>
      <header className="header">
        <a className="brand" href="/">
          <img className="brand-logo" src="/logo.png" alt="RMW Indonesia" />
          <span>RMW Indonesia</span>
        </a>
      </header>
      
      <main style={{ background: '#f7f9f7', minHeight: 'calc(100vh - 82px)', padding: '60px max(5vw, 28px)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#8b2aff', fontWeight: 600, fontSize: '14px', marginBottom: '32px' }}>
            <ArrowLeft size={18} /> Kembali ke Beranda
          </a>
          
          <div style={{ background: '#fff', borderRadius: '4px', padding: 'clamp(28px, 5vw, 48px)', boxShadow: '0 4px 20px rgba(42, 0, 85, 0.08)' }}>
            <div style={{ borderBottom: '2px solid #8b2aff', paddingBottom: '24px', marginBottom: '32px' }}>
              <div className="eyebrow" style={{ marginBottom: '12px' }}>PENGELOLAAN AKUN</div>
              <h1 style={{ fontFamily: 'Manrope', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#2a0055', margin: 0 }}>
                RMW Indonesia | <span style={{ color: '#8b2aff' }}>Hapus Akun</span>
              </h1>
              <p style={{ color: '#637477', fontSize: '15px', marginTop: '12px', marginBottom: 0 }}>Permintaan penghapusan akun akan diproses dalam 30 hari</p>
            </div>

            {error && (
              <div style={{ padding: '16px 20px', background: '#fef0f0', border: '1px solid #e74c3c', borderRadius: '4px', marginBottom: '24px', color: '#c0392b', fontSize: '14px' }}>
                {error}
              </div>
            )}

            {step === 1 && (
              <div>
                <div style={{ background: '#f1f5f1', borderRadius: '4px', padding: '24px', marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: 'Manrope', fontSize: '18px', fontWeight: 700, color: '#2a0055', marginTop: 0, marginBottom: '16px' }}>Proses Penghapusan Akun</h3>
                  <ol style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#637477', margin: 0, fontSize: '14px' }}>
                    <li>Verifikasi identitas dengan nomor HP dan PIN</li>
                    <li>Konfirmasi dengan kode OTP</li>
                    <li>Akun Anda masuk antrian penghapusan selama <strong style={{ color: '#2a0055' }}>30 hari</strong></li>
                    <li>Setelah 30 hari, data Anda dihapus permanen</li>
                  </ol>
                </div>

                <div style={{ background: '#f0f7ff', border: '1px solid #3498db', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: 'Manrope', fontSize: '15px', fontWeight: 700, color: '#2c3e50', marginTop: 0, marginBottom: '12px' }}>Data yang Dihapus</h3>
                  <ul style={{ paddingLeft: '20px', lineHeight: '1.7', color: '#34495e', margin: 0, fontSize: '13px' }}>
                    <li>Informasi profil dan akun pengguna</li>
                    <li>Riwayat transaksi dan aktivitas</li>
                    <li>Saldo dan poin reward</li>
                    <li>Preferensi dan pengaturan aplikasi</li>
                  </ul>
                </div>

                <div style={{ background: '#fffbf0', border: '1px solid #f39c12', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: 'Manrope', fontSize: '15px', fontWeight: 700, color: '#7d6608', marginTop: 0, marginBottom: '12px' }}>Data yang Dipertahankan</h3>
                  <p style={{ margin: 0, lineHeight: '1.7', color: '#7d6608', fontSize: '13px' }}>Sesuai peraturan perpajakan dan hukum yang berlaku, data transaksi keuangan tertentu akan disimpan untuk keperluan audit dan pelaporan pajak selama periode yang diwajibkan (umumnya 5-10 tahun).</p>
                </div>

                <div style={{ background: '#fff9e6', border: '1px solid #e67e22', borderRadius: '4px', padding: '18px', marginBottom: '28px' }}>
                  <strong style={{ color: '#d35400', fontSize: '14px' }}>⚠️ Perhatian:</strong>
                  <p style={{ margin: '8px 0 0 0', color: '#d35400', fontSize: '13px', lineHeight: '1.6' }}>Penghapusan akun bersifat permanen. Setelah 30 hari masa tunggu, data pribadi Anda tidak dapat dipulihkan kembali.</p>
                </div>

                <p style={{ color: '#637477', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>Untuk melanjutkan permintaan penghapusan akun, klik tombol di bawah untuk memulai verifikasi.</p>
                
                <button onClick={getCookie} disabled={loading} className="primary" style={{ width: '100%', justifyContent: 'center', fontSize: '15px' }}>
                  {loading ? 'Memuat...' : 'Mulai Verifikasi'}
                </button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={login}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#2a0055', fontSize: '14px' }}>Nomor HP</label>
                  <input 
                    type="text" 
                    value={hp} 
                    onChange={(e) => setHp(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '14px 16px', border: '1px solid #cbd5d1', borderRadius: '4px', fontSize: '15px', fontFamily: 'DM Sans', color: '#2a0055' }} 
                    placeholder="08xxxxxxxxxx" 
                  />
                </div>
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#2a0055', fontSize: '14px' }}>PIN</label>
                  <input 
                    type="password" 
                    value={pin} 
                    onChange={(e) => setPin(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '14px 16px', border: '1px solid #cbd5d1', borderRadius: '4px', fontSize: '15px', fontFamily: 'DM Sans', color: '#2a0055' }} 
                  />
                </div>
                <button type="submit" disabled={loading} className="primary" style={{ width: '100%', justifyContent: 'center', fontSize: '15px' }}>
                  {loading ? 'Memproses...' : 'Login'}
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={verify}>
                <p style={{ marginBottom: '20px', color: '#637477', fontSize: '14px' }}>Kode OTP telah dikirim. Masukkan kode untuk melanjutkan.</p>
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#2a0055', fontSize: '14px' }}>Kode OTP</label>
                  <input 
                    type="text" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '14px 16px', border: '1px solid #cbd5d1', borderRadius: '4px', fontSize: '15px', fontFamily: 'DM Sans', color: '#2a0055' }} 
                    placeholder="123456" 
                  />
                </div>
                <button type="submit" disabled={loading} className="primary" style={{ width: '100%', justifyContent: 'center', fontSize: '15px' }}>
                  {loading ? 'Memverifikasi...' : 'Verifikasi'}
                </button>
              </form>
            )}

            {step === 4 && userData && (
              <div>
                <div style={{ background: '#e8f8f5', border: '2px solid #27ae60', borderRadius: '4px', padding: '20px', marginBottom: '24px' }}>
                  <strong style={{ color: '#1e8449', fontSize: '16px', fontFamily: 'Manrope' }}>✓ Verifikasi Berhasil</strong>
                  <p style={{ margin: '8px 0 0 0', color: '#1e8449', fontSize: '14px', lineHeight: '1.6' }}>Identitas Anda telah diverifikasi. Lanjutkan ke customer service untuk mengajukan penghapusan akun.</p>
                </div>

                <div style={{ background: '#f8f9f7', borderRadius: '4px', padding: '24px', marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: 'Manrope', fontSize: '17px', fontWeight: 700, color: '#2a0055', marginTop: 0, marginBottom: '12px' }}>Data Akun Anda</h3>
                  <div style={{ marginBottom: '10px', fontSize: '14px', color: '#637477' }}>
                    <strong style={{ color: '#2a0055' }}>ID:</strong> {userData.username}
                  </div>
                  <div style={{ fontSize: '14px', color: '#637477' }}>
                    <strong style={{ color: '#2a0055' }}>Nama:</strong> {userData.nama}
                  </div>
                </div>

                <div style={{ background: '#f1f5f1', borderRadius: '4px', padding: '24px', marginBottom: '28px' }}>
                  <h3 style={{ fontFamily: 'Manrope', fontSize: '17px', fontWeight: 700, color: '#2a0055', marginTop: 0, marginBottom: '14px' }}>Apa yang Terjadi Selanjutnya?</h3>
                  <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#637477', margin: 0, fontSize: '14px' }}>
                    <li>Hubungi CS dengan data di atas untuk konfirmasi penghapusan</li>
                    <li>Setelah dikonfirmasi, akun masuk antrian penghapusan selama 30 hari</li>
                    <li>Selama periode 30 hari, Anda dapat membatalkan permintaan</li>
                    <li>Setelah 30 hari, data pribadi dihapus permanen (data pajak tetap tersimpan)</li>
                  </ul>
                </div>

                <p style={{ color: '#637477', fontSize: '14px', marginBottom: '20px' }}>Hubungi customer service untuk melanjutkan permintaan penghapusan akun. Setelah dikonfirmasi, akun akan diproses dalam 30 hari.</p>
                
                <a 
                  href={`https://wa.me/628117000123?text=Saya%20ingin%20mengajukan%20penghapusan%20akun%20dengan%20ID%20${userData.username}`}
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px 20px', background: '#25D366', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '15px', transition: '.2s' }}
                >
                  Hubungi Customer Service
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
