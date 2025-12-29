
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Database, 
  Zap, 
  Layout, 
  Smartphone, 
  Globe, 
  BarChart, 
  ShieldCheck, 
  Bot,
  Layers,
  Code2,
  CheckCircle2,
  Sparkles,
  Command
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

const Button = ({ variant = 'primary', children, to }: { variant?: 'primary' | 'secondary' | 'ghost' | 'glass', children: React.ReactNode, to: string }) => {
  const styles = {
    primary: "bg-agency-signal text-white hover:bg-white hover:text-agency-navy border border-transparent hover:border-agency-navy",
    secondary: "bg-agency-navy text-white hover:bg-agency-void",
    ghost: "bg-transparent text-agency-navy border border-agency-navy hover:bg-agency-navy hover:text-white",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
  };
  
  return (
    <Link 
      to={to} 
      className={`px-8 py-4 rounded-full font-medium text-sm tracking-wide transition-all duration-300 flex items-center gap-2 ${styles[variant]}`}
    >
      {children}
    </Link>
  );
};

// --- HERO SECTION ---

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-agency-paper overflow-hidden flex items-center">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-agency-emerald/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-agency-signal/5 rounded-full blur-3xl" />

      <Section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 pt-32">
        {/* Left: Copy */}
        <div className="space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-agency-emerald animate-pulse" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Production-Ready AI</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-agency-navy leading-[1.1] md:leading-[1.05]">
            Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-agency-navy to-agency-emerald">Intelligent</span> Products.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-md leading-relaxed">
            Sun AI Agency is the operating system for founders who want to move fast. From idea to execution in weeks, not months.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button to="/dashboard" variant="secondary">Start Project <ArrowRight size={16} /></Button>
            <Button to="/projects" variant="ghost">View Components</Button>
          </div>
        </div>

        {/* Right: Orbital System */}
        <div className="relative h-[500px] w-full flex items-center justify-center hidden lg:flex">
           <div className="absolute inset-0 flex items-center justify-center">
              {/* Orbits */}
              <div className="w-[300px] h-[300px] border border-gray-200 rounded-full absolute animate-[orbit_30s_linear_infinite]" />
              <div className="w-[450px] h-[450px] border border-gray-100 rounded-full absolute animate-[orbit_45s_linear_infinite_reverse]" />
              
              {/* Center Node */}
              <div className="w-32 h-32 bg-agency-navy rounded-full flex items-center justify-center shadow-2xl relative z-10">
                <div className="absolute inset-0 bg-agency-emerald/20 blur-xl rounded-full animate-pulse" />
                <Bot size={48} className="text-white relative z-10" />
              </div>

              {/* Satellite Nodes (Static for simplicity, but conceptually rotating) */}
              <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 animate-[orbit_30s_linear_infinite]">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-gray-100 shadow-lg rounded-full flex items-center justify-center text-agency-signal">
                    <Database size={20} />
                 </div>
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white border border-gray-100 shadow-lg rounded-full flex items-center justify-center text-agency-emerald">
                    <Cpu size={20} />
                 </div>
              </div>

               <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 animate-[orbit_45s_linear_infinite_reverse]">
                 <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white border border-gray-100 shadow-lg rounded-full flex items-center justify-center text-agency-navy">
                    <Zap size={24} />
                 </div>
                 <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white border border-gray-100 shadow-lg rounded-full flex items-center justify-center text-agency-navy">
                    <Layout size={24} />
                 </div>
              </div>
           </div>
        </div>
      </Section>
    </div>
  );
};

