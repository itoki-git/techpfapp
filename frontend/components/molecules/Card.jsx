import Link from "next/link";
import Image from "next/image";
import Text from "../atoms/Text";

import styles from "../../styles/Card.module.scss";

// カード
const Card = (props) => {
  return (
    <div className={styles.card} id="card">
      <div className={styles.carditem}>
        <img className={styles.thumbnail} src="/DSC_9314.JPG" />
        <div className={styles.cardtitle}>
          <Text content={props.title} />
        </div>
      </div>
    </div>
  );
};
export default Card;
