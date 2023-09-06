import logo from './logo.svg';
import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import AddEmployeeComponent from './components/AddEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
      <Header/>
      <div className='container'>
      {/* In React Router version 6, the <Switch> component has been deprecated and replaced with the <Routes> component.  */}
        <Routes>
          <Route exact path='/' Component={ListEmployeeComponent}></Route>
          <Route exact path='/employees' Component={ListEmployeeComponent}></Route>
          <Route exact path='/add-employee' Component={AddEmployeeComponent}></Route>
          <Route exact path='/edit-employee/:id' Component={AddEmployeeComponent}></Route>
         
        </Routes>
        </div>
     
      </Router>
      <Footer/>

    </div>
  );
}

export default App;
