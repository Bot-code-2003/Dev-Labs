// SkillsInput.js
import React, { useState } from "react";

const allSkills = [
  "JavaScript",
  "Python",
  "Java",
  "React",
  "Redux",
  "Node.js",
  "Express",
  "MongoDB",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Git",
  "GitHub",
  "PostgreSQL",
  "Adobe Photoshop",
  "Adobe XD",
  "Figma",
];

function SkillsInput({ skills, setFormData }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filteredSkills = allSkills.filter(
        (skill) =>
          skill.toLowerCase().includes(value.toLowerCase()) &&
          !skills.includes(skill)
      );
      setSuggestions(filteredSkills);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (skill) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, skill],
    }));
    setInputValue("");
    setSuggestions([]);
  };

  const handleRemoveSkill = (skill) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((s) => s !== skill),
    }));
  };

  return (
    <div className="relative">
      <label
        htmlFor="skills"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Skills
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full flex items-center"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="ml-1 text-gray-500 hover:gray-red-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        id="skills"
        name="skills"
        type="text"
        className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type to add skills"
        value={inputValue}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
          {suggestions.map((skill, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(skill)}
              className="px-3 py-2 cursor-pointer hover:bg-blue-100"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SkillsInput;
