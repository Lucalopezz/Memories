import axios from "../axios-config";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//React icons e css
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import "./Home.css";

//Toast
import { toast } from "react-toastify";

const Home = () => {
  const [memories, setmemories] = useState([]);

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
  return (
    <div className="home">
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
