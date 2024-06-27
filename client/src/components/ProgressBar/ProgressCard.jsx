import { useState, useEffect } from "react";
import styles from "./ProgressList.module.css";
import './styles.scss'
import ProgressBar from "@ramonak/react-progress-bar";

// import { useDisclosure } from "@chakra-ui/react";

export default function ProgressCard({  entry }) {
  const [result, setResult] = useState();
  useEffect(() => {
    setResult( Math.trunc(entry?.isLearnedTrue / entry?.totalCards * 100))
  }, [entry]);

  let label = `${entry?.category}: ${entry?.isLearnedTrue}`

  return (
    <div className={styles.wrapper}>
      <ProgressBar
       completed={result} 
       customLabel={label} 
       className="wrapper"
       barContainerClassName="container"
      //  completedClassName="barCompleted"
       labelClassName="label"
       height="30"
       animateOnRender="true"
       labelAlignment="left"
      bgColor="rgba(253, 159, 216, 1)"
       />
    </div>
  );
}
