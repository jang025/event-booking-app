import React from "react";
import { useEffect, useState } from "react";

export default function MultiFilters() {
  // const [selectedFilters, setSelectedFilters] = useState([]);
  // const [filteredItems, setFilteredItems] = useState(items);

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
          <button key={i}>{cat}</button>
        ))}
      </div>
    </div>
  );
}
