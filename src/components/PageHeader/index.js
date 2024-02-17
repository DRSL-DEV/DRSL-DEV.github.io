import arrow_left from "../../assets/icons/arrow_left.svg";
import { useNavigate } from "react-router-dom";
import "./index.css";

const PageHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="page-header">
      <img src={arrow_left} alt="back" onClick={() => navigate(-1)} />
      <h1>{title}</h1>
    </header>
  );
};

export default PageHeader;
