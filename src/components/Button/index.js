import styles from "./index.module.css";

const Button = ({ text, handleOnClick, customStyles, disabled, type }) => {
  return (
    <button
      className={styles.button}
      style={customStyles}
      onClick={handleOnClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
