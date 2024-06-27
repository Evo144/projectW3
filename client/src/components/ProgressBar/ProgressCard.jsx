import styles from "./ProgressList.module.css";
import './styles.scss'
import ProgressBar from "@ramonak/react-progress-bar";
// import { useDisclosure } from "@chakra-ui/react";

export default function ProgressCard({  entry }) {

const result = (entry?.isLearnedTrue / entry?.totalCards)
  return (
    <div className={styles.wrapper}>
      <ProgressBar
       completed={result} customLabel={entry?.category} 
       className="wrapper"
       barContainerClassName="container"
       completedClassName="barCompleted"
       labelClassName="label"
       />
    </div>
  );
}
