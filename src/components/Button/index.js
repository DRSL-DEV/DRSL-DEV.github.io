import styles from "./index.module.css";

const Button = ({ text, handleOnClick, customStyles, disabled }) => {
  return (
    <button
      className={styles.button}
      style={customStyles}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
