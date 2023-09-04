import cls from "./Header.module.scss";
import Button from "../Button/Button";
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [checkToken  , setCheckToken] = useState()
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setCheckToken(true)
    }
  }, [localStorage.getItem('accessToken')]);

  const Logout = async (e) => {
    e.preventDefault();
    
    try {
      localStorage.removeItem('accessToken')
      window.location = '/'

      // const response = await axios.post('http://localhost:5000/api/logout', {
      // },
      // {
      //   withCredentials: true
      // });

      // // console.log(response.data);
      // // if(response.data.message === 'успех'){
      // //   window.location = '/'
      // // }
      // setCheckToken(false);

    } catch (error) {
      console.log(error.response.data);
    }
  }


  

  return (
    <div className={cls.header}>
      <div className="container">
        <div className={cls.wrap}>
          <Link to="/" className={cls.logo}></Link>

          <div className={cls.btns}>
            {checkToken  && (
              <>

              <Button to="/addPost">Создать пост</Button>
              <Button onClick={Logout}>Выйти</Button>

                <Link to='/' className={cls.logo}></Link>
                <span> {user} </span>
              </>
            )}
            {!checkToken  &&   (
              <>
              <Button to="/login">войти</Button>
              <Button to="/registr">Регистраци</Button>
              
              </>              
            )}
  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;