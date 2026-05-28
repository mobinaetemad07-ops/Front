'use client';

import { useQuery } from '@tanstack/react-query';
import { tutorsService } from '../../services/tutor.service';
import TutorCart from '../../components/TutorCart';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Users } from 'lucide-react';

export default function TutorsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tutors'],
    queryFn: () => tutorsService.getAll(),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className=" mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  
  const tutors = data?.results || data ||[];

  return (
   
    <div className="mx-auto px-4 sm:px-6 md:px-14 py-8"> 
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-5 text-cyan-700">Experienced Tutors</h1>
        <p className="text-gray-600 text-sm sm:text-base">Experience learning with the best</p>
      </div>

      {tutors.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow mx-auto max-w-md"> 
          <Users className="mx-auto mb-4 text-gray-400" size={64} />
          <h3 className="text-xl font-semibold mb-2">Tutor not found</h3>
         
        </div>
      ) : (
     
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> 
          {tutors.map((tutor) => (
            <TutorCart key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}