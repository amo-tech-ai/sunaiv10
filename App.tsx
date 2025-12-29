import React from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, CheckSquare, Settings, Zap, ArrowRight, ShieldAlert, Sparkles, ChevronRight, Activity, Command } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import PlaceholderPage from './pages/PlaceholderPage';
import CRMContacts from './pages/CRMContacts';
import Projects from './pages/Projects';
import ProjectWizard from './pages/ProjectWizard';

// --- Components ---

const NavItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg group ${
        isActive 
          ? 'text-sun-900 bg-sun-200/50' 
          : 'text-sun-500 hover:text-sun-900 hover:bg-sun-100'
      }`}
    >
      <Icon size={18} className={isActive ? 'text-sun-accent' : 'text-sun-400 group-hover:text-sun-600'} />
      {label}
    </Link>
  );
};

const ActiveBlueprintIndicator = () => (
  <div className="mt-8 px-4">
    <p className="text-xs uppercase tracking-widest text-sun-400 font-semibold mb-3">Active Blueprint</p>
    <div className="p-4 border border-sun-200 rounded-xl bg-white shadow-sm flex items-start gap-3">
      <div className="mt-1 p-1.5 rounded-full bg-sun-100 text-sun-accent">
        <Command size={14} />
      </div>
      <div>
        <h4 className="font-serif font-medium text-sun-900">Startup CRM Scale</h4>
        <p className="text-xs text-sun-500 mt-1">v2.4 • Executing Phase 2</p>
      </div>
    </div>
  </div>
);

const Sidebar = () => {
  return (
    <div className="w-64 flex-shrink-0 border-r border-sun-200 bg-sun-50 flex flex-col h-screen fixed left-0 top-0 z-10">
      <div className="p-8 pb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sun-900 rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg">S</div>
          <span className="font-serif text-xl font-medium tracking-tight text-sun-900">Sun Agency</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <NavItem to="/dashboard" icon={LayoutDashboard} label="Command Center" />
        <NavItem to="/crm/contacts" icon={Users} label="CRM" />
        <NavItem to="/projects" icon={Briefcase} label="Projects" />
        <NavItem to="/tasks" icon={CheckSquare} label="Tasks" />
        
        <div className="pt-4 mt-4 border-t border-sun-200/50">
           <NavItem to="/projects/new" icon={Sparkles} label="Project Wizard" />
        </div>
      </nav>

      <ActiveBlueprintIndicator />

      <div className="p-4 mt-auto">
        <div className="flex items-center gap-3 px-4 py-3 text-sm text-sun-500 hover:text-sun-900 cursor-pointer">
          <Settings size={18} />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

// Standard Layout shell
const Layout = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-64 flex">
        <Outlet />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crm/contacts" element={<CRMContacts />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<PlaceholderPage title="Project Intelligence" type="project-detail" />} />
          <Route path="/tasks" element={<PlaceholderPage title="Tasks" type="tasks" />} />
        </Route>
        {/* Wizard Route outside Layout to control full screen experience */}
        <Route path="/projects/new" element={<ProjectWizard />} />
      </Routes>
    </HashRouter>
  );
};

export default App;