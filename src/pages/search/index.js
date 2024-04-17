import styles from "./index.module.css";
import { Input } from "antd";
import search from "../../assets/icons/search.svg";
import filter from "../../assets/icons/filter.svg";
import back from "../../assets/icons/back.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Select, Radio, Divider, Space } from "antd";
import Button from "../../components/Button";
import { siteLocationList, tagList } from "../../constants/constants";
import tag_blue from "../../assets/icons/tag_blue.svg";
import location_red from "../../assets/icons/location_red.svg";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/Card";
import { subscribeToStoryList } from "../../data/features/storyListSlice";

const SearchPage = () => {
  const onSearch = (value) => console.log(value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storyList = useSelector((state) => state.storyList.storyList);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [selectedDate, setSelectedDate] = useState("anytime");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredStories, setFilteredStories] = useState([]);
  // const [previousFilters, setPreviousFilters] = useState({});

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToStoryList(selectedTag)); // Pass selectedTag
    return () => unsubscribe(); // Unsubscribe when component unmounts
  }, [dispatch, selectedTag]); // Include selectedTag as a dependency

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const filterStories = (
    storyList,
    selectedTag,
    selectedLocation,
    selectedAuthor,
    selectedDate
  ) => {
    return storyList.filter((story) => {
      const matchesLocation = selectedLocation
        ? story.site && story.site === selectedLocation
        : true;

      const matchesTag = selectedTag
        ? story.tags && story.tags.includes(selectedTag)
        : true;

      let matchesAuthor = true;
      if (selectedAuthor === "user") {
        matchesAuthor = story.postType !== "admin";
      } else if (selectedAuthor === "detroitRiverStoryLab") {
        matchesAuthor = story.postType === "admin";
      }

      let matchesDate = true;
      if (selectedDate) {
        const storyDate = new Date(story.submitTime);
        const today = new Date();
        const daysDifference = (today - storyDate) / (1000 * 60 * 60 * 24); // Calculate difference in days

        switch (selectedDate) {
          case "today":
            matchesDate = daysDifference < 1;
            break;
          case "thisWeek":
            matchesDate = daysDifference < 7;
            break;
          case "thisMonth":
            matchesDate =
              today.getMonth() === storyDate.getMonth() &&
              today.getFullYear() === storyDate.getFullYear();
            break;
          case "thisYear":
            matchesDate = today.getFullYear() === storyDate.getFullYear();
            break;
          default:
            matchesDate = true;
        }
      }

      return matchesLocation && matchesTag && matchesAuthor && matchesDate;
    });
  };

  const handleApplyFilter = () => {
    const filteredStories = filterStories(
      storyList,
      selectedTag[0],
      selectedLocation,
      selectedAuthor,
      selectedDate
    ); // Pass selectedTag[0]
    setFilteredStories(filteredStories);
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCancelFilter = () => {
    // Reset the selected values
    setSelectedLocation("");
    setSelectedTag("");
    setSelectedAuthor(null);
    setSelectedDate(null);
    setIsFilterOpen(!isFilterOpen);
  };

  const filterOption = (input, option) => {
    if (typeof option === "string") {
      return option.toLowerCase().includes(input.toLowerCase());
    } else {
      return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    }
  };

  return (
    <div className={`page-container ${styles["search-page-container"]}`}>
      <div className={styles["new-navbar-container"]}>
        <img src={back} alt="back" onClick={() => navigate(-1)} />
        <Input
          prefix={<img src={search} alt="search" style={{ width: "20px" }} />}
          placeholder="input search keywords"
          allowClear
          onPressEnter={onSearch}
          style={{ width: "68vw", borderRadius: "50px" }}
        />
        <img src={filter} alt="filter" onClick={handleFilterClick} />
      </div>
      {isFilterOpen && (
        <div className={styles["filter-container"]}>
          <h2>Search Filter</h2>

          <h3>Location</h3>
          <Select
            placeholder="Select location"
            value={selectedLocation || undefined}
            onChange={(id) => {
              setSelectedLocation(id);
            }}
            mode="location"
            showSearch
            optionFilterProp="children"
            filterOption={filterOption}
            suffixIcon={<img src={location_red} alt="location" />}
            options={siteLocationList.map((site) => ({
              value: site.id,
              label: site.name,
            }))}
            className={styles["drop-down"]}
          ></Select>
          <Divider />

          <h3>Tag</h3>
          <Select
            placeholder="Select tag"
            value={selectedTag || undefined}
            onChange={(value) => {
              setSelectedTag(value);
            }}
            mode="tags"
            showSearch
            optionFilterProp="children"
            filterOption={filterOption}
            suffixIcon={<img src={tag_blue} alt="tags" />}
            options={tagList.map((tag) => ({
              value: tag.value,
              label: tag.label,
            }))}
            className={styles["drop-down"]}
          ></Select>
          <Divider />

          <h3>Author</h3>
          <Radio.Group
            onChange={(e) => setSelectedAuthor(e.target.value)}
            value={selectedAuthor}
          >
            <Space direction="vertical">
              <Radio value="all">All</Radio>
              <Radio value="user">User</Radio>
              <Radio value="detroitRiverStoryLab">
                Detroit River Story Lab *
              </Radio>
            </Space>
          </Radio.Group>
          <Divider />

          <h3>Date</h3>
          <Radio.Group
            onChange={(e) => setSelectedDate(e.target.value)}
            value={selectedDate}
          >
            <Space direction="vertical">
              <Radio value="anytime">Anytime</Radio>
              <Radio value="today">Today</Radio>
              <Radio value="thisWeek">This Week</Radio>
              <Radio value="thisMonth">This Month</Radio>
              <Radio value="thisYear">This Year</Radio>
            </Space>
          </Radio.Group>

          <div className={styles["filter-button"]}>
            <Button
              text="Cancel Filter"
              handleOnClick={handleCancelFilter}
              customStyles={{ backgroundColor: "#D7D7D7" }}
            />
            <Button text="Apply Filter" handleOnClick={handleApplyFilter} />
          </div>
        </div>
      )}

      <div className={styles["filtered-stories-container"]}>
        {filteredStories.length === 0 ? (
          <p>No user stories found.</p>
        ) : (
          filteredStories.map((story) => (
            <Card
              key={story.id}
              postId={story.id}
              title={story.title}
              content={story.content}
              author={story.userId}
              type="user-story"
              imgSrc={story.media[0]}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
