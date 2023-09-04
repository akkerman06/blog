import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import cls from "./detailPage.module.scss"
import axios from 'axios';
import Title from "../../components/Title/Title";

import like from '../../assets/Like.svg';
import view from '../../assets/view.svg';
import avatar from '../../assets/avatar.png';

export const ArticlePage = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/post/${params.id}`
        );
        if (response.data) {
          setData([response.data.post]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getArticle();
  }, []);

  // const likePost = async () => {
  //   setIsLiked(!isLiked)
  //   const accToken = localStorage.getItem('token');
  //   try {
  //     const res = await $api.patch(
  //       `/post/${params.id}`,
  //       {
  //         likes: [params.id]
  //       },
  //       {
  //         headers: {
  //           Authorization: accToken,
  //         },
  //       }
  //     );
  //     if (res.data) {
  //       console.log(res.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="container">
      {data.map((post) => (
        <div className={cls.wrapper}>
          <div className={cls.img_Wrap}>
            <img
              className={cls.image}
              src={`http://localhost:5000${post.files}`}
              alt="img"
            />

          </div>

          <div className={cls.content}>
            <div className={cls.main}>
              <Title className={cls.title}>{post.title}</Title>
              <span className={cls.category}>{post.category}</span>
              <p className={cls.text}>{post.content}</p>
            </div>
            <div className={cls.blogInfo}>
              <div className={cls.author}>
                <img
                  className={cls.avatar}
                  width={35}
                  height={35}
                  src={avatar}
                  alt=""
                />
              </div>
              <div className={cls.likesAndViews}>
                <div className={cls.likes}>
                  <img src={like} alt="like" />
                </div>
                <div className={cls.views}>
                  <img src={view} alt="view" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
