import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './routes';
import {NavBar} from './Common/Navbar';

function App() {
  return (
    <div className="App">

      <Router>
        <NavBar />
        <Routes>

          {routes.map((route, index) => (
            <Route key={index} exact path={route.path} element={route.component}
            />
          ))}
        </Routes>

      </Router>
    </div>
  );
}

export default App;
