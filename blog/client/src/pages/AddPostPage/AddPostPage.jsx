import React from "react";
import cls from "./addPostPage.module.scss";
import Card from '../../components/Card/Card.jsx'
import Title from '../../components/Title/Title.jsx'
import Form from '../../components/Form/Form.jsx'
import Input from '../../components/Inputs/Input.jsx'
import Button from '../../components/Button/Button.jsx'
import addfile from "../../assets/addfile.png"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import addFile from '../../assets/addfile.png'


const AddPostPage = () => {
  const [createdArticle, setCreatedArticle] = useState(null);
  const [title, setTitle] = useState();
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState();
  const [content, setContent] = useState();
  const [token, setToken] = useState(""); 



  // const handleChangeFiles = (e) => {
  //   const newFiles = [...e.target.files];

  //   if (newFiles.length > 0) {
  //     setFiles([...files, ...newFiles]);
  //   }
  // };
 const handleFileChange = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post(
        'http://localhost:5000/upload',
        title,
        content,
        files,
      );
      setImageUrl(data.url);
    } catch (error) {
      console.error(error);
    }
  };


  const navigate = useNavigate();
  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem('accessToken');
       setToken(token);
    };

    getToken();
  }, []);

  const createArticle = async (e) => {
    try {
      
      const token = localStorage.getItem('accessToken')
   

      const response = await axios.post(
        
        "http://localhost:5000/api/article", 
        {
          title,
          content,
          files,
          picture: imageUrl,
        },
        {
        headers : {
          Authorization: token,
            }
        },
 
      );

      console.log(response.data);

      if (response.data.message === "успех") {
        setCreatedArticle(response.data.article);
        console.log(response.data);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };



  return (
    <Card className={cls.cardAddPost}>
      <Title size={24}>
        Добавить Пост
      </Title>
      <div className={cls.addfile}>
        <label  className={cls.addinput} htmlFor="file">
           <Input
                type="file"
                id="upload-input"
                name="picture"
                className={cls.file}
                accept="image/*,.png, .jpg,.jpeg,.web"
                onChange={handleFileChange}
              />

                {imageUrl ? (
                  <img src={`http://localhost:5000${imageUrl}`} alt="AddFile" />
                ) : (
                  <>
                    <img src={addFile}  alt="AddFile" />
                    <span>Выберите файл(ы)</span>                  
                  </>

                )}

                
        </label>
      </div>

      <div className={cls.inputs}>
       <Input onChange={(e) => setTitle(e.target.value)} type='text' placeholder="введите название поста"></Input>
       <p onChange={(e) => setCategory(e.target.value)}  className="select"> <select  name="select" id=""> <option value="">Выберите</option>
       <option value="">спорт</option>
       <option value="">новости</option>
       <option value="">блог</option>
       
        </select></p>
       <textarea onChange={(e) =>  setContent(e.target.value)} className={cls.desc} name="" id="" cols="30" rows="10" placeholder="добавьте описание"></textarea>
      </div>

      <Button onClick={createArticle} max>Добавить</Button>
    </Card>
  );
};

export default AddPostPage;