import styles from "./index.module.css";

const CategoryHeader = ({ title }) => {
  return (
    <div className={styles["category-header-container"]}>
      <h1 className={styles["title"]}>{title}</h1>
    </div>
  );
}

export default CategoryHeader;