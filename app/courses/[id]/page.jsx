'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesService } from '../../../services/course.service';
import { useAuth } from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { User, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function CourseDetailPage() {
  const { id } = useParams();

  const router = useRouter();

  const { isLoggedIn, isStudent } = useAuth();

  const queryClient = useQueryClient();

  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['course', id],
    queryFn: () => coursesService.getById(id),
    enabled: !!id,
  });

  const enrollMutation = useMutation({
    mutationFn: () => coursesService.enroll(id),

    onSuccess: () => {
      toast.success('success');

      queryClient.invalidateQueries({
        queryKey: ['student-dashboard'],
      });
    },

    onError: (error) => {
      if (error.response?.status === 401) {
        toast.error('please login at first');
        router.push('/login');
      } else if (error.response?.status === 400) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error('error');
      }
    },
  });

  const handleEnroll = () => {
    if (!isLoggedIn) {
      
      router.push('/login');
      return;
    }

    if (!isStudent) {
      toast.error('just students can register');
      return;
    }

    enrollMutation.mutate();
  };

  if (isLoading) return <LoadingSpinner />;

  if (error || !course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-xl">
          course not found
        </div>

        <Link
          href="/courses"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          return to courses
        </Link>
      </div>
    );
  }

const {
  title,
  description,
  level,
  course_duration,
  price_per_toman,
  active_students,
  image,
  detail,
  requirements,
  materials,
  is_enrolled,
} = course;
  const splitToList = (str) => {
    if (!str || typeof str !== 'string') return [];

    return str
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const detailsList = splitToList(detail);

  const requirementsList = splitToList(requirements);

  const materialsList = splitToList(materials);

  return (
    <div className="px-3 sm:px-5 py-6">
      <div className="max-w-4xl mx-auto">
        
      
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      
          <div className="w-full">
            <Image
              src={image}
              alt={title}
              height={300} width={500}
              className="w-full h-56 sm:h-72 md:h-[380px] object-cover"
            />
          </div>

         
          <div className="p-4 sm:p-6">
            
         
            <div className="flex flex-wrap items-center gap-2 mb-4">
              
              {level && (
                <span className="bg-blue-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full">
                  {level}
                </span>
              )}

              {course_duration && (
                <span className="text-gray-500 text-sm">
                  {course_duration} Lessons
                </span>
              )}
            </div>

        
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-snug">
              {title}
            </h1>

            <p className="text-gray-600 mt-5 leading-8 text-sm sm:text-base text-justify">
              {description}
            </p>
          </div>

      
          {detailsList.length > 0 && (
            <div className="border-t p-4 sm:p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Details
              </h2>

              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                {detailsList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

      
          {requirementsList.length > 0 && (
            <div className="border-t p-4 sm:p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                <CheckCircle size={22} />
                Requirements
              </h2>

              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                {requirementsList.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}

     
          {materialsList.length > 0 && (
            <div className="border-t p-4 sm:p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                <CheckCircle size={22} />
                Materials
              </h2>

              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                {materialsList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

        
          <div className="border-t p-4 sm:p-6">
            <div className="bg-gray-50 border rounded-xl p-5 shadow-sm">
              
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {price_per_toman?.toLocaleString()} Toman
                </span>
              </div>

              {active_students && (
                <div className="flex items-center gap-2 text-gray-600 text-sm mt-4">
                  <User size={18} />
                  <span>{active_students} students</span>
                </div>
              )}

            
              <button
                onClick={handleEnroll}
                disabled={enrollMutation.isPending || is_enrolled}
                className={`w-full mt-5 py-3 rounded-xl font-semibold transition-all duration-300
                  ${
                    is_enrolled
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-800 text-white hover:bg-blue-700'
                  }
                  disabled:opacity-50`}
              >
                {is_enrolled
                  ? 'register'
                  : enrollMutation.isPending
                  ? 'Enrolling...'
                  : 'Enroll in course'}
              </button>

          
              {is_enrolled && (
                <Link
                  href="/dashboard/student"
                  className="block text-center border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition mt-3"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}