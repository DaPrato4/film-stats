import './App.css'
import logo from './assets/logo.png';
import ImgHome from './assets/ImgHome.jpg';
import sfondoHome from './assets/tempBkg.jpg';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios";
import { ReactNode, useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "it-IT",
  },
});

const fetchFromApi = async (url: string) => {
  try {
    const response = await api.get(url);
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

function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
    
      useEffect(() => {
        const getMovies = async () => {
          const data = await fetchFromApi("/trending/movie/week");
          setMovies(data);
        };
        getMovies();
      }, []);

  return (
    <>
      <div id='home' className="flex flex-col items-center justify-center h-screen">
        <img src={sfondoHome} className="w-screen h-screen absolute top-0 left-0 -z-10 blur-md background-image" alt="Sfondo" />
        <a className="absolute top-10 left-10 flex items-center cursor-pointer text-blue-50" href="http://www.jevis.it">
          <img src={logo} className="w-12 h-12 mr-5" alt="Logo" />
          <span>Jevis Kernel</span>
        </a>
        <div className="flex items-center justify-between">
          <div>
              <h1 className="text-4xl font-bold mb-10">Analyse Data to Improve the Future</h1>
              <span className="space-x-4 my-4">
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
                  onClick={() => document.getElementById('data-table')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Data Table
                </button>
                <button 
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 cursor-pointer"
                  onClick={() => document.getElementById('Interactive-Chart')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Interactive Chart
                </button>
              </span>
          </div>
          <img src={ImgHome} className='ImgHome w-2/5 h-auto' alt='Immagine analisi dati'/>
        </div>
      </div>

      {/* Seconada parte tabella */}
      <div id='data-table' className='flex flex-col justify-center'>
        <h1 className="relative top-2 left-0 m-4">Data Table</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Titolo</TableHead>
              <TableHead className='text-center'>Data di uscita</TableHead>
              <TableHead className='text-center'>Media voto</TableHead>
              <TableHead className='text-center'>Lingua originale</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell className="border px-4 py-2">{movie.title}</TableCell>
                <TableCell className="border px-4 py-2">{movie.release_date}</TableCell>
                <TableCell className="border px-4 py-2">{movie.vote_average}</TableCell>
                <TableCell className="border px-4 py-2">{movie.original_language}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>

      {/* terza parte grafici */}
      <div id='Interactive-Chart'>
        <h1 className="relative top-2 left-0 m-4">Grafico interattivo</h1>
      </div>
    </>
  )
}

export default App
