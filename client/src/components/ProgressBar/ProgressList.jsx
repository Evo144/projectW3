import ProgressCard from "./ProgressCard";
import styles from "./ProgressCard.module.css";
import axiosInstance from "../../axiosInstance";
import { useState, useEffect } from "react";
import { Heading } from '@chakra-ui/react'

const { VITE_API } = import.meta.env;

export default function ProgressList({ user }) {
  const [progressInf, setProgressInf] = useState();

  useEffect(() => {
    axiosInstance
      .post(`${VITE_API}/progress/${user?.id}`)
      .then((res) => {
        setProgressInf(res.data);
      })
      .catch((err) => console.error(err));
  }, [user]);

  let progress = progressInf?.progress;
  let username = progressInf?.username;
  let quantityOfCards = progressInf?.quantityOfCards;
  let quantityOfLearnedCards = progressInf?.quantityOfLearnedCards;

  return (
    <div className={styles.wrapper}>
<Heading>Мой прогресс: изучено карточек </Heading>
      {progress?.length
        ? progress.map((el) => (
            <ProgressCard
              key={el.id}
              entry={el}
            />
          ))
        : null}
    </div>
  );
}
