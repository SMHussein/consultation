"use client";

import { useState } from "react";

export default function RadioInput({ label, items, groupName }) {
  const [selected, setSelected] = useState(items[0]?.id || "");

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <fieldset className="border border-accent-50 rounded p-2">
      <legend className="font-medium">{label}</legend>
      <div className="">
        {items.map((item) => (
          <div
            key={`${groupName}-${item.id}`}
            className="flex items-center gap-2 p-4"
          >
            <input
              type="radio"
              id={`${groupName}-${item.id}`}
              name={groupName}
              value={item.id}
              checked={selected === item.id}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <label
              htmlFor={`${groupName}-${item.id}`}
              className="capitalize text-gray-700 cursor-pointer"
            >
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
