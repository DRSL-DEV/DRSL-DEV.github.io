import styles from "./index.module.css";
import { Input } from 'antd';
import search from "../../assets/icons/search.svg";
import filter from "../../assets/icons/filter.svg";
import back from "../../assets/icons/back.svg"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Select, Radio, Divider, Space } from 'antd';
import Button from "../../components/Button";
import { siteLocationList, tagList } from '../../constants/constants';
import tag_blue from "../../assets/icons/tag_blue.svg";
import location_red from "../../assets/icons/location_red.svg";
import { useSelector, useDispatch } from "react-redux";
import storyListSlice from "../../data/features/storyListSlice";
import Card from "../../components/Card";
import { subscribeToStoryList } from "../../data/features/storyListSlice";
import { filterStoryList } from "../../data/features/storyListSlice";

const { Option } = Select;


const SearchPage = () => {
  const onSearch = (value) => console.log(value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storyList = useSelector((state) => state.storyList.storyList);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredStories, setFilteredStories] = useState([]);

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToStoryList(selectedTag)); // Pass selectedTag
    return () => unsubscribe(); // Unsubscribe when component unmounts
  }, [dispatch, selectedTag]); // Include selectedTag as a dependency

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const filterStories = (storyList, selectedTag, selectedLocation, selectedAuthor, selectedDate) => {
    return storyList.filter((story) => {
      const matchesLocation = selectedLocation ? story.location === selectedLocation : true;
      const matchesTag = selectedTag ? (story.tags && story.tags.includes(selectedTag)) : true;

      console.log("Story:", story);
      console.log("Selected Tag:", selectedTag);
      console.log("Matches Tag:", matchesTag);
      // const matchesAuthor = selectedAuthor
      //   ? selectedAuthor === "all" ||
      //     (selectedAuthor === "user" && story.author === "user") ||
      //     (selectedAuthor === "detroitRiverStoryLab" && story.author === "detroitRiverStoryLab")
      //   : true;
      // const matchesDate = selectedDate
      //   ? selectedDate === "anytime" ||
      //     (selectedDate === "today" && isToday(story.date)) ||
      //     (selectedDate === "thisWeek" && isThisWeek(story.date)) ||
      //     (selectedDate === "thisMonth" && isThisMonth(story.date)) ||
      //     (selectedDate === "thisYear" && isThisYear(story.date))
      //   : true;
  
      // return matchesLocation && matchesTag && matchesAuthor && matchesDate;
      // return matchesLocation && matchesTag;
      return matchesTag
    });
  };

  // const handleApplyFilter = () => {
  //   const filteredStories = filterStories(
  //     storyList,
  //     // selectedLocation,
  //     selectedTag,
  //     // selectedAuthor,
  //     // selectedDate
  //   );
  //   setFilteredStories(filteredStories);
  //   setIsFilterOpen(!isFilterOpen)
  // };

  const handleApplyFilter = () => {
    console.log("Selected Tag:", selectedTag);
    const filteredStories = filterStories(storyList, selectedTag[0]); // Pass selectedTag[0]
    setFilteredStories(filteredStories);
    setIsFilterOpen(!isFilterOpen);
  };
  
  

  const handleCancelFilter = () => {
    // Reset the selected values
    setSelectedLocation(null);
    setSelectedTag(null);
    setSelectedAuthor(null);
    setSelectedDate(null);
    setIsFilterOpen(!isFilterOpen)
  };

  const filterOption = (input, option) => {
    if (typeof option === 'string') {
      return option.toLowerCase().includes(input.toLowerCase());
    } else {
      return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    }
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
            onChange={(value) => {
              setSelectedTag(value);
            }}
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

      <div className={styles["filtered-stories-container"]}>
        {filteredStories.map((story) => (
          // console.log("Filtered Stories:", filteredStories);
          <Card
            key={story.id}
            postId={story.id}
            title={story.title}
            content={story.content}
            author={story.userId}
            type="user-story"
            imgSrc={story.media[0]}
          />
        ))}
      </div>
    </div>
  )
};

export default SearchPage;