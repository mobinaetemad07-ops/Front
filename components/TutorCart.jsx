'use client';

import { User, Briefcase} from 'lucide-react';

import Image from 'next/image'

export default function TutorCard({ tutor }) {


  
  const firstName = tutor.user?.first_name ;
  const lastName = tutor.user?.last_name ;
  const name = `${firstName} ${lastName}`.trim() ;

 
  const subjects = Array.isArray(tutor.subjects) ? tutor.subjects.join(', ') : tutor.subjects ;

  const bio = tutor.bio ;
  const profilePicture = tutor.profile_picture;


  return (
   
    <div className="bg-slate-200 w-full md:w-[460px] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-5 md:p-7"> 
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden mb-4 md:mb-0">
          {profilePicture ? (
            <Image src={profilePicture} alt={name} height={300} width={500} className="w-full h-full object-cover" />
      
          ) : (
            <User size={32} className="text-blue-600" />
          )} 
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-500 text-sm flex items-center gap-1 justify-center md:justify-start"> 
            <Briefcase size={14} /> {subjects}
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-3 text-center md:text-left">{bio}</p> 

    </div>
  );
}