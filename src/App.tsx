import './App.css'
import logo from './assets/logo.png';
import ImgHome from './assets/ImgHome.jpg';
import sfondoHome from './assets/tempBkg.jpg';
import axios from "axios";
import { ReactNode, useEffect, useState } from 'react';

import { MyResponsiveLine } from './components/InteractiveLine';
// import { MyResponsiveBar } from './components/ResponsiveBar';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
let allDataForDatiGRafico2: { x: number, y: number }[] = [];
// const tempChar1Date = [
//   {
//     "country": "AD",
//     "hot dog": 53,
//     "hot dogColor": "hsl(10, 70%, 50%)",
//     "burger": 142,
//     "burgerColor": "hsl(2, 70%, 50%)",
//     "sandwich": 130,
//     "sandwichColor": "hsl(310, 70%, 50%)",
//     "kebab": 145,
//     "kebabColor": "hsl(267, 70%, 50%)",
//     "fries": 154,
//     "friesColor": "hsl(44, 70%, 50%)",
//     "donut": 179,
//     "donutColor": "hsl(351, 70%, 50%)"
//   },
//   {
//     "country": "AE",
//     "hot dog": 41,
//     "hot dogColor": "hsl(311, 70%, 50%)",
//     "burger": 166,
//     "burgerColor": "hsl(243, 70%, 50%)",
//     "sandwich": 198,
//     "sandwichColor": "hsl(215, 70%, 50%)",
//     "kebab": 74,
//     "kebabColor": "hsl(155, 70%, 50%)",
//     "fries": 51,
//     "friesColor": "hsl(123, 70%, 50%)",
//     "donut": 94,
//     "donutColor": "hsl(100, 70%, 50%)"
//   },
//   {
//     "country": "AF",
//     "hot dog": 45,
//     "hot dogColor": "hsl(226, 70%, 50%)",
//     "burger": 37,
//     "burgerColor": "hsl(329, 70%, 50%)",
//     "sandwich": 3,
//     "sandwichColor": "hsl(43, 70%, 50%)",
//     "kebab": 46,
//     "kebabColor": "hsl(166, 70%, 50%)",
//     "fries": 99,
//     "friesColor": "hsl(202, 70%, 50%)",
//     "donut": 85,
//     "donutColor": "hsl(209, 70%, 50%)"
//   },
//   {
//     "country": "AG",
//     "hot dog": 199,
//     "hot dogColor": "hsl(60, 70%, 50%)",
//     "burger": 159,
//     "burgerColor": "hsl(118, 70%, 50%)",
//     "sandwich": 74,
//     "sandwichColor": "hsl(341, 70%, 50%)",
//     "kebab": 177,
//     "kebabColor": "hsl(49, 70%, 50%)",
//     "fries": 181,
//     "friesColor": "hsl(257, 70%, 50%)",
//     "donut": 92,
//     "donutColor": "hsl(188, 70%, 50%)"
//   },
//   {
//     "country": "AI",
//     "hot dog": 15,
//     "hot dogColor": "hsl(35, 70%, 50%)",
//     "burger": 173,
//     "burgerColor": "hsl(248, 70%, 50%)",
//     "sandwich": 81,
//     "sandwichColor": "hsl(224, 70%, 50%)",
//     "kebab": 106,
//     "kebabColor": "hsl(239, 70%, 50%)",
//     "fries": 64,
//     "friesColor": "hsl(36, 70%, 50%)",
//     "donut": 199,
//     "donutColor": "hsl(175, 70%, 50%)"
//   },
//   {
//     "country": "AL",
//     "hot dog": 100,
//     "hot dogColor": "hsl(56, 70%, 50%)",
//     "burger": 152,
//     "burgerColor": "hsl(294, 70%, 50%)",
//     "sandwich": 10,
//     "sandwichColor": "hsl(72, 70%, 50%)",
//     "kebab": 198,
//     "kebabColor": "hsl(93, 70%, 50%)",
//     "fries": 18,
//     "friesColor": "hsl(246, 70%, 50%)",
//     "donut": 151,
//     "donutColor": "hsl(176, 70%, 50%)"
//   },
//   {
//     "country": "AM",
//     "hot dog": 117,
//     "hot dogColor": "hsl(298, 70%, 50%)",
//     "burger": 40,
//     "burgerColor": "hsl(91, 70%, 50%)",
//     "sandwich": 112,
//     "sandwichColor": "hsl(287, 70%, 50%)",
//     "kebab": 115,
//     "kebabColor": "hsl(286, 70%, 50%)",
//     "fries": 185,
//     "friesColor": "hsl(134, 70%, 50%)",
//     "donut": 159,
//     "donutColor": "hsl(255, 70%, 50%)"
//   }
// ]

