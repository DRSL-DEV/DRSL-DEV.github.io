import styles from "./index.module.css";
import Card from "../../components/Card";
import Button from "../../components/Button";
import CategoryHeader from "../../components/CategoryHeader";
import imgSrc from "../../assets/images/card_img.png";
import gallery_placeholder from "../../assets/images/home_gallery.png";
import filter from "../../assets/icons/filter.svg";
import location_pin from "../../assets/icons/location_pin.svg";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";

const HomePage = () => {
  const navigate = useNavigate();

  const mediaUrls = [gallery_placeholder, gallery_placeholder, gallery_placeholder];

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
        <section className={styles["user-stories-section"]}>
          <CategoryHeader title="Communities & Livelihood" />
          <div className={styles["cards-container"]}>
            <Card
              title="Support + Industry"
              content="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
              author="Steven Henry"
              type="user-story"
              imgSrc={imgSrc}
            />
            <Card
              title="Support + Industry"
              content="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
              author="Steven Henry"
              type="user-story"
              imgSrc={imgSrc}
            />
            <div className={styles["button-container"]}>
              <Button text="View More" handleOnClick={() => { }} />
            </div>
          </div>
        </section>
        <section className={styles["user-stories-section"]}>
          <CategoryHeader title="Indigenous History" />
          <div className={styles["cards-container"]}>
            <Card
              title="River Resistance"
              content="Elevated by one another, enriched by our shared understanding. Our history details our existence..."
              author="Imani Jackson"
              type="user-story"
              imgSrc={imgSrc}
            />
            <Card
              title="Support + Industry"
              content="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
              author="Steven Henry"
              type="user-story"
              imgSrc={imgSrc}
            />
            <div className={styles["button-container"]}>
              <Button text="View More" handleOnClick={() => { }} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
