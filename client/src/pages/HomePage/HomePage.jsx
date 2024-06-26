import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import {
    Card,
    CardBody,
    Text,
    Menu,
    Button,
    MenuButton,
    MenuList,
    MenuItem,
    Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const { VITE_API } = import.meta.env;

export default function HomePage({ user, card, setCard }) {
    const [flippedCardIds, setFlippedCardIds] = useState(new Set());
    const [categories, setCategories] = useState([]);

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

    return user ? (
        <div>
            <Menu>
                <MenuButton as={Button}>Темы</MenuButton>
                <MenuList>
                    {categories.map((el) => (
                        <MenuItem key={el.id}>{el.category}</MenuItem>
                    ))}
                </MenuList>
            </Menu>
            {card.length ? (
                card.map((el) => (
                    <Card align="center" key={el.id}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleCardClick(el.id)}
                            initial={{ y: 0 }}
                            animate={{
                                rotateX: flippedCardIds.has(el.id) ? 360 : 0,
                            }}
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
                                animate={{
                                    opacity: flippedCardIds.has(el.id) ? 1 : 0,
                                }}
                                className="card-back"
                            >
                                <CardBody>
                                    <Text fontSize="lg">{el.translate}</Text>
                                </CardBody>
                            </motion.div>
                        </motion.div>
                    </Card>
                ))
            ) : (
                <div>Карточек нет</div>
            )}
        </div>
    ) : (
        <div>
            <Text fontSize="lg">"Memorizing Words"</Text>
            <Text fontSize="lg">"To start training, please register"</Text>
            <Link href="/signup" passHref>
                <Button as="a" colorScheme="orange">
                    Registration
                </Button>
            </Link>
        </div>
    );
}
