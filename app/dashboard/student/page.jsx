'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth';
import { studentService } from '../../../services/student.service';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ProfileInfo from '../../../components/dashboard/student/PorfileInfo';

import { GraduationCap } from 'lucide-react';

export default function StudentDashboard() {
  const { user, isLoggedIn, isLoading: authLoad } = useAuth();

 
  const {  isLoading: dashLoad, error } = useQuery({
    queryKey: ['student-dashboard'],
    queryFn: () => studentService.getDashboard(),
    enabled: isLoggedIn,
  });

  if (authLoad || dashLoad) return <LoadingSpinner />;
  if (!isLoggedIn) return <div className="text-center p-8">please login</div>;
  if (error) {
    return <div className="text-center text-red-600 p-8">error: {error.message}</div>;
  }

 
  
 

  return (
    <div className="min-h-screen bg-gray-100">
      <header className=" p-4 flex  justify-between items-center">
        <div className="flex items-center gap-2">
          <GraduationCap  size={28} color='blue'/>
          <h1 className="text-xl font-bold text-blue-600">Dashboard Student</h1>
        </div>
        
      </header>

      <main className="container mx-auto p-6">
      
        <div className=" text-white p-6 rounded-2xl mb-8 bg-slate-600">
          <h2 className="text-2xl font-bold">Hello {user?.first_name  }!</h2>
          <p className="opacity-90"> Welcome to your Dashboard</p>
        </div>

      
        <div className="mb-8">
          <ProfileInfo />
        </div>

     
      
      </main>
    </div>
  );
}