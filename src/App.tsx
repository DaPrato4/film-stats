import './App.css'
import logo from './assets/logo.png';
import ImgHome from './assets/ImgHome.jpg';
import sfondoHome from './assets/tempBkg.jpg';

function App() {

  return (
    <>
      <div className="background-image">
        <img src={sfondoHome} className="w-screen h-screen object-cover absolute top-0 left-0 -z-10 blur-md" alt="Sfondo" />
      </div>
      <div className="logo top-left flex items-center">
        <img src={logo} className="w-12 h-12 mr-2" alt="Logo" />
        <span>Jevis Kernel</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold mb-4">Analyse Data to Improve the Future</h1>
            <span className="space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Data Table</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Interactive Chart</button>
            </span>
        </div>
        <img src={ImgHome} className='ImgHome w-2/5 h-auto' alt='Immagine analisi dati'/>
      </div>
      
    </>
  )
}

export default App
