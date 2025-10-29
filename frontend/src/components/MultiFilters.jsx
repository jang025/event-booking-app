import React from "react";
import { useEffect, useState } from "react";

export default function MultiFilters() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  // const [filteredItems, setFilteredItems] = useState(items);

  const handleFilterButtonClick = (selectedCategory) => {
    setSelectedFilter(selectedCategory);
    console.log("selected category:", selectedCategory);
  };

  let category = [
    "All",
    "Arts & Culture",
    "Food & Drink",
    "Business",
    "Lifestyle",
    "Health",
    "Community",
  ];

  return (
    <div>
      <p>showing categories:</p>
      <div
        className="filter-buttons-container"
        style={{
          display: "flex",
          gap: "10px",
          height: "38px",
          padding: "0 0 30px 0",
        }}
      >
        {category.map((cat, i) => (
          <button
            onClick={() => handleFilterButtonClick(cat)}
            key={i}
            style={{
              backgroundColor: selectedFilter === cat ? "black" : "white",
              color: selectedFilter === cat ? "white" : "black",
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
