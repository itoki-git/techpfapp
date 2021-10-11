import Link from "next/link";
import Image from "next/image";
import Text from "../atoms/Text";

import styles from "../../styles/molecules/Card.module.scss";

// カード
const Card = (props) => {
  return (
    <div className={styles.card} id="card">
      <div className={styles.carditem}>
        <Image
          className={styles.thumbnail}
          src="/DSC_9314.JPG"
          alt={props.title}
          width={400}
          height={400}
        />
        <div className={styles.cardtitle}>
          <Text content={props.title} />
        </div>
      </div>
    </div>
  );
};
export default Card;
