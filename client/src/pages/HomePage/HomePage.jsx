import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import AnimatedCard from '../../components/AnimatedCard';
import styles from './HomePage.module.css';
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
    const fetchData = async () => {
      try {
        const { data: cardsData } = await axiosInstance.get(`${VITE_API}/card`);
        setCard(cardsData);

        const { data: categoriesData } = await axiosInstance.get(`${VITE_API}/card/categories`);
        setCategories(categoriesData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (el) => {
    setFlippedCardIds((prevIds) => {
      const newIds = new Set(prevIds);
      if (newIds.has(el.id)) {
        newIds.delete(el.id);
      } else {
        newIds.add(el.id); 
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
    <div>
      <Menu>
<<<<<<< HEAD
        <MenuButton as={Button} className={styles.menuButton}>
          Темы
        </MenuButton>
=======
        <MenuButton as={Button}>Темы</MenuButton>
>>>>>>> dev
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
<<<<<<< HEAD
      <div className={styles.container}>
        {card.length ? (
          card.map((el) => (
            <AnimatedCard el={el} handleCardClick={handleCardClick} />
          ))
        ) : (
          <div>Карточек нет</div>
        )}
      </div>
=======
      {filteredCards.length ? (
        filteredCards.map((el) => (
          <Card align="center" key={el.id}>
            <div>
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleCardClick(el.id)}
                  initial={{ y: 0 }}
                  animate={{ rotateX: flippedCardIds.has(el.id) ? 360 : 0 }}
                  className="card-container"
                >
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{
                      opacity: flippedCardIds.has(el.id) ? 0 : 1,
                    }}
                    className="card-front"
                  >
                    <CardBody>
                      <Text>{el.word}</Text>
                    </CardBody>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: flippedCardIds.has(el.id) ? 1 : 0 }}
                    className="card-back"
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
                  </motion.div>
                </motion.div>
              )}
            </div>
          </Card>
        ))
      ) : (
        <div>Карточек нет</div>
      )}
>>>>>>> dev
    </div>
  );
}