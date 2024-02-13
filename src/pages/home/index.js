import React from "react";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import imgSrc from "../../assets/images/card_img.png";
import './index.css';

const HomePage = () => {

  return (
    <div>
      <main>
        <section className="user-stories">
          <h2>Site 3: User Stories</h2>
          <div className="cards-container">
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
            <div className="button-container">
              <Button text="Share Your Story" to="/" />
              <Button text="View More" to="/" />
            </div>
          </div>
        </section>
        <section className="partnered-stories">
          <h2>Site 3: Partnered Stories</h2>
          <div className="cards-container">
            <Card
              title="Neighborhood Lives"
              content="Local stories and memories of historic riverside neighborhoods like Black Bottom, Corktown, and Delray."
              author="Detroit Historical Society"
              type="lab-story"
              imgSrc={imgSrc}
            />
          </div>
          <div className="button-container">
            <Button text="View More" to="/" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
