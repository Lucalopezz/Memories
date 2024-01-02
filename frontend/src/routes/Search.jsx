import axios from "../axios-config";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";


const Search = () => {
  const [searchParams] = useSearchParams();
  const [memories, setMemories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getMemories = async () => {
      try {
        const res = await axios.get("/memories");
        setMemories(res.data);
      } catch (error) {
        console.error("Error fetching memories:", error);
      }
    };

    getMemories();
  }, []);

  //busca
  useEffect(() => {
    const searchTerm = searchParams.get("q");

    if (searchTerm) {
      const filteredMemories = memories.filter((memory) =>
        memory.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredMemories);
    } else {
      setSearchResults([]);
    }
  }, [searchParams, memories]);

  return (
    <div>
      <h1>Resultados da pesquisa:</h1>
      <p>Termo de busca: {searchParams.get("q")}</p>
      

      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((memory) => (
            <div className="memory" key={memory._id}>
              <img
                src={`${axios.defaults.baseURL}${memory.src}`}
                alt={memory.title}
              />
              <p>{memory.title}</p>
              <div className="actions">
                <Link className="btn" to={`/memories/${memory._id}`}>
                  Acessar
                </Link>
                
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p>Nenhum resultado encontrado.</p>
      )}
    </div>
  );
};

export default Search;
