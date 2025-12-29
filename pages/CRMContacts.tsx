import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
} from 'lucide-react';
import { Contact } from '../types';
import { ContactTable } from '../components/ContactTable';
import { ContactIntelligencePanel } from '../components/ContactIntelligencePanel';

// --- Mock Data ---
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Jordan Lee',
    role: 'Founder',
    company: 'Sun AI Agency',
    blueprintId: '102',
    blueprintName: 'Blueprint #102',
    blueprintHealth: 'Healthy',
    status: 'Active',
    lastContact: '2 days ago',
    email: 'jordan@sun.ai',
    avatar: 'JL'
  },
  {
    id: '2',
    name: 'Sarah Kim',
    role: 'Head of Ops',
    company: 'StartupCo',
    blueprintId: '097',
    blueprintName: 'Blueprint #097',
    blueprintHealth: 'At Risk',
    status: 'In Review',
    lastContact: '5 days ago',
    email: 'sarah@startup.co',
    avatar: 'SK'
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'CTO',
    company: 'TechFlow',
    blueprintId: '105',
    blueprintName: 'Blueprint #105',
    blueprintHealth: 'On Track',
    status: 'Active',
    lastContact: '1 week ago',
    email: 'm.chen@techflow.io',
    avatar: 'MC'
  },
  {
    id: '4',
    name: 'Emma Davis',
    role: 'Director',
    company: 'Creative Inc',
    blueprintId: '099',
    blueprintName: 'Blueprint #099',
    blueprintHealth: 'Healthy',
    status: 'Archived',
    lastContact: '1 month ago',
    email: 'emma@creative.inc',
    avatar: 'ED'
  }
];

const CRMContacts = () => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const selectedContact = mockContacts.find(c => c.id === selectedContactId) || null;

  return (
    <div className="flex w-full h-screen overflow-hidden">
       {/* CRM Navigation (Left Panel) */}
       <div className="w-64 border-r border-sun-200 bg-white flex-shrink-0 flex flex-col pt-4">
          <div className="px-6 pb-6 pt-2">
             <h1 className="font-serif text-xl text-sun-900">CRM</h1>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 space-y-8">
             {/* Section 1: Main */}
             <div className="space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-sun-900 bg-sun-50 rounded-lg border border-sun-100 shadow-sm">
                   <Users size={16} className="text-sun-600" /> All Contacts
                </button>
             </div>

             {/* Section 2: Companies */}
             <div>
               <div className="px-3 mb-3 flex items-center justify-between">
                 <h3 className="text-xs font-semibold text-sun-400 uppercase tracking-wider">Companies</h3>
               </div>
               <div className="space-y-1 px-3">
                 {['Sun AI Agency', 'StartupCo', 'TechFlow'].map(company => (
                   <button key={company} className="w-full flex items-center gap-2 text-sm text-sun-600 hover:text-sun-900 py-1.5 transition-colors group text-left">
                     <div className="w-1.5 h-1.5 rounded-full bg-sun-300 group-hover:bg-sun-900 transition-colors"></div>
                     {company}
                   </button>
                 ))}
               </div>
             </div>

             {/* Section 3: Filters */}
             <div>
                <div className="px-3 mb-3">
                  <h3 className="text-xs font-semibold text-sun-400 uppercase tracking-wider">Filters</h3>
                </div>
                
                <div className="px-3 space-y-4">
                  {/* Status */}
                  <div>
                    <h4 className="text-[10px] text-sun-400 font-medium mb-2 uppercase flex items-center gap-2">Status</h4>
                    <div className="space-y-1">
                       {['Active', 'In Review', 'Archived'].map(status => (
                          <button key={status} className="block w-full text-left text-sm text-sun-500 hover:text-sun-900 py-1 hover:bg-sun-50 rounded px-2 -mx-2 transition-colors">
                            {status}
                          </button>
                       ))}
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <h4 className="text-[10px] text-sun-400 font-medium mb-2 uppercase">Type</h4>
                    <div className="space-y-1">
                       {['Client', 'Partner', 'Vendor'].map(type => (
                          <button key={type} className="block w-full text-left text-sm text-sun-500 hover:text-sun-900 py-1 hover:bg-sun-50 rounded px-2 -mx-2 transition-colors">
                            {type}
                          </button>
                       ))}
                    </div>
                  </div>
                </div>
             </div>
          </div>
       </div>

       {/* Main Work Surface */}
       <div className="flex-1 flex flex-col min-w-0 bg-white h-screen overflow-hidden">
          {/* Toolbar */}
          <div className="h-16 border-b border-sun-100 flex items-center justify-between px-8 flex-shrink-0 bg-white/50 backdrop-blur-sm z-10">
             <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sun-400" />
                <input 
                  type="text" 
                  placeholder="Search contacts..." 
                  className="pl-9 pr-4 py-2 text-sm border border-sun-200 rounded-lg focus:outline-none focus:border-sun-400 w-64 bg-sun-50/50" 
                />
             </div>
             <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-2 border border-sun-200 rounded-lg text-sm text-sun-600 hover:bg-sun-50 transition-colors bg-white">
                   <Filter size={16} /> Filter
                </button>
                <button className="px-4 py-2 bg-sun-900 text-white text-sm font-medium rounded-lg hover:bg-sun-800 transition-colors shadow-sm">
                   Add Contact
                </button>
             </div>
          </div>
          
          {/* Table Component */}
          <ContactTable 
            contacts={mockContacts} 
            selectedContactId={selectedContactId} 
            onSelectContact={setSelectedContactId} 
          />
       </div>

       {/* Right Intelligence Panel Component */}
       <ContactIntelligencePanel contact={selectedContact} />
    </div>
  );
};

export default CRMContacts;