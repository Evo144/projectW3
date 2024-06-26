import styles from "./MainCard.module.css";
import {
  Avatar,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Image,

} from "@chakra-ui/react";
import axiosInstance from "../../axiosInstance";
import { useDisclosure } from "@chakra-ui/react";
import FormUpdate from "../Form/FormUpdate";

export default function ProgressCard({ user, entry, setEntries }) {
  // const [cardUpdating, setCardUpdating] = useState();

  // const update = (id) => {
  //   setCardUpdating(id)
  // }

  const deleteHandler = async () => {
    if (user?.id === entry.userId) {
      const res = await axiosInstance.delete(
        `${import.meta.env.VITE_API}/resumes/${entry.id}`
      );

      if (res.status === 200) {
        setEntries((prev) => prev.filter((el) => el.id !== entry.id));
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <Card bgColor="#313133" className={styles.container} maxW="sm">
        <CardBody className={styles.body}>
          <Stack mt="3" spacing="3">
            <Heading size="md">{entry?.title}--тема--</Heading>



          </Stack>

        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Подробнее
            </Button>
            <Popover placement="top" className={styles.popover}>
              <PopoverTrigger>
                <Button
                  isLoading={user?.id !== entry.userId}
                  spinner={<p>Удалить</p>}
                  variant="ghost"
                  colorScheme="blue"
                >
                  Удалить
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                  Вы действительно хотите удалить запись?
                </PopoverHeader>
                <PopoverBody>
                  <Button
                    onClick={deleteHandler}
                    variant="ghost"
                    colorScheme="blue"
                  >
                    Удалить
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <>
              <Button
                onClick={onOpen}
                isLoading={user?.id !== entry.userId}
                spinner={<p>Редактировать</p>}
                variant="ghost"
                colorScheme="red"
              >
                Редактировать
              </Button>
            </>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}
