
import React from 'react';
import { Calendar, CheckSquare, AlertTriangle, TrendingUp, MoreHorizontal, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isSelected, onClick }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={onClick}
      className={`group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer bg-white hover:shadow-lg ${
        isSelected 
          ? 'border-sun-900 ring-1 ring-sun-900 shadow-md' 
          : 'border-sun-200 hover:border-sun-300'
      }`}
    >
      {/* Status Badge & Menu */}
      <div className="flex justify-between items-start mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
          project.status === 'On Track' ? 'bg-green-50 text-green-700 border-green-100' :
          project.status === 'At Risk' ? 'bg-red-50 text-red-700 border-red-100' :
          project.status === 'Delayed' ? 'bg-orange-50 text-orange-700 border-orange-100' :
          'bg-sun-50 text-sun-600 border-sun-100'
        }`}>
          {project.status === 'At Risk' && <AlertTriangle size={10} className="mr-1" />}
          {project.status}
        </span>
        <button className="text-sun-400 hover:text-sun-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h3 className="font-serif text-lg text-sun-900 font-medium mb-1 group-hover:text-sun-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-sun-500">{project.client}</p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-sun-500 mb-2">
          <span>Progress</span>
          <span className="font-medium text-sun-900">{project.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-sun-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              project.status === 'At Risk' ? 'bg-red-400' : 'bg-sun-900'
            }`} 
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="flex items-center justify-between pt-4 border-t border-sun-50">
        <div className="flex items-center gap-2 text-xs text-sun-500">
           <Calendar size={14} />
           <span>{project.dueDate}</span>
        </div>
        
        {/* Team Avatars */}
        <div className="flex -space-x-2">
          {project.team.map((initial, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-sun-100 border-2 border-white flex items-center justify-center text-[10px] font-medium text-sun-600">
              {initial}
            </div>
          ))}
        </div>
      </div>

      {/* Hover Action: View Intelligence */}
      <div className="absolute inset-x-6 bottom-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <button 
           onClick={(e) => {
             e.stopPropagation();
             navigate(`/projects/${project.id}/intelligence`);
           }}
           className="w-full py-2 bg-sun-900 text-white text-xs font-medium rounded-lg shadow-lg flex items-center justify-center gap-2 hover:bg-sun-800"
        >
          <Sparkles size={12} className="text-sun-accent" /> View Intelligence
        </button>
      </div>
      
      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute inset-0 rounded-xl ring-2 ring-sun-900 pointer-events-none" />
      )}
    </div>
  );
};
