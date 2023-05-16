import './App.css';
import { Route, Routes } from "react-router-dom";
import Homepage from './Components/Homepage';
import AddNote from './Components/AddNote';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/add" element={<AddNote/>}/>
        <Route path="/add/:id" element={<AddNote/>}/>
      </Routes>
    </div>
  );
}

export default App;
