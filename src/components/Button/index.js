import styles from "./index.module.css";

const Button = ({ text, handleOnClick, customStyles }) => {
  return (
    <button
      className={styles.button}
      style={customStyles}
      onClick={handleOnClick}
    >
      {text}
    </button>
  );
};

export default Button;
