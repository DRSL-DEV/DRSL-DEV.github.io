import React, {useState} from 'react';
import "./index.css";
import Card from "../../components/Card";
import GridCard from "../../components/GridCard";
import grid_view from "../../assets/icons/grid_view.svg";
import list_view from "../../assets/icons/list_view.svg";
// import arrow_left from "../../assets/icons/arrow_left.svg";
import imgSrc from "../../assets/images/card_img.png";
import Title from "../../components/PageTitle";
import TextCard from "../../components/TextCard";
import Button from '../../components/Button';

const SitePage = () => {
  // You can replace 'Site Title' and 'Number of Stories' with your actual data.
  const siteTitle = 'Site Title';
  const numberOfStories = 10;
  const contentTitle = 'Support + Industry'

  const [isGridView, setIsGridView] = useState(true);

  const handleViewChange = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className='wrapper'>
      <div className="content">
        <Title title={siteTitle} />
        <section className="site-section">
          <div className="stories-count">{numberOfStories} stories</div>
          <button className="view-change-button" onClick={handleViewChange}>
            <span>Change View</span>
            <img src={isGridView ? grid_view : list_view} alt="Change View" />
          </button>
        </section>
        <section className='user-content'>
          <h2>Posts and Photos</h2>
          {isGridView ? (
            <>
            <Card 
              title={contentTitle}
              content="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
              author="Steven Henry"
              type="user-story"
              imgSrc={imgSrc}
            />
            <Card 
              title={contentTitle}
              content="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
              author="Steven Henry"
              type="user-story"
              imgSrc={imgSrc}
            />
          </>
          ) : (
          <>
            <div className='grid-view'>
              <GridCard
                title={contentTitle}
                imgSrc={imgSrc}
              />
              <GridCard
                title={contentTitle}
                imgSrc={imgSrc}
              />
              <GridCard
                title={contentTitle}
                imgSrc={imgSrc}
              />
            </div>
          </>
          )}
        <div className='button-container'>
          <Button
            text="View More"
            to="/site-page"
          />
        </div>
        
          {/* Add more <Card /> or <GridCard /> components as needed */}
        </section>
        <hr />
        <section className='user-content'>
          <h2>Posts</h2>
          <TextCard
            title={contentTitle}
            previewContent="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
            author="Steven Henry"
            pfpSource={imgSrc}
            date="1/1/2021"
          />
          <div className='button-container'>
            <Button
              text="View More"
              to="/site-page"
            />
        </div>
          {/* Add more <Card /> or <GridCard /> components as needed */}
        </section>
      </div>
    </div>
  );
};

export default SitePage;
