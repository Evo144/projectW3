import React, { useState } from "react";
import { Input, FormControl, FormLabel, Text, Box } from "@chakra-ui/react";

const PasswordInput = () => {
    const [password, setPassword] = useState("");

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const getPasswordColor = () => {
        return password.length >= 8 ? "green.500" : "red.500";
    };

    return (
        <Box>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    value={password}
                    onChange={handleChange}
                    borderColor={getPasswordColor()}
                />
            </FormControl>
            <Text color={getPasswordColor()}>
                {password.length >= 8
                    ? "Password length is sufficient"
                    : "Password must be at least 8 characters long"}
            </Text>
        </Box>
    );
};
//------------2 вариант  с фазы 2 ---------------------

import React, { useState } from "react";
import validPassword from "./utils/validPassword";
import validUsername from "./utils/validUsername";

function App() {
    const [input, setInput] = useState({
        inputPassword: "",
        inputUsername: "",
    });

    function inputsHandler(e) {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

        //проверка
        function checkall() {
            console.log(1, validPassword(input.password));
            console.log(2, validUsername(input.username));
            return (
                validPassword(input.password) && validUsername(input.username)
            );
        }
    }

    return (
        <div className="container register-form">
            <div className="form">
                <form>
                    <label htmlFor="pw">
                        <p className="label-txt">WRITE YOUR PASSWORD</p>
                        <input
                            type="password"
                            name="password"
                            className="input"
                            id="pw"
                            value={input.password}
                            onChange={inputsHandler}
                        />
                        <div className="line-box">
                            <div className="line" />
                        </div>
                    </label>
                    <label htmlFor="rep">
                        <p className="label-txt">TEST PASSWORD</p>
                        <input
                            type="text"
                            className="input"
                            name="password"
                            value={input.password}
                            disabled
                            id="rep"
                            style={{
                                color: validPassword(input.password)
                                    ? "green"
                                    : "red",
                            }}
                        />
                        <div className="line-box">
                            <div className="line" />
                        </div>
                    </label>
                    <label htmlFor="usr">
                        <p className="label-txt">WRITE YOUR USERNAME</p>
                        <input
                            type="text"
                            className="input"
                            id="usr"
                            name="username"
                            value={input.username}
                            style={{
                                color: validUsername(input.username)
                                    ? "green"
                                    : "red",
                            }}
                            onChange={inputsHandler}
                        />
                        <div className="line-box">
                            <div className="line" />
                        </div>
                    </label>
                    {checkall() ? (
                        <button
                            type="button"
                            className="btn btn-success btn-lg"
                            style={{ width: "10rem" }}
                        >
                            OK
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-danger btn-lg"
                            style={{ width: "10rem" }}
                        >
                            NOT OK
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default App;
