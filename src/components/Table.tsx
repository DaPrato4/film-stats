import axios from "axios";
import { useState, useEffect, ReactNode } from "react";

const API_KEY = "3d3c3edb6980b5a1e057bb8788b5f5f5"; 
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "it-IT",
  },
});

const fetchTrendingMovies = async () => {
  try {
    const response = await api.get("/trending/movie/week");
    return response.data.results;
  } catch (error) {
    console.error("Errore nel recupero dei dati", error);
    return [];
  }
};

interface Movie {
  original_language: string;
  vote_average: ReactNode;
  release_date: ReactNode;
  id: number;
  title: string;
}

const MoviesList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
  
    useEffect(() => {
      const getMovies = async () => {
        const data = await fetchTrendingMovies();
        setMovies(data);
      };
      getMovies();
    }, []);
  
    return (
    <div>
        <table className="w-full text-left border border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Titolo</th>
            <th className="border px-4 py-2">Data di uscita</th>
            <th className="border px-4 py-2">Voto</th>
            <th className="border px-4 py-2">Lingua Originale</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td className="border px-4 py-2">{movie.title}</td>
              <td className="border px-4 py-2">{movie.release_date}</td>
              <td className="border px-4 py-2">{movie.vote_average}</td>
              <td className="border px-4 py-2">{movie.original_language}</td>
            </tr>
          ))}
        </tbody>
          </table>
      </div>
    );
  };
  
  export default MoviesList;