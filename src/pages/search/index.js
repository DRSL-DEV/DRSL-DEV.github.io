import styles from "./index.module.css";
import { Input } from 'antd';
import search from "../../assets/icons/search.svg";
import filter from "../../assets/icons/filter.svg";
import back from "../../assets/icons/back.svg"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Select, Radio, Divider, Space } from 'antd';
import Button from "../../components/Button";
import { siteLocationList, tagList } from '../../constants/constants';
import tag_blue from "../../assets/icons/tag_blue.svg";
import location_red from "../../assets/icons/location_red.svg";



const { Option } = Select;


const SearchPage = () => {
  const onSearch = (value) => console.log(value);
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleApplyFilter = () => {
    // Apply the filter based on the selected values
  };

  const handleCancelFilter = () => {
    // Reset the selected values
    setSelectedLocation(null);
    setSelectedTag(null);
    setSelectedAuthor(null);
    setSelectedDate(null);
    setIsFilterOpen(!isFilterOpen)
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className={`page-container ${styles["search-page-container"]}`}>
      <div className={styles["new-navbar-container"]}>
        <img src={back} alt="back" onClick={() => navigate(-1)}/>
        <Input prefix={<img src={search} alt="search" style={{ width: "20px" }}/>} placeholder="input search keywords" allowClear onPressEnter={onSearch} style={{ width: "68vw", borderRadius: "50px" }} />
        <img src={filter} alt="filter" onClick={handleFilterClick}/>
      </div>
      {isFilterOpen && (
        <div className={styles["filter-container"]}>
          <h2>Search Filter</h2>

          <h3>Location</h3>
          <Select 
            placeholder="Select location"
            onChange={setSelectedLocation}
            mode="location"
            showSearch
            optionFilterProp="children"
            filterOption={filterOption}
            suffixIcon={<img src={location_red} alt="location" />}
            options={tagList}
            className={styles["drop-down"]}
          >
            {siteLocationList.map((location) => (
              <Option key={location.value} value={location.value}>
                {location.label}
              </Option>
            ))}
          </Select>
          <Divider />

          <h3>Tag</h3>
          <Select 
            placeholder="Select tag" 
            onChange={setSelectedTag}
            mode="tags"
            showSearch
            optionFilterProp="children"
            filterOption={filterOption}
            suffixIcon={<img src={tag_blue} alt="tags" />}
            options={tagList}
            className={styles["drop-down"]}
          >
            {tagList.map((tag) => (
              <Option key={tag.value} value={tag.value}>
                {tag.label}
              </Option>
            ))}
          </Select>
          <Divider />

          <h3>Author</h3>
          <Radio.Group onChange={(e) => setSelectedAuthor(e.target.value)}>
          <Space direction="vertical">
            <Radio value="all">All</Radio>
            <Radio value="user">User</Radio>
            <Radio value="detroitRiverStoryLab">Detroit River Story Lab *</Radio>
          </Space>
          </Radio.Group>
          <Divider />

          <h3>Date</h3>
          <Radio.Group onChange={(e) => setSelectedDate(e.target.value)}>
            <Space direction="vertical">
              <Radio value="anytime">Anytime</Radio>
              <Radio value="today">Today</Radio>
              <Radio value="thisWeek">This Week</Radio>
              <Radio value="thisMonth">This Month</Radio>
              <Radio value="thisYear">This Year</Radio>
            </Space>
          </Radio.Group>
          
          <div className={styles["filter-button"]}>
            <Button text="Cancel Filter" handleOnClick={handleCancelFilter} customStyles={{ backgroundColor: '#D7D7D7' }} />
            <Button text="Apply Filter" handleOnClick={handleApplyFilter} />
          </div>
        </div>
      )}

    </div>
  )
};

export default SearchPage;
