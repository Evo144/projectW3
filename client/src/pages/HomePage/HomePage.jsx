import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import {
  Menu,
  Button, 
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import AnimatedCard from '../../components/AnimatedCard';
import styles from './HomePage.module.css';
const { VITE_API } = import.meta.env;

export default function HomePage({ user, card, setCard }) {
  const [flippedCardIds, setFlippedCardIds] = useState(new Set());
  const [categories, setCategories] = useState([]);

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

  return (
    <div>
      <Menu>
        <MenuButton as={Button} className={styles.menuButton}>
          Темы
        </MenuButton>
        <MenuList>
          {categories.map((el) => (
            <MenuItem key={el.id}>{el.category}</MenuItem>
          ))}
        </MenuList>
      </Menu>
      <div className={styles.container}>
        {card.length ? (
          card.map((el) => (
            <AnimatedCard el={el} handleCardClick={handleCardClick} />
          ))
        ) : (
          <div>Карточек нет</div>
        )}
      </div>
    </div>
  );
}