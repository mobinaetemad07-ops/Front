'use client';

import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

export default function BlogCard({ post }) {
  return (
    
  
    
    <div className="bg-slate-200 w-full md:w-[460px] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4 sm:p-6 md:p-8">
        
        <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">
          {post.title}
        </h3>
       
        <p className="text-gray-600 text-sm mb-4 line-clamp-3"> 
          {post.description}
        </p>
        
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-500">
        
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-0"> 
            <span className="flex items-center gap-1">
              <User size={14} /> {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {post.Content} 
            </span>
          </div>
         
          <Link 
            href={`/blog/${post.id}`} 
            className="text-blue-600 hover:underline flex items-center gap-1 sm:gap-2"
          >
            Read now 
           
            
          </Link>
        </div>
      </div>
    </div>
  );
}