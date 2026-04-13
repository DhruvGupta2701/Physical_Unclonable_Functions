import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { ViewType, SimulationRun } from './types';

import Configuration from './views/Configuration';
import Overview from './views/Overview';
import Results from './views/Results';
import Simulation from './views/Simulation';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('OVERVIEW');

  const [config, setConfig] = useState({
    num_samples: 1000,
    n_stages: 64,
    xor_level: 2,
    noise: 0.1,
    model_type: "lr",
    seed: 42
  });

  const [result, setResult] = useState<any>(null);

  const [history, setHistory] = useState<SimulationRun[]>(() => {
    try {
      const saved = localStorage.getItem('puf_experiment_history');
      if (saved) return JSON.parse(saved);
    } catch {
      console.error("Failed to parse history.");
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('puf_experiment_history', JSON.stringify(history));
  }, [history]);

  const renderView = () => {
    switch (currentView) {
      case 'OVERVIEW':
        return <Overview onViewChange={setCurrentView} />;

      case 'CONFIGURATION':
        return (
          <Configuration
            config={config}
            setConfig={setConfig}
            onViewChange={setCurrentView}
          />
        );

      case 'SIMULATION':
        return (
          <Simulation
            config={config}
            onRunComplete={(run) => {
              console.log("Run completed:", run);

              if (run?.result) {
                setResult(run.result);
                setHistory(prev => [run, ...prev]);
                setCurrentView('RESULTS');
              } else {
                console.error("No result received");
              }
          }}
          />
        );

      case 'RESULTS':
        return <Results result={result} history={history} />;

      default:
        return <Overview onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen kinetic-void-bg selection:bg-primary/30">
      
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* ✅ FIXED HERE */}
      <TopBar currentView={currentView} />

      <main className="ml-64 pt-24 pb-12 px-12 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>

      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-secondary-container opacity-[0.03] blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-primary-container opacity-[0.02] blur-[100px] rounded-full"></div>
      </div>

      <footer className="ml-64 py-8 opacity-20 text-center pointer-events-none">
        <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-600">
          Secure Environment Encrypted via KINETIC_VOID_ENGINE // v1.0.42-STABLE
        </p>
      </footer>

    </div>
  );
}