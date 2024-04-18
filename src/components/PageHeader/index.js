import arrow_left from "../../assets/icons/arrow_left.svg";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const PageHeader = ({ title, navDisable }) => {
  const navigate = useNavigate();

  return (
    <header className={styles["page-header"]}>
      {!navDisable && (
        <img src={arrow_left} alt="back" onClick={() => navigate(-1)} />
      )}
      <h1>{title}</h1>
    </header>
  );
};

export default PageHeader;
