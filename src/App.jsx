import { useState, useCallback, useMemo } from 'react';

// Components
import Background from './components/Background';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Tabs
import QuestTab from './components/tabs/QuestTab';
import MapTab from './components/tabs/MapTab';
import GearTab from './components/tabs/GearTab';
import BossTab from './components/tabs/BossTab';
import GradeTab from './components/tabs/GradeTab';
import SampleTab from './components/tabs/SampleTab';
import NpcTab from './components/tabs/NpcTab';

function App() {
  const [activeTab, setActiveTab] = useState('quest');
  const [activeWeek, setActiveWeek] = useState(1);
  const [completedTasks, setCompletedTasks] = useState([]);

  const toggleTask = useCallback((taskId) => {
    setCompletedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  }, []);

  const handleSetActiveTab = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleSetActiveWeek = useCallback((week) => {
    setActiveWeek(week);
  }, []);

  const renderTab = useMemo(() => {
    switch (activeTab) {
      case 'quest':
        return <QuestTab />;
      case 'map':
        return (
          <MapTab
            activeWeek={activeWeek}
            setActiveWeek={handleSetActiveWeek}
            completedTasks={completedTasks}
            toggleTask={toggleTask}
          />
        );
      case 'gear':
        return <GearTab />;
      case 'boss':
        return <BossTab />;
      case 'grade':
        return <GradeTab />;
      case 'sample':
        return <SampleTab />;
      case 'npc':
        return <NpcTab />;
      default:
        return <QuestTab />;
    }
  }, [activeTab, activeWeek, completedTasks, handleSetActiveWeek, toggleTask]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans">
      <Background />
      <Header completedTasks={completedTasks} />
      <Navigation activeTab={activeTab} setActiveTab={handleSetActiveTab} />

      <main className="relative z-10 px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          {renderTab}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
