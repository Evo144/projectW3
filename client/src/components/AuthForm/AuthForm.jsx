import { useState } from "react";
import styles from "./AuthForm.module.css";
import { Input, Button, Tooltip } from "@chakra-ui/react";
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

        try {
            const res = await axiosInstance.post(
                `${VITE_API}/auth/${type}`,
                inputs
            );
            setUser(res.data.user);
            setAccessToken(res.data.accessToken);
            navigate("/");
        } catch (err) {
            setError("Пользователь уже существует");
        }
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <form onSubmit={submitHandler} className={styles.wrapper}>
            <h3 className={styles.head}>{title}</h3>
            <div className={styles.inputs}>
                {type === "signin" && (
                    <>
                        <Input
                            onChange={changeHandler}
                            borderColor="#3f3e3e"
                            type="email"
                            name="email"
                            value={inputs?.email}
                            placeholder="Эл.почта"
                        />
                        <Input
                            onChange={changeHandler}
                            borderColor="#3f3e3e"
                            type="password"
                            name="password"
                            value={inputs?.password || ""}
                            placeholder="Пароль"
                        />
                    </>
                )}
                {type === "signup" && (
                    <>
                        <Input
                            onChange={changeHandler}
                            borderColor="#3f3e3e"
                            name="username"
                            value={inputs?.name}
                            placeholder="Имя пользователя"
                        />
                        <Input
                            onChange={changeHandler}
                            borderColor="#3f3e3e"
                            type="email"
                            name="email"
                            value={inputs?.description}
                            placeholder="Эл.почта"
                        />
                        <Tooltip
                            label="Пароль должен содержать не менее 8 символов, lowercase, uppercase"
                            isOpen={password && !validPassword(password)}
                        >
                            <Input
                                onChange={passwordHandler}
                                borderColor="#3f3e3e"
                                type="password"
                                name="password"
                                value={inputs?.password || ""}
                                placeholder="Пароль"
                                style={{
                                    color: validPassword(password)
                                        ? "green"
                                        : "red",
                                }}
                            />
                        </Tooltip>
                    </>
                )}
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.btns}>
                {type === "signin" && (
                    <Button type="submit" colorScheme="blue">
                        Вход
                    </Button>
                )}
                {type === "signup" && (
                    <Button type="submit" colorScheme="blue">
                        Регистрация
                    </Button>
                )}
            </div>
        </form>
    );
}
