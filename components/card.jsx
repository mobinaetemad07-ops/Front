  
'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesService } from '../services/course.service';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { BookOpen, User, Clock } from 'lucide-react';
import Image from 'next/image'
    
     
 
      


export default function CourseCard({ course }) {
  const { isLoggedIn, role } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const enrollMutation = useMutation({
    mutationFn: () => coursesService.enroll(course.id),
    onSuccess: () => {
      toast.success('successfull');
      queryClient.invalidateQueries(['student-dashboard']);
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        toast.error('please login at first');
        router.push('/login');
      } else {
        toast.error(error.response?.data?.message);
      }
    },
  });



console.log(course);

  const handleEnroll = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
    
      router.push('/login');
      return;
    }
    if (role !== 'student') {
      toast.error('just students can register');
      return;
    }
    enrollMutation.mutate();
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group">
      <Link href={`/courses/${course.id}`}>
        <div className="relative h-48 overflow-hidden text-center">
          <Image
            src={course.image}
            alt={course.title}
            height={300} width={500}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          {course.active_students >=1000 && (
            <button className="absolute top-3 right-3 bg-green-400 text-white text-sm px-2 py-1 rounded-full">
             Popular
            </button>
          )}
        </div>
        <div className="p-2">
          <h3 className="text-lg font-bold mb-2 text-center line-clamp-1">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
            <User size={14} /> {course.tutor?.user }
          </p>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              {course.duration && (
                <span className="flex items-center gap-1"><Clock size={14} /> {course.Course_duration  } hours</span>
              )}
              {course.level && (
                <span className="px-5 py-2  bg-blue-500 rounded-md text-xs text-white">{course.level}</span>
              )}
            </div>
            
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-blue-600 font-bold text-lg">{course.price_per_toman    ?.toLocaleString()} Toman </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <BookOpen size={14} /> {course.active_students  || 0} students
            </span>
          </div>
        </div>
      </Link>

     
      <div className="px-5 pb-5">
        <button
          onClick={handleEnroll}
          disabled={enrollMutation.isPending}
          className="w-full bg-slate-800
           text-white py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50 text-md flex items-center justify-center gap-2"
        >
         
          {enrollMutation.isPending ? 'Enrolling...' : "Enroll in course"}
        </button>
      </div>
    </div>
  );
}
