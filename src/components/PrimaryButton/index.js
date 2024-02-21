import styles from "./index.module.css";

const PrimaryButton = ({ text, htmlType, onClick }) => {
  return (
    <div className={styles["button-container"]}>
      <button
        className={styles["primary-button"]}
        type={htmlType}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default PrimaryButton;
