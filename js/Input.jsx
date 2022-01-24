import React from "react";

const Input = ({ sex, setSex, height, setHeight, weight, setWeight }) => {
  const changeSex = (e) => {
    setSex(e.target.value);
  };

  const setWeightHeight = (e) => {
    e.target.id === "weight"
      ? setWeight(Number(e.target.value))
      : setHeight(Number(e.target.value));
  };

  return (
    <div>
      <label htmlFor="height">Zadejte výšku </label>
      <input
        type="number"
        id="height"
        name="height"
        value={height}
        onChange={setWeightHeight}
        min="135"
        max="210"
        required
      />
      <label htmlFor="weight"> Zadejte váhu </label>
      <input
        type="number"
        id="weight"
        name="weight"
        value={weight}
        onChange={setWeightHeight}
        min="30"
        max="145"
        required
      />
      <label>
        <input
          type="radio"
          name="sex-radio"
          value="F"
          onChange={changeSex}
          checked={sex === "F"}
        />
        ženy
      </label>
      <label>
        <input type="radio" name="sex-radio" value="M" onChange={changeSex} />
        muži
      </label>
    </div>
  );
};

export default Input;
