import axios from "../axios-config";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//React icons e css
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";

import "./Home.css";

//Toast
import { toast } from "react-toastify";

const Home = () => {
  const [memories, setmemories] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState();

  useEffect(() => {
    const getMemories = async () => {
      const res = await axios.get("/memories");

      setmemories(res.data);
    };
    getMemories();
  }, []);

  const favoriteMemory = async (id) => {
    try {
      const res = await axios.patch(`memories/favorite/${id}`);
      toast.success(res.data.msg);

      setmemories((prevMemories) =>
        prevMemories.map((memory) =>
          memory._id === id ? { ...memory, favorite: !memory.favorite } : memory
        )
      );
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const search = (e) => {
    e.preventDefault();

    navigate("/search?q=" + query);
  };
  return (
    <div className="home">
      <div class="search-container">
        <form onSubmit={search} class="search">
          <div class="input-btn-container">
            <input
              type="text"
              placeholder="Digite o nome da memória que você deeja encontrar"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" class="btn">
              <FaSearch />
            </button>
          </div>
        </form>
      </div>
      <h2>Confira as ultimas Memórias</h2>
      <div className="memories-container">
        {memories.length > 0 &&
          memories.map((memory) => (
            <div className="memory" key={memory._id}>
              <img
                src={`${axios.defaults.baseURL}${memory.src}`}
                alt={memory.title}
              />
              <p>{memory.title}</p>
              <div className="actions">
                <Link className="btn" to={`/memories/${memory._id}`}>
                  Comentar
                </Link>
                <button
                  onClick={() => favoriteMemory(memory._id)}
                  className="btn favorite-btn"
                >
                  {memory.favorite ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
