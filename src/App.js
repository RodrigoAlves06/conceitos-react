import React , {useState , useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositorios, setRepositorios] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('/repositories',{
      title:`Perfil Rodrigo 06 ${Date.now()}`,
      url:"https://github.com/RodrigoAlves06",
      techs:['C#,Sql' ,  'Server'],
    });
    const repositorio = response.data;
    setRepositorios([...repositorios, repositorio]);
  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`/repositories/${id}`);
      setRepositorios(repositorios.filter((repositorio) => repositorio.id !== id));    

  }

  useEffect(() =>{
    api.get('/repositories').then(response =>{
      setRepositorios(response.data);
      
    })
  },[]);

  return (
    
    <div>
      <ul data-testid="repository-list">
        {repositorios.map(repositorio => <li key={repositorio.id}>
          {repositorio.title}
            
          <button onClick={() => handleRemoveRepository(repositorio.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
    
  );
}

export default App;
