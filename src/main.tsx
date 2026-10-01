import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Check,
  Clock3,
  Headphones,
  Menu,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  X,
  Zap,
} from "lucide-react";
import "./styles.css";
import DeleteAccount from "./DeleteAccount";

const products = [
  "Pulsa & Data",
  "Token PLN",
  "E-Wallet",
  "Voucher Game",
  "Tagihan",
  "Produk Digital",
];
const benefits = [
  [
    "Kompetitif & Stabil",
    "Harga modal kompetitif dan stabil, bukan promo sesaat.",
    Zap,
  ],
  [
    "Pelopor Inovasi",
    "Transaksi multi-platform via WhatsApp, Telegram, Android, dan lainnya.",
    Smartphone,
  ],
  [
    "Berkualitas",
    "Kualitas dan kenyamanan transaksi terbaik dengan pelayanan prima.",
    ShieldCheck,
  ],
  [
    "Support 7/24 Jam",
    "Layanan support maksimal untuk seluruh mitra.",
    Headphones,
  ],
];

function App() {
  const [open, setOpen] = useState(false);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <>
      <header className="header">
        <a className="brand" href="#top" onClick={() => scrollTo("top")}>
          <img className="brand-logo" src="/logo.png" alt="RMW Indonesia" />
          <span>RMW Indonesia</span>
        </a>
        <button
          className="menu-button"
          aria-label="Buka navigasi"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "nav open" : "nav"}>
          <button onClick={() => scrollTo("top")}>Beranda</button>
          <button onClick={() => scrollTo("about")}>Tentang Kami</button>
          <button onClick={() => scrollTo("benefits")}>Keunggulan</button>
          <button onClick={() => scrollTo("faq")}>Panduan</button>
          <a
            className="nav-cta"
            href="https://wa.me/628117000123"
            target="_blank"
            rel="noreferrer"
          >
            Hubungi Kami <ArrowRight size={16} />
          </a>
        </nav>
      </header>
      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">MITRA BISNIS DIGITAL TERPERCAYA</div>
            <h1>
              Mudahkan Hidup,
              <br />
              <em>Mulai Ciptakan</em>
              <br />
              Bisnismu.
            </h1>
            <p>
              Solusi transaksi digital lengkap untuk mengembangkan bisnis Anda.
              Harga kompetitif, layanan berkualitas, dan support yang selalu
              siap membantu.
            </p>
            <div className="actions">
              <a
                className="primary"
                href="https://wa.me/628117000123"
                target="_blank"
                rel="noreferrer"
              >
                Daftar Sekarang <ArrowRight size={18} />
              </a>
              <button className="secondary" onClick={() => scrollTo("about")}>
                Pelajari Lebih Lanjut
              </button>
            </div>
            <div className="hero-proof">
              <span>
                <Check size={15} /> 1.000+ Produk
              </span>
              <span>
                <Check size={15} /> Support 24/7
              </span>
              <span>
                <Check size={15} /> Terpercaya
              </span>
            </div>
          </div>
          <div className="hero-art">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <img
              className="hero-phone"
              src="/hero.png"
              alt="Aplikasi Zona Loket pada smartphone"
            />
          </div>
        </section>
        <section className="strip">
          <div>
            <strong>1.000+</strong>
            <span>Produk & layanan</span>
          </div>
          <div>
            <strong>100+</strong>
            <span>Platform konsumen</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Customer support</span>
          </div>
          <div>
            <strong>99%</strong>
            <span>Tingkat kepuasan</span>
          </div>
        </section>
        <section className="section about" id="about">
          <div className="section-label">TENTANG KAMI</div>
          <div className="two-col">
            <div>
              <h2>
                Satu platform.
                <br />
                <em>Banyak peluang.</em>
              </h2>
            </div>
            <div>
              <p>
                RMW Indonesia hadir untuk membantu Anda membangun bisnis digital
                yang mudah, cepat, dan menguntungkan. Kami konsisten melayani
                dengan kualitas terbaik serta menghadirkan inovasi terbaru untuk
                para mitra.
              </p>
              <p className="muted">
                Mulai dari pulsa, data, pembayaran tagihan, hingga voucher
                game—semua kebutuhan transaksi Anda tersedia dalam satu
                platform.
              </p>
              <button
                className="text-button"
                onClick={() => scrollTo("benefits")}
              >
                Kenali keunggulan kami <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
        <section className="section benefits" id="benefits">
          <div className="section-label">KENAPA KAMI</div>
          <h2>
            Dirancang untuk membuat
            <br />
            <em>bisnis Anda berkembang.</em>
          </h2>
          <div className="benefit-grid">
            {benefits.map(([title, desc, Icon]) => (
              <article className="benefit" key={title as string}>
                <div className="icon">
                  <Icon size={21} />
                </div>
                <h3>{title as string}</h3>
                <p>{desc as string}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="products">
          <div>
            <div className="section-label light">SEMUA YANG ANDA BUTUHKAN</div>
            <h2>
              Lengkap. Mudah.
              <br />
              <em>Menguntungkan.</em>
            </h2>
            <p>
              Beragam produk digital dengan harga terbaik untuk mendukung
              pertumbuhan bisnis Anda.
            </p>
            <a
              className="light-button"
              href="https://wa.me/628117000123"
              target="_blank"
              rel="noreferrer"
            >
              Mulai Sekarang <ArrowRight size={17} />
            </a>
          </div>
          <div className="product-list">
            {products.map((x, i) => (
              <div key={x}>
                <span>0{i + 1}</span>
                <b>{x}</b>
                <ArrowRight size={17} />
              </div>
            ))}
          </div>
        </section>
        <section className="steps section">
          <div className="section-label">CARA MEMULAI</div>
          <h2>
            Tiga langkah menuju
            <br />
            <em>bisnis yang lebih baik.</em>
          </h2>
          <div className="step-grid">
            {[
              [
                "01",
                "Registrasi",
                "Daftarkan diri Anda dan lengkapi data dengan mudah.",
              ],
              ["02", "Deposit", "Isi saldo sesuai kebutuhan bisnis Anda."],
              [
                "03",
                "Transaksi",
                "Mulai layani pelanggan dan raih keuntungan.",
              ],
            ].map(([n, t, d]) => (
              <div className="step" key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="faq section" id="faq">
          <div>
            <div className="section-label">BANTUAN</div>
            <h2>
              Masih punya
              <br />
              <em>pertanyaan?</em>
            </h2>
            <p>
              Tim kami siap membantu Anda memulai perjalanan bisnis digital.
            </p>
            <a
              className="primary"
              href="https://wa.me/628126781576"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} /> Chat dengan kami
            </a>
          </div>
          <div className="faq-list">
            <details open>
              <summary>Bagaimana cara menjadi mitra?</summary>
              <p>
                Hubungi customer service kami, lakukan registrasi, lalu isi
                deposit untuk mulai bertransaksi.
              </p>
            </details>
            <details>
              <summary>Berapa lama proses deposit?</summary>
              <p>
                Deposit otomatis diproses dalam waktu kurang dari 5 menit
                setelah pembayaran terverifikasi.
              </p>
            </details>
            <details>
              <summary>Apakah ada biaya pendaftaran?</summary>
              <p>
                Daftar menjadi mitra tanpa biaya. Tim kami akan membantu Anda
                memilih paket yang sesuai.
              </p>
            </details>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-brand">
          <img className="brand-logo" src="/logo.png" alt="RMW Indonesia" />
          <b>PT Relasi Mahakarya Wijaya</b>
        </div>
        <div>
          <small>HUBUNGI KAMI</small>
          <p>
            Jl. Jhoni Anwar No. 37B, Padang
            <br />
            Sumatera Barat, Indonesia
          </p>
          <a href="mailto:admin@relasimitra.com">admin@relasimitra.com</a>
        </div>
        <div>
          <small>NAVIGASI</small>
          <button onClick={() => scrollTo("about")}>Tentang Kami</button>
          <button onClick={() => scrollTo("benefits")}>Keunggulan</button>
          <a href="https://wa.me/628126781576" target="_blank" rel="noopener noreferrer">Bantuan</a>
        </div>
        <div className="copyright">© 2026 RMW · RMW Indonesia</div>
      </footer>
    </>
  );
}

const Root = () => {
  const path = window.location.pathname;
  if (path === '/delete-account') return <DeleteAccount />;
  return <App />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
