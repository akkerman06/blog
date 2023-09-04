import cls from "./auth.module.scss";
import Card from '../../components/Card/Card.jsx'
import Title from '../../components/Title/Title.jsx'
import Form from '../../components/Form/Form.jsx'
import Input from '../../components/Inputs/Input.jsx'
import Button from '../../components/Button/Button.jsx'
import { TitleFw, TitleSize } from "../../components/Title/Title.jsx";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios"
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/registr', {
        username,
        password,
        confirmPassword
      });

      console.log(response.data);
      if(response.data.message === 'успешно зарег'){
        window.location = '/login'
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
      <Card className={cls.auth}>
        <Title as="h1" size={TitleSize.size24} fw={TitleFw.fw700}>
          Регистраци
        </Title>

        <Form className={cls.form}>
          <Input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" />
          <Input onChange={(e) => setPassword(e.target.value)}  type="password" placeholder="password" />
          <Input onChange={(e) => setConfPassword(e.target.value)}  type="password" placeholder="confirm password" />
    
          <Button onClick={handleRegister} max>Регистрация</Button>
        </Form>
      </Card>
  );
};

export default Register;