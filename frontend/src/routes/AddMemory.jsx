import { useForm } from "react-hook-form";

import "./AddMemory.css";
import axios from "../axios-config";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";

const CreateMemoryForm = z.object({
  title: z.string().nonempty("O título é obrigatório"),
  description: z.string().nonempty("A descrição é obrigatório"),
  image: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "A imagem é obrigatória",
  }),
});

const AddMemory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateMemoryForm),
  });

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.image[0] instanceof File) {
      formData.append("image", data.image[0]);
    }
    try {
      const response = await axios.post("/memories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.msg);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="add-memory-page">
      <h2>Crie uma nova memória</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Input
            text="Título"
            name="name"
            type="text"
            placeholder="Defina um titulo"
            {...register("title")}
            helperText={errors?.title?.message}
          />
           <TextArea
            text="Descrição"
            {...register("description")}
            placeholder="Diga o que aconteceu nesta memória"
            helperText={errors?.description?.message}
          />
        <label>
          <p>Foto</p>
          <input type="file" {...register("image")} accept="image/*" />
          <span className="error-msg">{errors.image?.message}</span>
        </label>
        <input type="submit" className="btn" value="Enviar" />
      </form>
    </div>
  );
};

export default AddMemory;
