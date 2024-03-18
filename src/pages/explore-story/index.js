import { useSelector, useDispatch } from 'react-redux';
import { fetchStoryList } from '../../data/features/storyListSlice';
import { useEffect } from "react";
import styles from "./index.module.css";
import Card from "../../components/Card";
import Button from "../../components/Button";
import CategoryHeader from "../../components/CategoryHeader";
import imgSrc from "../../assets/images/card_img.png";
import gallery_placeholder from "../../assets/images/home_gallery.png";
import filter from "../../assets/icons/filter.svg";
import location_pin from "../../assets/icons/location_pin.svg";
import { useNavigate } from "react-router-dom";
import { RightOutlined } from '@ant-design/icons';
import { Carousel, Collapse } from "antd";
const { Panel } = Collapse;


// const items = (panelStyle) =>[
//   {
//     key: '1',
//     label: <CategoryHeader title="Community & Livelihood" style={panelStyle} />,
//     children: (
//       <div className={styles["cards-container"]}>
//         <Card
//           key={story.id}
//           title={story.title}
//           content={story.content}
//           author={story.userId}
//           type="user-story"
//           imgSrc={imgSrc}
//         />
//         <div className={styles["button-container"]}>
//           <Button text="View More" handleOnClick={() => { }} />
//         </div>
//       </div>
//     ),
//     style: panelStyle,
//   },
//   {
//     key: '2',
//     label: <CategoryHeader title="Indigenous History" />,
//     children: (
//       <div className={styles["cards-container"]}>
//         <Card
//           title="River Resistance"
//           content="Elevated by one another, enriched by our shared understanding. Our history details our existence..."
//           author="Imani Jackson"
//           type="user-story"
//           imgSrc={imgSrc}
//         />
//         <Card
//           title="Support + Industry"
//           content="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
//           author="Steven Henry"
//           type="user-story"
//           imgSrc={imgSrc}
//         />
//         <div className={styles["button-container"]}>
//           <Button text="View More" handleOnClick={() => { }} />
//         </div>
//       </div>
//     ),
//     style: panelStyle,
//   },
//   {
//     key: '3',
//     label: <CategoryHeader title="Underground Railroad" />,
//     children: (
//       <div className={styles["cards-container"]}>
//         <Card
//           title="River Resistance"
//           content="Elevated by one another, enriched by our shared understanding. Our history details our existence..."
//           author="Imani Jackson"
//           type="user-story"
//           imgSrc={imgSrc}
//         />
//         <Card
//           title="Support + Industry"
//           content="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
//           author="Steven Henry"
//           type="user-story"
//           imgSrc={imgSrc}
//         />
//         <div className={styles["button-container"]}>
//           <Button text="View More" handleOnClick={() => { }} />
//         </div>
//       </div>
//     ),
//     style: panelStyle,
//   },
// ];

const CustomCollapse = ({ items }) => (
  <Collapse
    accordion
    expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} style={{ color: 'white', fontSize: '1.5em' }} />}
    expandIconPosition='end'
    className={styles["custom-collapse"]}
  >
    {items.map(item => (
      <Panel header={item.label} key={item.key}
      style={ 
        item.style
      }>
        {item.children}
      </Panel>
    ))}
  </Collapse>
);


const ExploreStory = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const categories = ["Communities & Livelihood", "Indigenous History", "Cultural Identities"];
  const mediaUrls = [gallery_placeholder, gallery_placeholder, gallery_placeholder];

  const panelStyle = {
    marginBottom: '1%',
    border: 'none',
    backgroundColor: 'var(--secondary-color-sky-blue-dark)',
  };

  useEffect(() => {
    dispatch(fetchStoryList());
  }, [dispatch]);

  const stories = useSelector((state) => state.storyList.storyList);

  const items = (panelStyle) => categories.map((category, index) => ({
    key: index,
    label: <CategoryHeader title={category} style={panelStyle} />,
    children: (
      <div className={styles["cards-container"]}>
      {stories.filter(story => Array.isArray(story.tags) && story.tags.includes(category)).map(story => (
          <Card
            key={story.id}
            title={story.title}
            content={story.content}
            author={story.userId}
            type="user-story"
            imgSrc={imgSrc} // replace with the actual image field
          />
        ))}
        <div className={styles["button-container"]}>
          <Button text="View More" handleOnClick={() => { }} />
        </div>
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
                <p className={styles["carousel-title"]}>Historical Collective</p>
                <p className={styles["carousel-sub-title"]}>Reflective Perspectives from Detroit Natives</p>
                <a href="/story" onClick={() => navigate("/story")} className={styles["carousel-link"]}>Learn More</a>
              </div>
            </div>
          ))}
        </Carousel>

        <section className={styles["filter-section"]}>
          <div className={styles["filter-container"]}>
            <img src={filter} alt="filter" />
            <p>Filter by Category</p>
          </div>
          <div className={styles["location-container"]}>
            <img src={location_pin} alt="location" />
            <p>Explore Sites</p>
          </div>
        </section>
        <section>
          <CustomCollapse 
            items={items(panelStyle)}
            />
        </section>
      </main>
    </div>
  );
};

export default ExploreStory;
