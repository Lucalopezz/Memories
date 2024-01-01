import axios from "../axios-config";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


//Toast e css
import { toast } from "react-toastify";
import "./Memory.css";


//Zod e form
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";



//React icons
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const CreateCommentForm = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  text: z.string().nonempty("O comentário é obrigatório"),
});

const Memory = () => {
  const { id } = useParams();
  const [memory, setmemory] = useState(null);
  const [comments, setcomments] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateCommentForm),
  });

  const onSubmit = async (data) => {
    try {
      let name = data.name;
      let text = data.text;

      const commentAdd = { name, text };

      //console.log(commentAdd);

      const res = await axios.patch(
        `/memories/${memory._id}/comment/`,
        commentAdd
      );

      const lastComment = res.data.memory.comments.pop();

      setcomments((comments) => [...comments, lastComment]);

      toast.success(res.data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    const getMemory = async () => {
      const res = await axios.get(`/memories/${id}`);
      setmemory(res.data);

      setcomments(res.data.comments);
    };
    getMemory();
  }, []);

  if (!memory) return <p>Carregando...</p>;
  return (
    <div className="memory-page">
      <img src={`${axios.defaults.baseURL}${memory.src}`} alt={memory.title} />
      <div className="infos">
        <button className="btn favorite-btn">
          {memory.favorite ? <FaHeart /> : <FaRegHeart />}
        </button>
        <div>
          <h2>{memory.title}</h2>
          <p>{memory.description}</p>
        </div>
      </div>
      <div className="comment-form">
        <h3>Envie o seu comentário:</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <p>Título</p>
            <input
              type="text"
              placeholder="Digite seu nome"
              {...register("name")}
            />
            <span className="error-msg">{errors.name?.message}</span>
          </label>
          <label>
            <p>Título</p>
            <textarea
              {...register("text")}
              placeholder="O que você achou da memória?"
            ></textarea>
            <span className="error-msg">{errors.text?.message}</span>
          </label>
          <input type="submit" className="btn" value="Enviar" />
        </form>
      </div>
      <div className="comments-container">
        <h3>Comentários ({comments.length})</h3>
        {comments.length === 0 && <p>Não há comentários</p>}
        {comments.length > 0 &&
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p className="comment-name">{comment.name}</p>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Memory;
