import './App.css'
import { Outlet } from "react-router";
import Navbar from './Components/Navbar/Navbar';

function App() {

  return (
    <div className="contentContainer">
      <Navbar/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default App
