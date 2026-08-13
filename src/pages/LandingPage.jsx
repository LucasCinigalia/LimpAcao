import React from 'react';
import { Button } from '../atoms';

export function LandingPage({ onLoginClick }) {
  const images = [
    // Pessoas juntas limpando lixo em mutirões — fotos diretas do Unsplash
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&h=450&fit=crop&q=80',
    'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=700&h=450&fit=crop&q=80',
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=700&h=450&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610093674388-cee0337f2684?w=700&h=450&fit=crop&q=80',
  ];

  const placeholders = [
    `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='1400' height='900'><rect width='100%' height='100%' fill='%23ecfdf5'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='36' fill='%23206a3b'>Mutirão de Limpeza</text></svg>`)}`,
    `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='1400' height='900'><rect width='100%' height='100%' fill='%23f0f9ff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='36' fill='%23004561'>Coleta na Praia</text></svg>`)}`,
    `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='1400' height='900'><rect width='100%' height='100%' fill='%23fff7ed'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='36' fill='%233a2700'>Voluntários</text></svg>`)}`,
    `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='1400' height='900'><rect width='100%' height='100%' fill='%23f0fdf4'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='36' fill='%230f5132'>Reciclagem Comunitária</text></svg>`)}`,
  ];

  return (
    <>
      {/* Header público — visível apenas para visitantes não logados */}
      {onLoginClick && (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-2 rounded-xl shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L4 6v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V6l-8-4z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900">LimpAção</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onLoginClick('login')}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Entrar
              </button>
              <button
                onClick={() => onLoginClick('register')}
                className="rounded-full px-4 py-2 text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm transition-colors"
              >
                Cadastre-se
              </button>
            </div>
          </div>
        </header>
      )}

      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Juntos por uma Florianópolis mais limpa
            </h1>
            <p className="text-lg text-slate-600 mb-6">
              Conheça os projetos e ações que fazemos para recolher resíduos, conscientizar a população e revitalizar nossas praias e áreas verdes.
            </p>
            <div className="flex gap-4">
              <Button variant="primary" size="lg" onClick={() => onLoginClick && onLoginClick('register')}>Participe de um mutirão</Button>
              <Button variant="secondary" size="lg">Saiba mais</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {images.map((src, idx) => (
              <div key={src} className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  loading="lazy"
                  src={src}
                  alt={`Projeto ${idx + 1}`}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholders[idx]; }}
                  className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Nossos projetos recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="glass-panel p-5">
              <h3 className="font-semibold text-lg mb-2">Mutirão Praia Limpa</h3>
              <p className="text-sm text-slate-600">Reunimos voluntários para a limpeza de praias e coleta seletiva de resíduos.</p>
            </article>

            <article className="glass-panel p-5">
              <h3 className="font-semibold text-lg mb-2">Educação Ambiental</h3>
              <p className="text-sm text-slate-600">Ações educativas em escolas e comunidades sobre descarte correto.</p>
            </article>

            <article className="glass-panel p-5">
              <h3 className="font-semibold text-lg mb-2">Reciclagem Comunitária</h3>
              <p className="text-sm text-slate-600">Parcerias com cooperativas locais para destinação dos materiais coletados.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default LandingPage;
