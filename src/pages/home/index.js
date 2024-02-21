import styles from "./index.module.css";
import Card from "../../components/Card";
import Button from "../../components/Button";
import imgSrc from "../../assets/images/card_img.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <main>
        <section className={styles["user-stories"]}>
          <h2 className={styles["story-h2"]}>Site 3: User Stories</h2>
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
              <Button
                text="Share Your Story"
                handleOnClick={() => navigate("/create-story")}
              />
              <Button text="View More" handleOnClick={() => {}} />
            </div>
          </div>
        </section>
        <section className={styles["partnered-stories"]}>
          <h2 className={styles["story-h2"]}>Site 3: Partnered Stories</h2>
          <div className={styles["cards-container"]}>
            <Card
              title="Neighborhood Lives"
              content="Local stories and memories of historic riverside neighborhoods like Black Bottom, Corktown, and Delray."
              author="Detroit Historical Society"
              type="lab-story"
              imgSrc={imgSrc}
            />
          </div>
          <div className={styles["button-container"]}>
            <Button
              text="View More"
              handleOnClick={() => navigate("/create-story")}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
