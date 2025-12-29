import React from 'react';
import { Sparkles, Database, Folder, CheckSquare, MoreHorizontal } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  type: 'crm' | 'projects' | 'tasks' | 'project-detail';
}

const PlaceholderPage: React.FC<PlaceholderProps> = ({ title, type }) => {
  return (
    <>
      <div className="flex-1 min-w-[800px] flex flex-col h-screen overflow-y-auto">
         <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-sun-100 px-8 py-4 flex justify-between items-center">
          <h1 className="font-serif text-2xl font-medium text-sun-900">{title}</h1>
          <button className="p-2 hover:bg-sun-50 rounded-lg text-sun-500">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="p-8">
          {/* Mock Content based on type */}
          {type === 'crm' && (
             <div className="border border-sun-200 rounded-xl overflow-hidden bg-white">
                <div className="grid grid-cols-4 bg-sun-50 p-4 text-xs font-semibold text-sun-500 uppercase tracking-wider">
                   <div>Name</div>
                   <div>Role</div>
                   <div>Company</div>
                   <div>Status</div>
                </div>
                {[1, 2, 3, 4, 5].map((i) => (
                   <div key={i} className="grid grid-cols-4 p-4 border-t border-sun-100 items-center hover:bg-sun-50/50 transition-colors">
                      <div className="font-medium text-sun-900">Contact Person {i}</div>
                      <div className="text-sm text-sun-500">Founder</div>
                      <div className="text-sm text-sun-500">Startup {String.fromCharCode(64 + i)}</div>
                      <div><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Active</span></div>
                   </div>
                ))}
             </div>
          )}

          {type === 'projects' && (
             <div className="grid grid-cols-2 gap-6">
                {[1, 2, 3].map((i) => (
                   <div key={i} className="p-6 border border-sun-200 rounded-xl bg-white hover:shadow-md transition-all cursor-pointer">
                      <div className="flex justify-between mb-4">
                        <div className="h-10 w-10 bg-sun-100 rounded-lg flex items-center justify-center text-sun-600">
                           <Folder size={20} />
                        </div>
                        <span className="text-xs font-medium bg-sun-50 px-2 py-1 rounded-md text-sun-600 h-fit">In Progress</span>
                      </div>
                      <h3 className="font-serif text-lg text-sun-900 mb-2">Project Alpha {i}</h3>
                      <div className="w-full bg-sun-100 h-1.5 rounded-full overflow-hidden">
                         <div className="bg-sun-900 h-full w-2/3"></div>
                      </div>
                      <div className="mt-4 flex justify-between text-xs text-sun-500">
                         <span>Due in 4 days</span>
                         <span>8/12 Tasks</span>
                      </div>
                   </div>
                ))}
             </div>
          )}

          {type === 'project-detail' && (
             <div className="space-y-6">
                <div className="flex gap-4 border-b border-sun-200 pb-1">
                   {['Overview', 'Tasks', 'Documents', 'Team'].map((tab, i) => (
                      <button key={tab} className={`pb-3 text-sm font-medium ${i===0 ? 'text-sun-900 border-b-2 border-sun-900' : 'text-sun-400 hover:text-sun-600'}`}>
                         {tab}
                      </button>
                   ))}
                </div>
                <div className="h-64 rounded-xl border-2 border-dashed border-sun-200 flex items-center justify-center text-sun-400">
                   Project Details Placeholder
                </div>
             </div>
          )}

          {type === 'tasks' && (
             <div className="space-y-3">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="flex items-center gap-4 p-4 bg-white border border-sun-200 rounded-lg">
                   <div className="h-5 w-5 rounded border border-sun-300"></div>
                   <div className="flex-1">
                     <p className="text-sm font-medium text-sun-900">Complete architectural review phase {i}</p>
                     <p className="text-xs text-sun-400">Project Alpha • Today</p>
                   </div>
                   <div className="h-6 w-6 rounded-full bg-sun-100"></div>
                 </div>
               ))}
             </div>
          )}
        </div>
      </div>

      {/* Placeholder Intelligence Panel */}
      <div className="w-80 border-l border-sun-200 bg-sun-50/50 h-screen p-6 sticky top-0 right-0">
         <div className="mb-6">
            <h2 className="font-serif text-lg text-sun-900 flex items-center gap-2">
               <Sparkles size={16} className="text-sun-accent" />
               Context Intelligence
            </h2>
         </div>
         
         <div className="p-4 bg-white border border-sun-200 rounded-lg mb-4">
            <p className="text-sm text-sun-600 leading-relaxed italic">
               {type === 'crm' && "AI Insight: You have 3 contacts that haven't been touched in 30 days. Consider scheduling a follow-up."}
               {type === 'projects' && "AI Insight: Project Beta is at risk of scope creep based on recent ticket volume."}
               {type === 'project-detail' && "AI Insight: Based on velocity, Phase 2 is likely to finish 2 days early."}
               {type === 'tasks' && "AI Suggestion: Group 'Admin' tasks together for Friday afternoon to maximize deep work time now."}
            </p>
         </div>
         <div className="p-4 bg-sun-100/50 rounded-lg border border-sun-200 border-dashed text-center">
            <p className="text-xs text-sun-400">Contextual data loading...</p>
         </div>
      </div>
    </>
  );
};

export default PlaceholderPage;
