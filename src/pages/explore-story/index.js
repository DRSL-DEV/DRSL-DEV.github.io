import { useSelector, useDispatch } from "react-redux";
import { subscribeToStoryList } from "../../data/features/storyListSlice";
import { useEffect } from "react";
import styles from "./index.module.css";
import Card from "../../components/Card";
import Button from "../../components/Button";
import CategoryHeader from "../../components/CategoryHeader";
// import imgSrc from "../../assets/images/card_img.png";
import gallery_placeholder from "../../assets/images/home_gallery.png";
// import filter from "../../assets/icons/filter.svg";
import location_pin from "../../assets/icons/location_pin.svg";
import { useNavigate } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { Carousel, Collapse } from "antd";
import { tagList } from "../../constants/constants";
import { Link } from "react-router-dom";
const { Panel } = Collapse;

const CustomCollapse = ({ items }) => (
  <Collapse
    accordion
    expandIcon={({ isActive }) => (
      <RightOutlined
        rotate={isActive ? 90 : 0}
        style={{ color: "white", fontSize: "1.5em" }}
      />
    )}
    expandIconPosition="end"
    className={styles["custom-collapse"]}
  >
    {items.map((item) => (
      <Panel header={item.label} key={item.key} style={item.style}>
        {item.children}
      </Panel>
    ))}
  </Collapse>
);

const ExploreStory = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const categories = tagList.map((tag) => tag.label);

  const mediaUrls = [
    gallery_placeholder,
    gallery_placeholder,
    gallery_placeholder,
  ];

  const panelStyle = {
    marginBottom: "1%",
    border: "none",
    backgroundColor: "var(--secondary-color-sky-blue-dark)",
  };

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToStoryList());

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const stories = useSelector((state) => state.storyList.storyList);
  //add selection of stories based on status and user type
  const approvedUserStoryList = stories.filter(
    (story) => story.status === "approved"
  );

  const items = (panelStyle) =>
    categories.map((category, index) => ({
      key: index,
      label: <CategoryHeader title={category} style={panelStyle} />,
      children: (
        <div className={styles["cards-container"]}>
          {approvedUserStoryList
            .filter(
              (story) =>
                Array.isArray(story.tags) && story.tags.includes(category)
            )
            .map((story) => (
              <Card
                key={story.id}
                title={story.title}
                content={story.content.substring(0, 65) + "..."}
                author={story.userId}
                type={story.postType === "user" ? "user-story" : "lab-story"}
                imgSrc={story.media[0]}
              />
            ))}
          {/* <div className={styles["button-container"]}>
            <Button text="View More" handleOnClick={() => {}} />
          </div> */}
        </div>
      ),
      style: panelStyle,
    }));

  return (
    <div className={`page-container ${styles["homepage-container"]}`}>
      <main>
        <section>
          <div className={styles["page-header"]}>
            <h1>Explore Regional Stories</h1>
          </div>
        </section>
        <Carousel className={styles.carousel} autoplay>
          {mediaUrls.map((mediaUrl, index) => (
            <div key={index} className={styles["carousel-item"]}>
              <img
                className={styles["story-image-gallery"]}
                src={mediaUrl}
                alt="home gallery"
              />
              <div className={styles.overlay}>
                <p className={styles["carousel-title"]}>
                  Historical Collective
                </p>
                <p className={styles["carousel-sub-title"]}>
                  Reflective Perspectives from Detroit Natives
                </p>
                <a
                  href="/story"
                  onClick={() => navigate("/story")}
                  className={styles["carousel-link"]}
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </Carousel>

        <section className={styles["filter-section"]}>
          {/* <div className={styles["filter-container"]}>
            <img src={filter} alt="filter" />
            <p>Filter by Category</p>
          </div> */}
          <div className={styles["location-container"]}>
            <img src={location_pin} alt="location" />
            <Link 
              to={"/explore-site"}
              className={styles["explore-site-link"]}
              >
                Explore Sites
            </Link>
          </div>
        </section>
        <section>
          <CustomCollapse items={items(panelStyle)} />
        </section>
      </main>
    </div>
  );
};

export default ExploreStory;
