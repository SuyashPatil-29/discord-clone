import './App.css'
import Header from './components/Header'
import Home from './components/Home';
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

function App() {

  return (
    <div className="overflow-hidden">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Header />} />
    <Route exact path="/channels" element={<Home /> }/>
    <Route exact path='/channels/:id' element={<Home />} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
