import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import ProgressList from "../ProgressBar/ProgressList"
import "./direction.module.css";
import './Profile.module.css';
import { FormLabel, Button, Input, Stack, HStack, VStack, Box, Spacer, Container  } from "@chakra-ui/react";

const { VITE_API } = import.meta.env;


const Profile = ({ user, card, setCard, isLearned, setIsLearned }) => {
    
    const [inputs, setInputs] = useState({category: "", word: "", translate: "", difficulty: ""})
    
  
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
    <Stack direction={['column', 'row']} spacing='24px'>
          <Spacer/>

      <Container >
        <form onSubmit={handleSubmit}>
        <FormLabel>Category</FormLabel>
        <Input
          type="text"
          id="category"
          name="category"
          value={inputs.category}
          placeholder="category"
          onChange={inputsHandler}
        />
        <FormLabel>Word</FormLabel>
        <Input
          type="text"
          id="word"
          name="word"
          value={inputs.word}
          onChange={inputsHandler}
          placeholder="Word"
        />
        <FormLabel>Translate</FormLabel>
        <Input
          type="text"
          id="translate"
          name="translate"
          value={inputs.translate}
          onChange={inputsHandler}
          placeholder="Translate"
        />
        <FormLabel>Difficulty</FormLabel>
        <Input
          type="text"
          id="difficulty"
          name="difficulty"
          value={inputs.difficulty}
          onChange={inputsHandler}
          placeholder="Difficulty"
        />
        <br />
        <br />
        <Button type="submit" colorScheme="teal" variant="outline">
          Создать карточку
        </Button>
      </form>
    </Container >
    <Spacer/>
    <Container> 
    <ProgressList user={user} />
    </Container>
    <Spacer/>

    </Stack >
  );
};

export default Profile;
