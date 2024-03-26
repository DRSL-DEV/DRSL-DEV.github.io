import styles from "./index.module.css";
import { Input } from 'antd';
import search from "../../assets/icons/search.svg";
import filter from "../../assets/icons/filter.svg";
import back from "../../assets/icons/back.svg"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchPage = () => {
  const onSearch = (value) => console.log(value);
  const navigate = useNavigate();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  return (
    <div className={`page-container ${styles["search-page-container"]}`}>
      <div className={styles["new-navbar-container"]}>
        <img src={back} alt="back" onClick={() => navigate(-1)}/>
        <Input prefix={<img src={search} alt="search" style={{ width: "20px" }}/>} placeholder="input search keywords" allowClear onPressEnter={onSearch} style={{ width: "68vw", borderRadius: "50px" }} />
        <img src={filter} alt="filter" onClick={handleFilterClick}/>
      </div>
      {isFilterOpen && (
        <div className={styles["filter-container"]}>
          <p>hi</p>
        </div>
      )}
    </div>
  )
};

export default SearchPage;
