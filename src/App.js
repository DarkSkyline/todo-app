import { useState } from 'react';
import './App.css';
import Todo from './components/Todo'
import Register from './pages/Register'

function App() {
  const [logged, setLogged] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
       <div>
         <Register />
         {logged ? <Todo /> : ''}
       </div>
      </header>
    </div>
  );
}

export default App;
