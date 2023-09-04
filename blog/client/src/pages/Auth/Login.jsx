import cls from "./auth.module.scss";
import Card from '../../components/Card/Card.jsx'
import Title from '../../components/Title/Title.jsx'
import Form from '../../components/Form/Form.jsx'
import Input from '../../components/Inputs/Input.jsx'
import Button from '../../components/Button/Button.jsx'
import { TitleFw, TitleSize } from "../../components/Title/Title.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { login } from '../../store/actions/actions.js'
import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { username, password } = userData;

  // const handleChange = (e) => {
  //   setUserData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  // };
 

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(userData));
    navigate('/');
  };

  return (
    <Card className={cls.auth}>
      <Title color="red" as="h1" size={TitleSize.size24} fw={TitleFw.fw700}>
        Войти
      </Title>

      <Form className={cls.form} onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="username"
          name="username"
          value={username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />

        <Button type="submit" max>
          {authData.loading ? "Loading..." : "Войти"}
        </Button>
      </Form>
    </Card>
  );
};

export default Login;