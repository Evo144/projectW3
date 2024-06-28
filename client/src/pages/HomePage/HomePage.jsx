import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import AnimatedCard from "./AnimatedCard";
// import styles from './HomePage.module.css';
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
    const [filteredCards, setFilteredCards] = useState([]);
    const [currentFilter, setCurrentFilter] = useState("all");
    const [isLearnedFilter, setIsLearnedFilter] = useState(false);

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
            const response = await axiosInstance.delete(
                `${VITE_API}/card/${cardId}`
            );
            if (response.status === 200) {
                console.log("Карточка", card);
                console.log("Карточка ID", cardId);
                setFilteredCards((prev) =>
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

    const handleSelectFilter = (filter) => {
        setCurrentFilter(filter);

        setFilteredCards((prevCards) => {
            let cards = [...prevCards];

            if (filter === "all") {
                cards = card.filter((el) =>
                    selectedCategory ? el.category === selectedCategory : true
                );
            } else if (filter === "notLearned") {
                cards = card.filter(
                    (el) =>
                        !el.isLearned &&
                        (selectedCategory
                            ? el.category === selectedCategory
                            : true)
                );
            } else if (filter === "learned") {
                cards = card.filter(
                    (el) =>
                        el.isLearned &&
                        (selectedCategory
                            ? el.category === selectedCategory
                            : true)
                );
            }

            if (isLearnedFilter) {
                cards = cards.filter((el) => el.isLearned);
            }

            return cards;
        });
    };

    return (
        <div>
        <Menu>
          <MenuButton as={Button} >Темы</MenuButton>
          <MenuList>
            {categories.map((el) => (
              <MenuItem key={el.id} onClick={() => setSelectedCategory(el.category)}>
                {el.category}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button}>Тип</MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleSelectFilter("all")}>
              Все карточки
            </MenuItem>
            <MenuItem onClick={() => handleSelectFilter("notLearned")}>
              Не изученные
            </MenuItem>
            <MenuItem onClick={() => handleSelectFilter("learned")}>
              Изученные
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
                      <FormLabel>Изучено</FormLabel>
                      <Checkbox
                        type="checkbox"
                        id="isLearned"
                        name="isLearned"
                        checked={editedCard.isLearned}
                        onChange={handleChange}
                      />
                      <Button onClick={saveHandler}>Сохранить</Button>
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
                        Изучено
                      </Checkbox>
                      <Button onClick={() => editHandler(el.id)}>
                        Редактировать карточку
                      </Button>
                      <Button onClick={() => deleteHandler(el.id)}>
                        Удалить карточку
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
      
    );
}
