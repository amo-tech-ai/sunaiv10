import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Contact } from '../types';

interface ContactTableProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (id: string) => void;
}

export const ContactTable: React.FC<ContactTableProps> = ({ contacts, selectedContactId, onSelectContact }) => {
  return (
    <div className="flex-1 overflow-auto pb-20">
      <table className="w-full text-left border-collapse">
        <thead className="bg-sun-50 sticky top-0 z-10 shadow-sm">
          <tr>
            <th className="px-8 py-4 text-xs font-semibold text-sun-500 uppercase tracking-wider border-b border-sun-200 font-serif">Name</th>
            <th className="px-6 py-4 text-xs font-semibold text-sun-500 uppercase tracking-wider border-b border-sun-200 font-serif">Company</th>
            <th className="px-6 py-4 text-xs font-semibold text-sun-500 uppercase tracking-wider border-b border-sun-200 font-serif">Role</th>
            <th className="px-6 py-4 text-xs font-semibold text-sun-500 uppercase tracking-wider border-b border-sun-200 font-serif">Linked Blueprint</th>
            <th className="px-6 py-4 text-xs font-semibold text-sun-500 uppercase tracking-wider border-b border-sun-200 font-serif">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-sun-100">
          {contacts.map(contact => (
            <tr 
              key={contact.id} 
              onClick={() => onSelectContact(contact.id)}
              className={`group cursor-pointer transition-colors hover:bg-sun-50/80 ${selectedContactId === contact.id ? 'bg-sun-50' : ''}`}
            >
              <td className="px-8 py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border ${selectedContactId === contact.id ? 'bg-white border-sun-200 text-sun-900' : 'bg-sun-100 border-transparent text-sun-600'}`}>
                    {contact.avatar}
                  </div>
                  <span className="font-medium text-sun-900">{contact.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-sun-600">{contact.company}</td>
              <td className="px-6 py-4 text-sm text-sun-600">{contact.role}</td>
              <td className="px-6 py-4">
                <Link 
                  to="/dashboard" 
                  state={{ highlightBlueprintId: contact.blueprintId }}
                  onClick={(e) => e.stopPropagation()} // Prevent row selection when clicking link
                  className="text-sm text-sun-600 hover:text-sun-900 hover:underline flex items-center gap-1 group/link"
                >
                  {contact.blueprintName} 
                  <ArrowRight size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  {contact.blueprintHealth === 'At Risk' && (
                    <span className="ml-2 w-2 h-2 rounded-full bg-red-400 animate-pulse" title="Blueprint At Risk"></span>
                  )}
                </Link>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  contact.status === 'Active' 
                    ? 'bg-green-50 text-green-700 border-green-100' 
                    : 'bg-sun-100 text-sun-600 border-sun-200'
                }`}>
                  {contact.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};