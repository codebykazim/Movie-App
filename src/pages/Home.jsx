import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { Search } from 'lucide-react'
import {getPopularMovies,searchMovies} from '../services/api'
import { Loader } from 'lucide-react';

function Home() {

    const[searchQuery,setSearchQuery]=useState('');
    const[movies,setMovies]=useState([]);
    const[error,setError]=useState(null);
    const[loading,setLoading]=useState(true);

    useEffect(()=>{
        const loadMovies=async()=>{
            try {
                const popularMovies=await getPopularMovies();
                setMovies(popularMovies);

            } catch (error) {
                console.log(error);
                setError('Failed to load movies...')

            } finally{
                setLoading(false);

            }
        }
        loadMovies()
    },[])

    const handleForm=async(e)=>{
        e.preventDefault()
        if(!searchQuery.trim()) return;
        if(loading) return;

        setLoading(true);
        try {
            const searchResult= await searchMovies(searchQuery);
            setMovies(searchResult);
            setError(error);

        } catch (error) {
            console.log(error);

            setError('Failed to search movies....')

        } finally{
            setLoading(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleForm} className="max-w-4xl mx-auto mb-8">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for movies..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Search
              </button>
            </div>
          </form>
          {loading ? (
  <div className="flex justify-center items-center min-h-screen w-full">
    <Loader className="animate-spin text-purple-500" size={40} />
  </div>
) : (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {movies.map(movie => (
      <MovieCard movie={movie} key={movie.id} />
    ))}
  </div>
)}


        </div>

      )
    }

export default Home