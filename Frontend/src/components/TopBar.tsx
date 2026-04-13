import { ViewType } from '../types';

interface TopBarProps {
  currentView: ViewType;
}

const VIEW_TITLES: Record<ViewType, { title: string; subtitle: string }> = {
  OVERVIEW:      { title: 'Overview',              subtitle: 'Understanding PUF security & ML attacks' },
  CONFIGURATION: { title: 'Attack Configuration',  subtitle: 'Set PUF parameters and choose attack model' },
  SIMULATION:    { title: 'Run Simulation',         subtitle: 'Execute ML modelling attack' },
  RESULTS:       { title: 'Results & Analysis',     subtitle: 'Attack accuracy, history & security assessment' },
};

export default function TopBar({ currentView }: TopBarProps) {
  const { title, subtitle } = VIEW_TITLES[currentView];
  return (
    <header className="fixed top-0 left-64 right-0 h-20 flex items-center px-12 z-20"
      style={{ background: 'rgba(16,19,26,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div>
        <h1 className="font-headline text-xl font-semibold tracking-tight" style={{ color: '#e1e2eb' }}>{title}</h1>
        <p className="text-xs mt-0.5" style={{ color: '#859399' }}>{subtitle}</p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-[10px] font-mono px-3 py-1 rounded-full"
          style={{ background: 'rgba(76,214,255,0.08)', border: '1px solid rgba(76,214,255,0.2)', color: '#4cd6ff' }}>
          XOR ARBITER PUF
        </span>
      </div>
    </header>
  );
}
