import React from "react";
// import { sampleEvents } from "../data/sampleEvents.js";
import Eventcard from "../components/Eventcard.jsx";
import { useState, useEffect } from "react";

export default function EventListPage({ events, setEventId }) {
  // const [events, setEvents] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedSort, setSelectedSort] = useState("date");
  const [searchTerm, setSearchTerm] = useState("");

  //categories for filter function
  let categories = [
    "All",
    "Arts & Culture",
    "Food & Drink",
    "Business & Networking",
    "LifeStyle",
    "Health",
    "Community",
  ];

  //to fetch events from backend
  useEffect(() => {
    fetch(
      `http://localhost:3000/api/eventlist?category=${selectedFilter}&search=${searchTerm}&sort=${selectedSort}`
    )
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, [selectedSort, searchTerm, selectedFilter]);

  function handleSortChange(value) {
    setSelectedSort(value);
  }

  function handleSearch() {
    // intentionally empty
    // searchTerm is already in useEffect dependency list,
    // so typing or pressing Enter will trigger a backend fetch
  }

  const handleFilterButtonClick = (selectedCategory) => {
    setSelectedFilter(selectedCategory);
    console.log("selected category:", selectedCategory);
  };

  return (
    <div>
      {/* search bar */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px 0 20px 0",
          width: "100%",
          height: "38px",
        }}
      >
        <input
          type="text"
          placeholder="Search events"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
          style={{
            maxWidth: "350px",
            minWidth: "150px",
            width: "100%",
            height: "100%",
          }}
        ></input>
        <button
          onClick={handleSearch}
          style={{ height: "100%", padding: "0 16px", boxSizing: "border-box" }}
        >
          {" "}
          🔍{" "}
        </button>
      </div>

      {/* sort buttons */}
      <div style={{ display: "flex" }}>
        {/* multifilter buttons  */}
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
            {categories.map((cat, i) => (
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

            <div>
              <label>Sort by: </label>
              <select onChange={(e) => handleSortChange(e.target.value)}>
                {" "}
                <option value="date">Date</option>
                {/* <option value="priceLow">Price: Low → High</option>
                <option value="priceHigh">Price: High → Low</option> */}
              </select>
            </div>
          </div>
          {/* sort by dropdown  */}
        </div>
      </div>

      {/* list of events container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "160px",
          gap: "15px",
          alignContent: "center",
          maxWidth: "1000px",
          minWidth: "800px",
          width: "100%",
        }}
      >
        {events.map((event) => (
          <Eventcard key={event._id} setEventId={setEventId} event={event} />
        ))}
      </div>
    </div>
  );
}
