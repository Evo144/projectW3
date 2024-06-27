import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import FlipCard from './FlipCard';
import styles from './HomePage.module.css';
import {
  Box,
  Card,
  CardBody,
  Text,
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  IconButton,
  Flex,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const { VITE_API } = import.meta.env;

export default function HomePage({
  user,
  card,
  setCard,
  isLearned,
  setIsLearned,
}) {
  const [flippedCardIds, setFlippedCardIds] = useState(new Set());
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedCard, setEditedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data } = await axiosInstance.get(`${VITE_API}/card`);
        setCard(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCards();
  }, []);

  useEffect(() => {
    const fetchCardsCategories = async () => {
      try {
        const { data } = await axiosInstance.get(`${VITE_API}/card/categories`);
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCardsCategories();
  }, []);

  const handleCardClick = (id) => {
    setFlippedCardIds((prevIds) => {
      const newIds = new Set(prevIds);
      if (newIds.has(id)) {
        newIds.delete(id);
      } else {
        newIds.add(id);
      }
      return newIds;
    });
  };

  const deleteHandler = async (cardId) => {
    try {
      await axiosInstance.delete(`${VITE_API}/card/${cardId}`);
      setCard((prev) => prev.filter((el) => el.id !== cardId));
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = (cardId) => {
    const selectedCard = card.find((el) => el.id === cardId);
    setEditedCard(selectedCard);
    setEditMode(true);
  };

  const saveHandler = async () => {
    try {
      const updatedCard = await axiosInstance.put(
        `${VITE_API}/card/${editedCard.id}`,
        editedCard
      );
      setCard((prev) =>
        prev.map((el) => (el.id === updatedCard.id ? updatedCard : el))
      );
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "isLearned") {
      const updatedCard = { ...editedCard, isLearned: checked };

      try {
        await axiosInstance.put(
          `${VITE_API}/card/${editedCard.id}`,
          updatedCard
        );
        setEditedCard(updatedCard);
      } catch (error) {
        console.log(error);
      }
    } else {
      setEditedCard((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleLearnedCheckboxChange = async (cardId) => {
    const updatedCard = card.find((el) => el.id === cardId);
    updatedCard.isLearned = !updatedCard.isLearned;

    try {
      await axiosInstance.put(`${VITE_API}/card/${cardId}`, updatedCard);
      setCard((prev) =>
        prev.map((el) => (el.id === updatedCard.id ? updatedCard : el))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCards = selectedCategory
    ? card.filter((el) => el.category === selectedCategory)
    : card;

  return (
    <Box className={styles.container} bgColor="transparent">
      <Menu>
        <MenuButton as={Button}>Темы</MenuButton>
        <MenuList>
          {categories.map((el) => (
            <MenuItem
              key={el.id}
              onClick={() => handleSelectCategory(el.category)}
            >
              {el.category}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Flex wrap="wrap" justify="center">
        {filteredCards.length ? (
          filteredCards.map((el) => (
            <Card key={el.id} className={styles.card} borderRadius="md">
            <FlipCard
              frontContent={
                <CardBody textAlign="center">
                  <Text>{el.word}</Text>
                </CardBody>
              }
              backContent={
                <CardBody textAlign="center">
                  {editMode && editedCard && editedCard.id === el.id ? (
                    <div>
                      <FormLabel>Category</FormLabel>
                      <Input
                        type="text"
                        name="category"
                        value={editedCard.category}
                        onChange={handleChange}
                        placeholder="category"
                      />
                      <FormLabel>Word</FormLabel>
                      <Input
                        type="text"
                        name="word"
                        value={editedCard.word}
                        onChange={handleChange}
                        placeholder="word"
                      />
                      <FormLabel>Translate</FormLabel>
                      <Input
                        type="text"
                        name="translate"
                        value={editedCard.translate}
                        onChange={handleChange}
                        placeholder="translate"
                      />
                      <FormLabel>Difficulty</FormLabel>
                      <Input
                        type="text"
                        name="difficulty"
                        value={editedCard.difficulty}
                        onChange={handleChange}
                        placeholder="difficulty"
                      />
                      <FormLabel>Изучено</FormLabel>
                      <Checkbox
                        type="checkbox"
                        id="isLearned"
                        name="isLearned"
                        checked={editedCard.isLearned}
                        onChange={handleChange}
                      />
                      <Button onClick={saveHandler}>Сохранить</Button>
                    </div>
                  ) : (
                    <div>
                      <Text fontSize="lg" mb={4}>{el.translate}</Text>
                      <Checkbox
                        colorScheme="pink"
                        isChecked={el.isLearned}
                        onChange={() => handleLearnedCheckboxChange(el.id)}
                        mb={4}
                      >
                        Изучено
                      </Checkbox>
                      <Flex justify="center">
                        <IconButton
                          icon={<EditIcon />}
                          onClick={() => editHandler(el.id)}
                          aria-label="Edit"
                          mr={2}
                        />
                        <IconButton
                          icon={<DeleteIcon />}
                          onClick={() => deleteHandler(el.id)}
                          aria-label="Delete"
                        />
                      </Flex>
                    </div>
                  )}
                </CardBody>
              }
              flipped={flippedCardIds.has(el.id)}
              onClick={() => handleCardClick(el.id)}
            />
          </Card>
        ))
      ) : (
        <Text>Карточек нет</Text>
      )}
      </Flex>
    </Box>
  );
}