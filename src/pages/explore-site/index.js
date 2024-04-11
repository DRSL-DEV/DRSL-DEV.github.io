import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.css";
import CategoryHeader from "../../components/CategoryHeader";
import { siteLocationList } from "../../constants/constants";
import Title from "../../components/PageHeader";
import { Link } from "react-router-dom";


const ExploreSite = () => {
  const panelStyle = {
    marginBottom: "1%",
    border: "none",
    backgroundColor: "var(--secondary-color-sky-blue-dark)",
  };

  const titlePage = "Explore Sites";

  return (
    <div className={`page-container ${styles["homepage-container"]}`}>
      <main>
        <section>
          <div className={styles["page-header"]}>
            <Title title={titlePage}/>
          </div>
        </section>
        <section className={styles["site-list"]}>
          {siteLocationList.map((site) => (
            <div key={site.id} className={styles["site-name"]}>
              <Link
                to={`/site/${site.name
                  .toLowerCase()
                  .replace(/ /g, "-")
                  .replace(/[^\w-]+/g, "")}`}
                state={{ siteLocationId: site.id }}
              >
                {site.name}
              </Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ExploreSite;
