'use client';

import { useQuery } from '@tanstack/react-query';
import { coursesService } from '../services/course.service';
import { blogService } from '../services/blog.service';
import { tutorsService } from '../services/tutor.service';
import CourseCard from '../components/card';
import BlogCart from '../components/BlogCart';
import TutorCart from '../components/TutorCart';
import LoadingSpinner from '../components/LoadingSpinner';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from "../components/Navbar"

export default function HomePage() {
  
  const { data: coursesData, isLoading: coursesLoading, error: coursesError } = useQuery({
    queryKey: ['courses'],
    queryFn: () => coursesService.getAll(),
  });

 
  const { data: blogsData, isLoading: blogsLoading, error: blogsError } = useQuery({
    queryKey: ['latest-blogs'],
    queryFn: () => blogService.getAll(),
  });

  
  const { data: tutorsData, isLoading: tutorsLoading, error: tutorsError } = useQuery({
    queryKey: ['tutors'],
    queryFn: () => tutorsService.getAll(),
  });

  
  let popularCourses = [];
  if (coursesData) {
    const allCourses = coursesData.results || coursesData || [];
    popularCourses = allCourses.filter(course => course.active_students > 1000);
  }

 
  let latestBlogs = [];
  if (blogsData) {
    const allBlogs = blogsData.results || blogsData || [];
    latestBlogs = [...allBlogs]
      .sort((a, b) => new Date(b.published_date || b.created_at) - new Date(a.published_date || a.created_at))
      .slice(0, 3);
  }

 
  let firstTutors = [];
  if (tutorsData) {
    const allTutors = tutorsData.results || tutorsData || [];
    firstTutors = allTutors.slice(0, 3);
  }

  const isLoading = coursesLoading || blogsLoading || tutorsLoading;
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="">
   
        <Navbar />
        <div className=' mx-auto px-4 py-8'>

      
    

      
      <section className="mb-12 mr-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Courses</h2>
          <Link href="/courses" className="text-blue-600 hover:text-blue-700  flex items-center gap-1">
            View All<ArrowLeft size={18} />
          </Link>
        </div>
        {coursesError ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">error in receive courses</div>
        ) : popularCourses.length === 0 ? (
          <div className="bg-gray-100 text-gray-500 p-8 rounded-lg text-center">popular courses not found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCourses.map(course => <CourseCard key={course.id} course={course} />)}
          </div>
        )}
      </section>

      
      {!tutorsError && firstTutors.length > 0 && (
        <section className="mb-12 mr-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">The Best Tutors</h2>
            <Link href="/tutors" className="text-blue-600  hover:text-blue-700 flex items-center gap-1">
              View All <ArrowLeft size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {firstTutors.map(tutor => <TutorCart key={tutor.id} tutor={tutor} />)}
          </div>
        </section>
      )}

    
      {latestBlogs.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6 mr-4">
            <h2 className="text-2xl font-bold">Latest Blogs</h2>
            <Link href="/blog" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All<ArrowLeft size={18} />
            </Link>
          </div>
          {blogsError ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">خطا در دریافت مقالات</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestBlogs.map(post => <BlogCart key={post.id} post={post} />)}
            </div>
          )}
        </section>
      )}
    </div>
      </div>
  );
}