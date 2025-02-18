import './App.css'
import logo from './assets/logo.png';
import ImgHome from './assets/ImgHome.jpg';
import sfondoHome from './assets/tempBkg.jpg';
import Table from './components/Table';

function scroll(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function App() {

  return (
    <>
      <div id='home' className="flex flex-col items-center justify-center h-screen">
        <img src={sfondoHome} className="w-screen h-screen object-cover absolute top-0 left-0 -z-10 blur-md background-image" alt="Sfondo" />
        <div className="logo top-left flex items-center">
          <img src={logo} className="w-12 h-12 mr-2" alt="Logo" />
          <span>Jevis Kernel</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
              <h1 className="text-4xl font-bold mb-4">Analyse Data to Improve the Future</h1>
              <span className="space-x-4 my-4">
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={() => scroll("data-table")}
                >
                  Data Table
                </button>
                <button 
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                  onClick={() => scroll("data-table")}
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
        <Table />
      </div>

      {/* terza parte grafici */}
      <div id='Interactive-Chart'>
        <h1 className="relative top-2 left-0 m-4">Grafico interattivo</h1>
      </div>
    </>
  )
}

export default App
