import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import styles from './Profile.module.css';
import {
  FormLabel,
  Button,
  Input,
} from "@chakra-ui/react";

const { VITE_API } = import.meta.env;


const Profile = ({ user, card, setCard }) => {
    
    const [inputs, setInputs] = useState({category: "", word: "", translate: "", difficulty: ""})
    const [isLearned, setIsLearned] = useState(false);
  
    function inputsHandler(e) {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      }
      async function handleSubmit(event) {
        event.preventDefault();
        try {
          const { data } = await axiosInstance.post(
            `${VITE_API}/card/${user.id}`,
            { ...inputs, isLearned: isLearned }
          );
          setCard((prev) => [...prev, data]);
          setInputs({
            category: "",
            word: "",
            translate: "",
            difficulty: "",
          });
          setIsLearned(false);
        } catch (error) {
          console.log("Error:", error);
        }
      }
    

  return (
    <div className={styles.profileWrapper}>
        <form onSubmit={handleSubmit}>
        <FormLabel className={styles.profileHead}>Category</FormLabel>
        <Input
          type="text"
          id="category"
          name="category"
          value={inputs.category}
          placeholder="category"
          onChange={inputsHandler}
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
        <FormLabel className={styles.profileHead}>Word</FormLabel>
        <Input
          type="text"
          id="word"
          name="word"
          value={inputs.word}
          onChange={inputsHandler}
          placeholder="Word"
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
        <FormLabel className={styles.profileHead}>Translate</FormLabel>
        <Input
        className={styles.profileInputs}
          type="text"
          id="translate"
          name="translate"
          value={inputs.translate}
          onChange={inputsHandler}
          placeholder="Translate"
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
        <FormLabel className={styles.profileHead}>Difficulty</FormLabel>
        <Input
         className={styles.profileInputs}
          type="text"
          id="difficulty"
          name="difficulty"
          value={inputs.difficulty}
          onChange={inputsHandler}
          placeholder="Difficulty"
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
        <label>
            <input
              type="checkbox"
              id="isLearned"
              name="isLearned"
              checked={isLearned}
              onChange={() => setIsLearned((prev) => !prev)}
            />
            Карточка изучена
        </label>
        <br />
        <br />
        <Button type="submit" className={styles.profileBtns}>
          Создать карточку
        </Button>
      </form>
    </div>
  );
};

export default Profile;