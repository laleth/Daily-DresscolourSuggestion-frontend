import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import About from './component/About';
import Addupdateprofile from './component/Addupdateprofile'
import { useState } from 'react';
import Passwordreset from './component/Passwordreset';
import Deleteuser from './component/Deleteuser';
import Viewprofile from './component/Viewprofile';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Login setAuthenticated={setAuthenticated}/>}
          />
          <Route
            path="/home"
            element={authenticated ? <Home /> : <Navigate to="/" />}
          />
           <Route path="/password-reset" element={<Passwordreset/>}/>
           <Route path="/about" element={authenticated ? <About /> : <Navigate to="/" />} />
          <Route
            path="/add"
            element={authenticated ? <Addupdateprofile /> : <Navigate to="/" />}
          />
          <Route
            path="/view"
            element={authenticated ? <Viewprofile/> : <Navigate to="/" />}
          />
          <Route
            path="/delete-account"
            element={authenticated ? <Deleteuser /> : <Navigate to="/" />}
          />
        </Routes>  
      </Router>
    </div>
  );
}

export default App;
