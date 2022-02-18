import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import PrivateRoute from './utils/PrivateRoute';
import LoginPage from './components/LoginPage';
import { AuthProvider } from './utils/AuthContext';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header/>
          <PrivateRoute component={HomePage} path="/" exact/>
          <Route component={LoginPage} path="/login"/>
          <Footer/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
