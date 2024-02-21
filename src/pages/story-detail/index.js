import image_placeholder from "../../assets/images/image_placeholder.png";
import PageHeader from "../../components/PageHeader";
import StoryInfo from "../../components/StoryInfo";
import styles from "./index.module.css";

const StoryDetailPage = () => {
  const siteTitle = "Site Title";

  return (
    <div className="page-container">
      <PageHeader title={siteTitle} />
      <div className={styles["img-container"]}>
        <img src={image_placeholder} alt="house" />
      </div>
      <section className={styles["story-section"]}>
        <StoryInfo />

        <h1>TITLE OF STORY</h1>
        <p className={styles["story-text"]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Magnis dis
          parturient montes nascetur ridiculus mus mauris. Pellentesque elit
          eget gravida cum sociis. Sit amet tellus cras adipiscing enim eu
          turpis egestas pretium. Sit amet porttitor eget dolor morbi non arcu
          risus quis. Amet risus nullam eget felis eget nunc lobortis mattis.
          Lacus suspendisse faucibus interdum posuere lorem ipsum. Sed tempus
          urna et pharetra. Et malesuada fames ac turpis egestas sed tempus
          urna. Eu scelerisque felis imperdiet proin fermentum leo vel orci.
          Scelerisque felis imperdiet proin fermentum leo. At tellus at urna
          condimentum mattis. Mauris cursus mattis molestie a iaculis at erat
          pellentesque adipiscing. Non odio euismod lacinia at quis risus sed.
          Ultrices vitae auctor eu augue ut lectus arcu. Viverra suspendisse
          potenti nullam ac tortor. Pulvinar sapien et ligula ullamcorper
          malesuada proin. Donec massa sapien faucibus et. Phasellus vestibulum
          lorem sed risus ultricies tristique nulla. Risus nec feugiat in
          fermentum posuere urna nec. Nisi est sit amet facilisis. Integer enim
          neque volutpat ac. Enim neque volutpat ac tincidunt vitae semper quis
          lectus nulla. Porttitor rhoncus dolor purus non enim praesent.
          Malesuada fames ac turpis egestas. Nulla facilisi nullam vehicula
          ipsum a arcu cursus vitae congue. Non sodales neque sodales ut etiam
          sit amet nisl purus. Etiam non quam lacus suspendisse. Sit amet
          commodo nulla facilisi nullam vehicula ipsum a. Ac ut consequat semper
          viverra nam libero justo. Ultrices dui sapien eget mi proin. Justo
          laoreet sit amet cursus sit amet dictum sit amet. Mattis pellentesque
          id nibh tortor.
        </p>
      </section>
    </div>
  );
};

export default StoryDetailPage;
