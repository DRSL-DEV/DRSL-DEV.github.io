import styles from "./index.module.css";

const GridCard = ({ title, imgSrc, type }) => {
  return (
    <div className={styles["grid-card"]}>
      <div className={styles["grid-card-image"]}>
        <img src={imgSrc} alt="" />
        <div className={styles["grid-card-content"]}>
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default GridCard;
