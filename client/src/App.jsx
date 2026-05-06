import './App.css'
import { Outlet } from "react-router";
import { ValidateLogin } from './Components/RoutesValidate/ValidateLogin';
import Navbar from './Components/Navbar/Navbar';

function App() {

  return (
    <ValidateLogin>
      <div className="contentContainer">
        <Navbar/>
        <main>
          <Outlet/>
        </main>
      </div>
    </ValidateLogin>
  )
}

export default App