let datiGrafico2:DataG2[] = [
  {
    "id": "Media Voto",
    "color": "hsl(27, 70%, 50%)",
    "data": []
  }
]

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

interface DataG2 {
  id: string;
  color: string;
  data: object[];
}

interface Movie {
  original_language: string;
  vote_average: ReactNode;
  release_date: ReactNode;
  id: number;
  title: string;
}

function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [years, setYears] = useState<Number[]>([]);


  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchFromApi("/trending/movie/week");
      setMovies(data);
    };
    getMovies();
  }, []);

  // costruzione dati per grafico
  
  useEffect(() => {
    let objarray: any[] = [];
    movies.forEach((movie) => {
      let obj: { y: number, v:number }={
        y:0,
        v:0
      };
      if (movie.release_date) {
        obj.y = parseInt(movie.release_date.toString().slice(0, 4));
      }
      if(movie.vote_average){
        obj.v = parseFloat(movie.vote_average.toString());
      }
      objarray.push(obj);
    })
    let arrData:number[]=[];
    let arrNum:number[]=[];
    objarray.forEach((obj) => {
      (arrData[obj.y])? arrData[obj.y]+=obj.v : arrData[obj.y]=obj.v;
      (arrNum[obj.y])? arrNum[obj.y]++ : arrNum[obj.y]=1;
    })
    let data1:{x:number,y:number}={x:0,y:0};
    for (let i = 1900; i < arrData.length; i++) {
      data1 = {x:0,y:0}
      if(arrData[i]>0){
        data1 = {
          x: i,
          y: arrData[i]/arrNum[i]
        }    
        allDataForDatiGRafico2.push(data1);

      }
    }
  },[movies]);

  useEffect(() => {
    datiGrafico2[0].data = allDataForDatiGRafico2.filter((obj: { x: number, y: number }) => years.includes(obj.x));
  }
  ,[years]);


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
      <div id='Interactive-Chart' className='bg-white mb-[50px]'>
        <h1 className="relative top-2 left-0 m-4 text-black">Grafico interattivo</h1>
        <span className="flex justify-between space-x-4">
          <div id="Selezione-Anno" className="w-1/3">
            <h2 className='text-black mb-3'>Seleziona Anno:</h2>
            <form 
              className="flex flex-row space-x-4 text-black justify-center mb-4"
              onSubmit={(e) => {
              e.preventDefault();
              const yearInput = (e.target as HTMLFormElement).year as HTMLInputElement;
              const year = parseInt(yearInput.value);
              (!years.includes(year) && year < 2100 && year > 1900) ? setYears([...years, year]) : alert('Anno non valido o già presente');
              }}
            >
              <input type="number" id="year" name="year" className="border rounded px-2 py-1" placeholder="Inserisci anno" />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">Invia</button>
            </form>

            <div className="flex flex-col items-center">
              {years.map((year) => (
                <div key={year.toString()} className="flex items-center text-white justify-center bg-blue-900 p-1.5 w-21 m-2 rounded">
                <span>{year.toString()}</span>
                <button 
                className="ml-2 text-white bg-red-500 rounded w-7.5 h-7.5 text-2xl cursor-pointer leading-0 hover:bg-red-700"
                onClick={() => {
                  setYears(years.filter(y => y !== year));
                }}
                >
                x
                </button>
                </div>
              ))}
            </div>
           

          </div>
          <div id="Film-Per-Anno" className="w-1/3 h-[500px] bg-amber-400">
            {/* <MyResponsiveBar data={tempChar1Date} /> */}
            {/* al momento non funziona */}
            <div className='bg-black'></div>
          </div>
          <div id="Valutazione-Media-Per-Anno" className="w-1/3 h-[500px]">
            <MyResponsiveLine data={datiGrafico2} />
          </div>
        </span>
        
      </div>
    </>
  )
}


export default App
