'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { coursesService } from '../../services/course.service';
import CourseCard from '../../components/card';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Search, Filter, X, BookOpen } from 'lucide-react';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await coursesService.getAll();
      return res;
    },
  });

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const allCourses = Array.isArray(data)
    ? data
    : Array.isArray(data?.results)
    ? data.results
    : [];

  const courses = allCourses.filter((course) => {
    const title = course?.title?.toLowerCase() || '';

   

    const search = searchTerm.toLowerCase();

    const matchSearch =
      !searchTerm ||
      title.includes(search) ||
      tutorName.includes(search);

    const matchLevel =
      !selectedLevel || course?.level === selectedLevel;

    return matchSearch && matchLevel;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedLevel('');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg bg-red-100 p-4 text-center text-red-700">
          Please try again
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-cyan-700">
          EnglishHub Courses
        </h1>
      </div>

      
      <div className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row">

          
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border py-2 pl-4 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-gray-600"
          >
            <Filter size={20} />

            Filters

            {(searchTerm || selectedLevel) && (
              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                {(searchTerm ? 1 : 0) + (selectedLevel ? 1 : 0)}
              </span>
            )}
          </button>

          
          {(searchTerm || selectedLevel) && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-red-600 hover:bg-red-50"
            >
              <X size={20} />
              Clear
            </button>
          )}
        </div>

        
        {showFilters && (
          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <h3 className="mb-3 font-semibold">Level</h3>

            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() =>
                    setSelectedLevel(
                      selectedLevel === level ? '' : level
                    )
                  }
                  className={`rounded-full px-3 py-1 text-sm transition ${
                    selectedLevel === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      
      {courses.length === 0 ? (
        <div className="rounded-lg bg-white py-12 text-center shadow">
          <BookOpen
            size={64}
            className="mx-auto mb-4 text-gray-400"
          />

          <h3 className="text-xl font-semibold">
            Course not found
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      )}
    </div>
  );
}