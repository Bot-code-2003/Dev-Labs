import React, { useState } from "react";

const ToggleExample = () => {
  // State to track if dropdown is open or closed
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Function to toggle the dropdown visibility
  const toggleFilter = () => {
    setMobileFilterOpen(!mobileFilterOpen);
  };

  return (
    <div>
      <div style={{ padding: "20px" }}>
        {/* Button to toggle dropdown */}
        <button
          onClick={toggleFilter}
          style={{ padding: "10px", fontSize: "16px" }}
        >
          Toggle Filter
        </button>

        {/* Dropdown content */}
        {mobileFilterOpen && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              border: "1px solid black",
              width: "200px",
            }}
          >
            <p>Option 1</p>
            <p>Option 2</p>
            <p>Option 3</p>
          </div>
        )}
      </div>
      <div>
        <ul>
          <li>vatta</li>
          <li>abbabba</li>
        </ul>
      </div>
    </div>
  );
};

export default ToggleExample;
