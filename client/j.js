import { useState } from "react";
import styles from "./AuthForm.module.css";
import { Input, Button, Tooltip, FormControl, FormErrorMessage } from "@chakra-ui/react";
import axiosInstance, { setAccessToken } from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import validPassword from "../../utils/validPassword";

const { VITE_API } = import.meta.env;

export default function AuthForm({ title, type = "signin", setUser }) {
    const [inputs, setInputs] = useState({});
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");  // Очистить предыдущие ошибки
        try {
            const res = await axiosInstance.post(
                `${VITE_API}/auth/${type}`,
                inputs
            );
            setUser(res.data.user);
            setAccessToken(res.data.accessToken);
            navigate("/");
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setError("Пользователь уже существует");
            } else {
                setError("Произошла ошибка, попробуйте снова");
            }
        }
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        setInputs((prev


            123HHyyuuFDDD

            if (err.response && err.response.status === 403) {
                setError("Пользователь уже существует");
            } else {

                <Tooltip label='Auto start' placement='auto-start'>
                <Button>Auto-Start</Button>
              </Tooltip>


            } catch (err) {
                if (err.response && err.response.status === 403) {
                    console.log(err);
                    setError("Пользователь уже существует");
                } else if (err.response && err.response.status === 401) {
                    console.log(err);
                    setError("Incorrect user or password");
                } else {
                    setError("Произошла ошибка, попробуйте снова");
                }
            }

        } catch (err) {
            if (err.response) {
                if (err.response.status === 403) {
                    console.log(err);
                    setError("Пользователь уже существует");
                } else if (err.response.status === 401) {
                    console.log(err);
                    setError("Неправильный логин или пароль");
                }
            }
        }
    };

} catch (err) {
    if (err.response) {
        if (err.response.status === 403) {
            setError("Пользователь уже существует");
        } else if (err.response.status === 401) {
            setError("Неверный email или пароль");
        } else {
            setError("Произошла ошибка, попробуйте снова");
        }
    } else {
        setError("Произошла ошибка, попробуйте снова");
    }
}
};  isOpen={password && !validPassword(password)}