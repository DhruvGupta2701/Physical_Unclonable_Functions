import { ViewType } from '../types';

interface OverviewProps {
  onViewChange: (v: ViewType) => void;
}

const CARDS = [
  {
    icon: '⬡',
    title: 'Physical Unclonable Function',
    body: 'PUFs exploit manufacturing variations to create unique hardware fingerprints. The XOR Arbiter PUF uses k chained delay circuits whose XOR response resists simple cloning.',
    accent: '#4cd6ff',
  },
  {
    icon: '⚙',
    title: 'Linear Additive Delay Model',
    body: 'Each challenge is transformed into a φ feature vector via cumulative-product parity mapping. This enables linear models to approximate the PUF delay differences directly.',
    accent: '#dab9ff',
  },
  {
    icon: '⚡',
    title: 'ML Modelling Attack',
    body: 'Given enough Challenge-Response Pairs (CRPs), logistic regression or MLP classifiers can clone the PUF behaviour with high accuracy — posing a real security threat.',
    accent: '#45f4df',
  },
];

const METRICS = [
  { label: 'k=1 (Single Arbiter)', lr: '≥99%', mlp: '≥99%', risk: 'Critical' },
  { label: 'k=2 (2-XOR)', lr: '~50%', mlp: '~97%', risk: 'High' },
  { label: 'k=3 (3-XOR)', lr: '~50%', mlp: '~85%', risk: 'Moderate' },
  { label: 'k=4 (4-XOR)', lr: '~50%', mlp: '~65%', risk: 'Low' },
];

export default function Overview({ onViewChange }: OverviewProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden p-10"
        style={{ background: 'linear-gradient(135deg, rgba(76,214,255,0.08) 0%, rgba(218,185,255,0.06) 100%)', border: '1px solid rgba(76,214,255,0.15)' }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10"
          style={{ background: '#4cd6ff', transform: 'translate(30%, -30%)' }} />
        <p className="text-xs font-mono tracking-[0.3em] mb-3" style={{ color: '#4cd6ff' }}>SECURITY RESEARCH TOOL</p>
        <h2 className="font-headline text-4xl font-bold mb-4 leading-tight" style={{ color: '#e1e2eb' }}>
          XOR Arbiter PUF<br />
          <span style={{ color: '#4cd6ff' }}>ML Attack Simulator</span>
        </h2>
        <p className="text-base max-w-xl leading-relaxed mb-8" style={{ color: '#bbc9cf' }}>
          Simulate physical hardware security primitives, generate Challenge-Response Pair datasets, and evaluate how machine-learning attacks break them — all in your browser.
        </p>
        <button
          onClick={() => onViewChange('CONFIGURATION')}
          className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, #4cd6ff, #00a8cc)', color: '#001f28', boxShadow: '0 0 20px rgba(76,214,255,0.3)' }}>
          Start Experiment →
        </button>
      </div>

      {/* Concept cards */}
      <div className="grid grid-cols-3 gap-5">
        {CARDS.map(({ icon, title, body, accent }) => (
          <div key={title} className="rounded-xl p-6 transition-all duration-200 hover:translate-y-[-2px]"
            style={{ background: 'rgba(29,32,38,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-2xl mb-4" style={{ color: accent }}>{icon}</div>
            <h3 className="font-headline text-sm font-semibold mb-2" style={{ color: '#e1e2eb' }}>{title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: '#859399' }}>{body}</p>
          </div>
        ))}
      </div>

      {/* Attack accuracy table */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="px-6 py-4" style={{ background: 'rgba(29,32,38,0.9)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="font-headline text-sm font-semibold" style={{ color: '#e1e2eb' }}>Expected Attack Accuracy by XOR Level</h3>
          <p className="text-xs mt-0.5" style={{ color: '#859399' }}>10k CRPs, 64-stage PUF, no noise</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'rgba(16,19,26,0.5)' }}>
              {['Architecture', 'Logistic Regression', 'MLP', 'Risk Level'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-mono tracking-wider" style={{ color: '#859399' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {METRICS.map(({ label, lr, mlp, risk }, i) => (
              <tr key={label} style={{ background: i % 2 === 0 ? 'rgba(29,32,38,0.4)' : 'transparent', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <td className="px-6 py-3 font-mono text-xs" style={{ color: '#e1e2eb' }}>{label}</td>
                <td className="px-6 py-3 text-xs" style={{ color: '#4cd6ff' }}>{lr}</td>
                <td className="px-6 py-3 text-xs" style={{ color: '#dab9ff' }}>{mlp}</td>
                <td className="px-6 py-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{
                      background: risk === 'Critical' ? '#f8717120' : risk === 'High' ? '#fb923c20' : risk === 'Moderate' ? '#fbbf2420' : '#34d39920',
                      color: risk === 'Critical' ? '#f87171' : risk === 'High' ? '#fb923c' : risk === 'Moderate' ? '#fbbf24' : '#34d399',
                    }}>
                    {risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
