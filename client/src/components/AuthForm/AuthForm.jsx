import { useState } from 'react';
import styles from './AuthForm.module.css';
import { Input, Button } from '@chakra-ui/react';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
const { VITE_API } = import.meta.env;

export default function AuthForm({ title, type = 'signin', setUser }) {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axiosInstance.post(`${VITE_API}/auth/${type}`, inputs);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
    navigate('/');
  };

  return (
    <form onSubmit={submitHandler} className={styles.wrapper}>
      <h3 className={styles.head}>{title}</h3>
      <div className={styles.inputs}>
        {type === 'signin' && (
          <>
            <Input
              onChange={changeHandler}
              type='email'
              name='email'
              value={inputs?.email}
              placeholder='Электронная почта'
              sx={{
                borderColor: 'black', 
                _hover: {
                  borderColor: 'pink', 
                  backgroundColor: 'yellow.100', 
                },
                _placeholder: {
                  color: 'pink.400', 
                },
              }}
            />
            <Input
              onChange={changeHandler}
              type='password'
              name='password'
              value={inputs?.password}
              placeholder='Пароль'
              sx={{
                borderColor: 'black', 
                _hover: {
                  borderColor: 'pink', 
                  backgroundColor: 'yellow.100', 
                },
                _placeholder: {
                  color: 'pink.400', 
                },
              }}
            />
          </>
        )}
        {type === 'signup' && (
          <>
            <Input
              onChange={changeHandler}
              name='username'
              value={inputs?.name}
              placeholder='Имя пользователя'
              sx={{
                borderColor: 'black', 
                _hover: {
                  borderColor: 'pink', 
                  backgroundColor: 'yellow.100', 
                },
                _placeholder: {
                  color: 'pink.400', 
                },
              }}
            />
            <Input
              onChange={changeHandler}
              type='email'
              name='email'
              value={inputs?.description}
              placeholder='Электронная почта'
              sx={{
                borderColor: 'black', 
                _hover: {
                  borderColor: 'pink', 
                  backgroundColor: 'yellow.100', 
                },
                _placeholder: {
                  color: 'pink.400', 
                },
              }}
            />
            <Input
              onChange={changeHandler}
              type='password'
              name='password'
              value={inputs?.password}
              placeholder='Пароль'
              sx={{
                borderColor: 'black', 
                _hover: {
                  borderColor: 'pink', 
                  backgroundColor: 'yellow.100', 
                },
                _placeholder: {
                  color: 'pink.400', 
                },
              }}
            />
          </>
        )}
      </div>
      <div className={styles.btns}>
        {type === 'signin' && (
          <Button type='submit' colorScheme='blue'>
            Вход
          </Button>
        )}
        {type === 'signup' && (
          <Button type='submit' colorScheme='blue'>
            Регистрация
          </Button>
        )}
      </div>
    </form>
  );
}
