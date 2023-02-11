import React from "react";
import { LAYOUTS } from "./constants";

export const LayoutSelector = ({ option, setOptions }) => {
  return (
    <select value={option} onChange={(e) => setOptions(e.target.value)}>
      {Object.keys(LAYOUTS).map((key) => (
        <option key={key} value={LAYOUTS[key]}>
          {key}
        </option>
      ))}
    </select>
  );
};

export default LayoutSelector;
