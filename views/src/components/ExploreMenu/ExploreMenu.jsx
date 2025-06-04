import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../images/images";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div>
      <div className="explore-menu" id="explore-menu">
        <h1>Explore our collections</h1>
        <p className="explore-menu-text">
          Dive into the world of cuteness and creativity with our handpicked
          stationery collections! From pastel pens to adorable notebooks, each
          item is crafted to spark joy and brighten your workspace. Let your
          desk tell your story, one kawaii piece at a time.
        </p>
        <div className="explore-menu-list">
          {menu_list.map((item, index) => {
            return (
              <div
                onClick={() => {
                  const selected = item.menu_name;
                  setCategory((prev) => (prev === selected ? "All" : selected));

                  // Delay scrolling slightly to let the new content load/render
                  setTimeout(() => {
                    const displaySection =
                      document.getElementById("item-display");
                    if (displaySection) {
                      displaySection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }, 100);
                  // slight delay for rendering
                }}
                key={index}
                className="explore-menu-list-item"
              >
                <img
                  className={category === item.menu_name ? "active" : ""}
                  src={item.menu_image}
                  alt={item.menu_name}
                />
                <p>{item.menu_name}</p>
              </div>
            );
          })}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ExploreMenu;

