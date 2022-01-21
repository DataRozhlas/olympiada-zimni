import React from "react";

const Input = () => {
  return (
    <div>
      <label htmlFor="height">Zadejte výšku </label>
      <input
        type="number"
        id="height"
        name="height"
        min="135"
        max="210"
        required
      />
      <label htmlFor="weight"> Zadejte váhu </label>
      <input
        type="number"
        id="weight"
        name="weight"
        min="30"
        max="145"
        required
      />
      <label htmlFor="sex"> Vyberte pohlaví </label>
      <select name="sex" id="sex" defaultValue="F">
        <option value="F">žena</option>
        <option value="M">muž</option>
      </select>
    </div>
  );
};

export default Input;