// --- HOW IT WORKS (SCROLL) ---

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionTop = document.getElementById('how-it-works')?.offsetTop || 0;
      const offset = scrollY - sectionTop;
      
      if (offset < 300) setActiveStep(0);
      else if (offset < 800) setActiveStep(1);
      else setActiveStep(2);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    { title: 'Scope', desc: 'Define your constraints and goals via our AI Wizard.', icon: Terminal },
    { title: 'Blueprint', desc: 'Our architect agent generates a complete WBS.', icon: Layers },
    { title: 'Dashboard', desc: 'Manage execution with a live mission control.', icon: Layout },
  ];

  return (
    <div id="how-it-works" className="relative h-[250vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <Section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center h-full">
          
          {/* Left: Steps */}
          <div className="space-y-12">
            <h2 className="font-serif text-4xl text-agency-navy mb-8">The smarter way to build.</h2>
            <div className="space-y-8 relative">
              <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gray-100 -z-10" />
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`flex gap-8 transition-all duration-500 ${
                    activeStep === idx ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-0'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 bg-white transition-colors duration-500 ${
                    activeStep === idx 
                      ? 'border-agency-navy text-agency-navy shadow-lg' 
                      : 'border-gray-200 text-gray-400'
                  }`}>
                    <step.icon size={24} />
                  </div>
                  <div className="pt-2">
                    <h3 className="font-serif text-2xl mb-2">{step.title}</h3>
                    <p className="text-gray-500 leading-relaxed max-w-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dynamic UI Preview */}
          <div className="relative h-[500px] w-full bg-agency-paper rounded-2xl border border-gray-200 shadow-2xl overflow-hidden hidden lg:block p-8">
            {/* Browser Bar */}
            <div className="absolute top-0 left-0 w-full h-10 bg-white border-b border-gray-100 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            
            {/* Content Mockups */}
            <div className="mt-8 h-full transition-all duration-700 ease-out relative">
              {/* Step 1: Wizard Mock */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${activeStep === 0 ? 'opacity-100' : 'opacity-0'}`}>
                 <div className="space-y-4">
                    <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-1/3 bg-gray-100 rounded" />
                    <div className="grid grid-cols-2 gap-4 mt-8">
                       <div className="h-32 bg-white border border-gray-200 rounded-lg shadow-sm" />
                       <div className="h-32 bg-white border border-agency-navy rounded-lg shadow-md ring-2 ring-agency-navy/10" />
                    </div>
                 </div>
              </div>

              {/* Step 2: Blueprint Mock */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${activeStep === 1 ? 'opacity-100' : 'opacity-0'}`}>
                 <div className="h-full bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                       <div className="h-6 w-32 bg-gray-800 rounded" />
                       <div className="h-8 w-24 bg-agency-emerald rounded" />
                    </div>
                    <div className="space-y-3">
                       {[1,2,3,4].map(i => (
                          <div key={i} className="h-12 bg-gray-50 rounded-lg border border-gray-100 flex items-center px-4 gap-4">
                             <div className="w-4 h-4 border border-gray-300 rounded" />
                             <div className="h-3 w-2/3 bg-gray-200 rounded" />
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Step 3: Dashboard Mock */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${activeStep === 2 ? 'opacity-100' : 'opacity-0'}`}>
                 <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 bg-white border border-gray-200 rounded-lg p-4">
                       <div className="text-xs text-gray-400 uppercase">Revenue</div>
                       <div className="text-2xl font-serif text-agency-navy mt-1">$42k</div>
                    </div>
                    <div className="h-24 bg-white border border-gray-200 rounded-lg p-4">
                       <div className="text-xs text-gray-400 uppercase">Users</div>
                       <div className="text-2xl font-serif text-agency-navy mt-1">1.2k</div>
                    </div>
                    <div className="h-24 bg-white border border-gray-200 rounded-lg p-4">
                       <div className="text-xs text-gray-400 uppercase">Growth</div>
                       <div className="text-2xl font-serif text-agency-emerald mt-1">+12%</div>
                    </div>
                 </div>
                 <div className="mt-4 h-48 bg-white border border-gray-200 rounded-lg p-4 flex items-end gap-2">
                    {[40, 60, 45, 70, 80, 65, 85].map((h, i) => (
                       <div key={i} className="flex-1 bg-agency-navy/10 rounded-t-sm" style={{ height: `${h}%` }} />
                    ))}
                 </div>
              </div>
            </div>
            
            {/* Ghost Cursor */}
            <div className={`absolute w-6 h-6 transition-all duration-1000 ease-in-out z-20 pointer-events-none ${
              activeStep === 0 ? 'top-1/2 left-1/2' :
              activeStep === 1 ? 'top-20 right-20' : 'bottom-20 left-20'
            }`}>
               <svg viewBox="0 0 24 24" fill="black" className="w-full h-full drop-shadow-xl"><path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85l-12.93-12.93a.5.5 0 0 0-.85.35Z"/></svg>
            </div>

          </div>
        </Section>
      </div>
    </div>
  );
};

// --- EXPERTISE GRID ---

const Expertise = () => {
  const items = [
    { title: 'SaaS Platforms', desc: 'Full-stack web apps with auth, payments, and admin panels.', icon: Layout },
    { title: 'Mobile Apps', desc: 'Native iOS/Android experiences built with React Native.', icon: Smartphone },
    { title: 'AI Integration', desc: 'Custom LLM agents, RAG pipelines, and vector search.', icon: Bot },
    { title: 'Marketing Sites', desc: 'High-performance landing pages for conversion.', icon: Globe },
    { title: 'Automation', desc: 'Background workers and event-driven architectures.', icon: Zap },
    { title: 'Analytics', desc: 'Custom dashboards and data visualization.', icon: BarChart },
    { title: 'Security', desc: 'Enterprise-grade compliance and data protection.', icon: ShieldCheck },
    { title: 'API Design', desc: 'Scalable REST and GraphQL endpoints.', icon: Database },
  ];

  return (
    <div className="bg-white">
      <Section>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-agency-emerald font-bold tracking-widest text-xs uppercase mb-2 block">Our Expertise</span>
            <h2 className="font-serif text-4xl text-agency-navy">What we build.</h2>
          </div>
          <p className="text-gray-500 max-w-sm mt-4 md:mt-0">
            From simple MVPs to complex enterprise systems, our blueprints cover the entire digital spectrum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="group p-8 border border-gray-100 rounded-2xl hover:border-agency-emerald/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
              <div className="w-14 h-14 bg-agency-paper rounded-xl flex items-center justify-center text-agency-navy mb-6 group-hover:bg-agency-emerald/10 group-hover:text-agency-emerald transition-colors">
                <item.icon size={28} />
              </div>
              <h3 className="font-serif text-lg mb-2 text-agency-navy">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

// --- TECH STACK (DARK) ---

const TechStack = () => {
  return (
    <div className="bg-agency-void text-white">
      <Section className="py-32">
        <div className="mb-16 border-b border-white/10 pb-8">
           <h2 className="font-serif text-4xl mb-4">Tools & Technologies</h2>
           <p className="text-gray-400 font-light max-w-2xl">
             We leverage a modern, type-safe stack to ensure scalability and maintainability.
             No lock-in, just pure code.
           </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
           <div className="space-y-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Frontend</h3>
              <ul className="space-y-4 text-sm text-gray-300">
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-agency-emerald rounded-full" /> React 19</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-agency-emerald rounded-full" /> TypeScript</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-agency-emerald rounded-full" /> Tailwind CSS</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-agency-emerald rounded-full" /> Framer Motion</li>
              </ul>
           </div>
           <div className="space-y-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">AI & Data</h3>
              <ul className="space-y-4 text-sm text-gray-300">
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-agency-signal rounded-full" /> Gemini 3 Pro</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-agency-signal rounded-full" /> OpenAI GPT-4</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-agency-signal rounded-full" /> Pinecone</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-agency-signal rounded-full" /> LangChain</li>
              </ul>
           </div>
           <div className="space-y-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Backend</h3>
              <ul className="space-y-4 text-sm text-gray-300">
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Supabase</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> PostgreSQL</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Edge Functions</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Node.js</li>
              </ul>
           </div>
           <div className="space-y-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Deploy</h3>
              <ul className="space-y-4 text-sm text-gray-300">
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full" /> Vercel</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full" /> Docker</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full" /> GitHub Actions</li>
              </ul>
           </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-wrap gap-12">
           <div>
              <div className="text-3xl font-serif text-white">20+</div>
              <div className="text-xs text-gray-500 uppercase mt-1">Tech Integrations</div>
           </div>
           <div>
              <div className="text-3xl font-serif text-white">99.9%</div>
              <div className="text-xs text-gray-500 uppercase mt-1">Uptime SLA</div>
           </div>
           <div>
              <div className="text-3xl font-serif text-white">&lt;100ms</div>
              <div className="text-xs text-gray-500 uppercase mt-1">Global Latency</div>
           </div>
        </div>
      </Section>
    </div>
  );
};

// --- METRICS ---

const Metrics = () => {
  return (
    <div className="bg-agency-paper">
      <Section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Counters */}
        <div className="space-y-8">
           <h2 className="font-serif text-4xl text-agency-navy">Real Results.</h2>
           <p className="text-gray-600">Why founders choose Sun AI Agency over traditional dev shops.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
              <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                 <div className="text-4xl font-serif text-agency-emerald mb-2">6x</div>
                 <div className="text-sm font-medium text-agency-navy">Faster Deployment</div>
                 <div className="text-xs text-gray-400 mt-1">Vs. traditional agencies</div>
              </div>
              <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                 <div className="text-4xl font-serif text-agency-signal mb-2">40%</div>
                 <div className="text-sm font-medium text-agency-navy">Cost Reduction</div>
                 <div className="text-xs text-gray-400 mt-1">Through AI automation</div>
              </div>
              <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                 <div className="text-4xl font-serif text-agency-navy mb-2">24/7</div>
                 <div className="text-sm font-medium text-agency-navy">Development Cycle</div>
                 <div className="text-xs text-gray-400 mt-1">Agents never sleep</div>
              </div>
           </div>
        </div>

        {/* Right: Visualization */}
        <div className="relative">
           <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl">
              <h3 className="font-serif text-xl mb-6">Time to MVP</h3>
              
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
                       <span>Traditional Dev Shop</span>
                       <span>8 Months</span>
                    </div>
                    <div className="h-4 bg-gray-100 rounded-full w-full">
                       <div className="h-full bg-gray-400 rounded-full w-full" />
                    </div>
                 </div>

                 <div>
                    <div className="flex justify-between text-xs font-medium text-gray-900 mb-2">
                       <span className="flex items-center gap-2"><Sparkles size={12} className="text-agency-signal" /> Sun AI Agency</span>
                       <span>8 Weeks</span>
                    </div>
                    <div className="h-4 bg-agency-signal/10 rounded-full w-full relative overflow-hidden">
                       <div className="h-full bg-agency-signal rounded-full w-[25%] animate-pulse" />
                    </div>
                 </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                       <CheckCircle2 size={20} />
                    </div>
                    <div>
                       <div className="font-medium text-sm text-agency-navy">Guaranteed Delivery</div>
                       <div className="text-xs text-gray-500">Fixed price, fixed timeline. No surprises.</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </Section>
    </div>
  );
};

// --- VELOCITY SYSTEM (TIMELINE) ---

const Velocity = () => {
  return (
    <div className="bg-white">
      <Section className="text-center">
        <h2 className="font-serif text-4xl text-agency-navy mb-4">Build in 8 Weeks.</h2>
        <p className="text-gray-500 mb-20 max-w-xl mx-auto">Our proven methodology ensures rapid iteration and a production-ready launch.</p>
        
        <div className="relative hidden md:block">
           {/* Line */}
           <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10" />
           <div className="absolute top-1/2 left-0 w-full h-0.5 bg-agency-navy origin-left animate-draw -z-10" />

           <div className="grid grid-cols-4 gap-8">
              {[
                { week: 'Weeks 1-2', title: 'Strategy', icon: Terminal },
                { week: 'Weeks 3-5', title: 'Build', icon: Code2 },
                { week: 'Weeks 6-7', title: 'Integrate', icon: Zap },
                { week: 'Week 8', title: 'Launch', icon: checkCircle => <Sparkles /> }
              ].map((step, idx) => (
                 <div key={idx} className="flex flex-col items-center group">
                    <div className="w-16 h-16 bg-white border-4 border-agency-paper rounded-full flex items-center justify-center text-agency-navy shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 z-10">
                       {idx === 3 ? <Sparkles size={24} className="text-agency-signal" /> : 
                        idx === 0 ? <Terminal size={24} /> :
                        idx === 1 ? <Code2 size={24} /> : <Zap size={24} />}
                    </div>
                    <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm w-full transition-all hover:shadow-md">
                       <div className="text-xs font-bold text-agency-emerald uppercase tracking-wider mb-1">{step.week}</div>
                       <h3 className="font-serif text-xl text-agency-navy">{step.title}</h3>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </Section>
    </div>
  );
};

// --- FOOTER ---

const Footer = () => {
  return (
    <footer className="bg-agency-navy text-white py-20 px-6 border-t border-white/5">
       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-agency-navy font-serif font-bold text-lg">S</div>
                <span className="font-serif text-xl font-medium tracking-tight">Sun Agency</span>
             </div>
             <p className="text-sm text-gray-400 leading-relaxed">
                The premium AI operating system for founders and agencies. AI proposes, humans approve.
             </p>
          </div>

          {/* Links */}
          <div>
             <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-6">Platform</h4>
             <ul className="space-y-4 text-sm text-gray-300">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                <li><Link to="/crm/contacts" className="hover:text-white transition-colors">CRM</Link></li>
                <li><Link to="/tasks" className="hover:text-white transition-colors">Tasks</Link></li>
             </ul>
          </div>

          <div>
             <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-6">Company</h4>
             <ul className="space-y-4 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
             </ul>
          </div>

          <div>
             <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-6">Locations</h4>
             <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-center gap-2"><Globe size={14} /> San Francisco</li>
                <li className="flex items-center gap-2"><Globe size={14} /> New York</li>
                <li className="flex items-center gap-2"><Globe size={14} /> London</li>
             </ul>
          </div>
       </div>
       
       <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2025 Sun AI Agency. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white">Privacy Policy</a>
             <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
       </div>
    </footer>
  );
};

// --- MAIN PAGE LAYOUT ---

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-agency-navy font-sans selection:bg-agency-emerald selection:text-white">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-agency-navy rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg">S</div>
               <span className="font-serif text-xl font-medium tracking-tight text-agency-navy">Sun Agency</span>
            </div>
            
            <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
               <a href="#how-it-works" className="hover:text-agency-navy transition-colors">Process</a>
               <a href="#expertise" className="hover:text-agency-navy transition-colors">Expertise</a>
               <a href="#results" className="hover:text-agency-navy transition-colors">Results</a>
            </nav>

            <div className="flex items-center gap-4">
               <Link to="/dashboard" className="text-sm font-medium text-agency-navy hover:text-agency-signal transition-colors hidden sm:block">Log In</Link>
               <Button to="/dashboard" variant="primary">Start Project</Button>
            </div>
         </div>
      </header>

      <main>
        <Hero />
        <HowItWorks />
        <div id="expertise"><Expertise /></div>
        <TechStack />
        <div id="results"><Metrics /></div>
        <Velocity />
        
        {/* Final CTA */}
        <Section className="text-center py-32 bg-gray-50">
           <h2 className="font-serif text-5xl md:text-6xl text-agency-navy mb-8">Ready to build something <span className="text-agency-signal italic">extraordinary?</span></h2>
           <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">Join the new era of high-velocity founders. Launch your MVP in weeks.</p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button to="/dashboard" variant="primary">Start Your Project</Button>
              <Button to="#" variant="ghost">Talk to Strategist</Button>
           </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
