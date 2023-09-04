import React, { useEffect, useState } from "react";
import cls from "./homePage.module.scss";
import ArticleCard from "../../components/ArticleCard/Article.jsx";
import Title from "../../components/Title/Title";
import axios from "axios";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const data = useSelector((state) => state.auth.userId)
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/articles");
        setArticles(response.data.articles);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticles();
  }, []);


  return (
    <div className={cls.home}>
      <Title size={24} fw={700} className={cls.title}>
        Unusual blog
      </Title>
      <div className={cls.articles}>
        {articles.map((article) => (
          <ArticleCard
            user = {article.userId}
            id= {article._id}
            title={article.title}
            content={article.content}
            createdAt={article.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;