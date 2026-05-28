'use client';

import { useQuery } from '@tanstack/react-query';
import { blogService } from '../../services/blog.service';
import BlogCart from '../../components/BlogCart'; 
import LoadingSpinner from "../../components/LoadingSpinner";
import { Newspaper } from 'lucide-react';

export default function BlogPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  });

  if (isLoading) return <LoadingSpinner />;
  

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
          <p>An error occurred. Please try again later.</p> 
        </div>
      </div>
    );
  }

 
  const posts = data?.results || data||  [];

  return (
   
    <div className="mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
    
     
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-cyan-700">
          Learning English Blogs
        </h1>
       
      </div>

      
      {posts.length === 0 ? (
      
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Newspaper className="mx-auto mb-4 text-gray-400" size={56} /> 
          <h3 className="text-lg sm:text-xl font-semibold mb-2">No blogs found</h3>
          
        </div>
      ) : (
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {posts.map((post) => (
            <BlogCart key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}