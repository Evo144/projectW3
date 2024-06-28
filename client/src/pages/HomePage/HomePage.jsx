import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import AnimatedCard from "./AnimatedCard";
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
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
  FormLabel,
  Input,
} from "@chakra-ui/react";

const { VITE_API } = import.meta.env;

export default function HomePage({
    user,
    setFilteredCards,
    filteredCards,
    setInitialCards,
    initialCards,
}) {
    const [categories, setCategories] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedCard, setEditedCard] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentFilter, setCurrentFilter] = useState("all");
    const [isLearnedFilter, setIsLearnedFilter] = useState(false);
    const [serachFilter, setSerachFilter] = useState([])
   

    useEffect(() => {
      // Замените setFilteredCards(data) на setInitialCards(data) для сохранения изначального массива при получении данных
      const fetchCards = async () => {
          try {
              const { data } = await axiosInstance.get(`${VITE_API}/card`);
              setInitialCards(data);
              setFilteredCards(data);
              handleSelectFilter("all");
          } catch (error) {
              console.log(error);
          }
      };
      fetchCards();
  }, []);

    console.log('xddd', filteredCards)

    useEffect(() => {
        const fetchCardsCategories = async () => {
            try {
                const { data } = await axiosInstance.get(
                    `${VITE_API}/card/categories`
                );
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCardsCategories();
    }, []);

    const deleteHandler = async (cardId) => {
        try {
            const response = await axiosInstance.delete(
                `${VITE_API}/card/${cardId}`
            );
            if (response.status === 200) {
              setInitialCards((prev) =>
                    prev.filter((el) => el.id !== cardId)
                );
            } else {
                console.log("Ошибка удаления");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editHandler = (cardId) => {
        const selectedCard = filteredCards.find((el) => el.id === cardId);
        setEditedCard(selectedCard);
        setEditMode(true);
    };

    const saveHandler = async () => {
        try {
            const updatedCard = await axiosInstance.put(
                `${VITE_API}/card/${editedCard.id}`,
                editedCard
            );
            setFilteredCards((prev) =>
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
              setFilteredCards(updatedCard);
          } catch (error) {
              console.log(error);
          }
      } else {
        setFilteredCards((prev) => ({
              ...prev,
              [name]: value,
          }));
      }
  };

  const handleLearnedCheckboxChange = async (cardId) => {
    const updatedCard = filteredCards.find((el) => el.id === cardId);
    updatedCard.isLearned = !updatedCard.isLearned;
    try {
        await axiosInstance.put(`${VITE_API}/card/${cardId}`, updatedCard);
        setFilteredCards((prev) =>
            prev.map((el) => (el.id === updatedCard.id ? updatedCard : el))
        );
    } catch (error) {
        console.log(error);
    }
};

const handleSelectFilter = (filter) => {
  setCurrentFilter(filter);

  let cards = [...initialCards]; 

  if (selectedCategory) {
      cards = cards.filter(el => el.category === selectedCategory);
  }

  if (filter === "all") {
      setFilteredCards(cards);
  } else if (filter === "notLearned") {
      const filteredNotLearned = cards.filter(el => !el.isLearned);
      setFilteredCards(filteredNotLearned);
  } else if (filter === "learned") {
      const filteredLearned = cards.filter(el => el.isLearned);
      setFilteredCards(filteredLearned);
  }
};

    return (
        <>
            {user ? (
                <div>
                    <Menu>
                        <MenuButton as={Button}>Categories</MenuButton>
                        <MenuList>
                            {categories.map((el) => (
                                <MenuItem key={el.id} onClick={() => setSelectedCategory(el.category)}>
                                    {el.category}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button}>Types</MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => handleSelectFilter("all")}>
                                All cards
                            </MenuItem>
                            <MenuItem onClick={() => handleSelectFilter("notLearned")}>
                                Not studied
                            </MenuItem>
                            <MenuItem onClick={() => handleSelectFilter("learned")}>
                                Studied
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    {filteredCards.length ? (
                        filteredCards.map((el) => (
                            <AnimatedCard
                                key={el.id}
                                frontContent={
                                    <Card>
                                        <Box
                                            className="front"
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                minHeight: '100%',
                                                padding: '1rem',
                                                backgroundColor: 'white',
                                                backfaceVisibility: 'hidden',
                                            }}
                                        >
                                            <CardBody>
                                                <Text>{el.word}</Text>
                                            </CardBody>
                                        </Box>
                                    </Card>
                                }
                                backContent={
                                    <Card>
                                        {editMode && editedCard && editedCard.id === el.id ? (
                                            <Box className="back">
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
                                                <Button onClick={saveHandler}>Save</Button>
                                            </Box>
                                        ) : (
                                            <Box
                                                className="back"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    minHeight: '100%',
                                                    padding: '1rem',
                                                    backgroundColor: 'white',
                                                    backfaceVisibility: 'hidden',
                                                }}
                                            >
                                                <CardBody>
                                                    <Text fontSize="lg">{el.translate}</Text>
                                                </CardBody>
                                                <Checkbox
                                                    colorScheme="pink"
                                                    isChecked={el.isLearned}
                                                    onChange={() => handleLearnedCheckboxChange(el.id)}
                                                >
                                                    Studied
                                                </Checkbox>
                                                {/* <Button onClick={() => editHandler(el.id)}>
                                                    Edit card
                                                </Button> */}
                                                <Button onClick={() => deleteHandler(el.id)}>
                                                    Delete card
                                                </Button>
                                            </Box>
                                        )}
                                    </Card>
                                }
                            />
                        ))
                    ) : (
                        <div>Карточек нет</div>
                    )}
                </div>
            ) : (
                <div className={styles.greetings}>
                    <h1>Welcome to the "Memorize Words" app</h1>
                    <p>To get started, first register! Good luck!</p>
                    <Link to='/signup'>
                        <button>Register</button>
                    </Link>
                </div>
            )}
        </>
    );
}