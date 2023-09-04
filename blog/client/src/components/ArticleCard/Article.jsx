import React, { useId, useState } from "react";
import cls from "./article.module.scss";
import Title  from "../Title/Title.jsx";
import Icon from "../../assets/Vector.svg"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const ArticleCard = ({  id , title, content, createdAt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(false);
  const [articles, setArticles] = useState([]);

  const params = useParams();
  const onOpen = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const deleteBlog = async (id) => {
    try{
      const token = localStorage.getItem('accessToken')
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const responce = await axios.delete(`http://localhost:5000/api/delete/${id}`,
      {

      },
      {
        headers: {
          authorization: token,
        }
        });
        window.location.reload();
      
    } catch(e){
      console.log(e)
    }     

    

}
  return (
    <Link to = {`/post/${id}`} className={cls.articleCard}>
      <div className={cls.header}>
        <Title className={cls.red} as="h2" size={24} fw={700}>
          {title}
        </Title>

        <div className={cls.icon}  onClick={onOpen}>
          <img className={`${isOpen ?  cls.openIcon : ''}`} src={Icon} alt="" />

            {isOpen && (
              <ul className={cls.list}>
                <li className={cls.item}> <button  className={cls.bth}>  Редактировать</button></li>
                
                <li className={cls.item}><button onClick={() => deleteBlog(id)} className={cls.bth}> Удалить</button></li>
              </ul>
            )}
        </div>
      </div>

      <Title size={12} as="span" fw={400}>
        {createdAt}
      </Title>
      <Title fw={500}>{content}</Title>
    </Link>
  );
};


export default ArticleCard;