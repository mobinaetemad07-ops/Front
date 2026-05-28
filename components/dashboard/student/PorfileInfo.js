
'use client';
import { useAuth } from '../../../hooks/useAuth';
import { User, Mail, Edit2 } from 'lucide-react';



export default function ProfileInfo() {
  const { user } = useAuth();
  

  if (!user) return <div className="animate-pulse bg-gray-200 h-32 rounded-xl"></div>;

  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email.split('@')[0];
  const email = user.email;

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-slate-700 p-4 text-white flex justify-between">
          <h3 className="font-bold">Personal Information</h3>
          <button ><Edit2 size={18} /></button>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2"><User size={18} /><span>{fullName}</span></div>
          <div className="flex items-center gap-2"><Mail size={18} /><span>{email}</span></div>
        </div>
      </div>
      
    </>
  );
}