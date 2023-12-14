import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScore } from "../../app/slices/userSlice";

function IncreaseScoreForm() {
  const [count, setCount] = useState(0);
  const { score } = useSelector((root) => root.userState);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Current score value: {score}</h2>
      <button onClick={() => dispatch(setScore(score))}>+</button>
      <button onClick={() => dispatch(setScore(-score))}>-</button>
      <input
        type="number"
        placeholder="Increase count..."
        value={count}
        onChange={(e) => setCount(e.target.value)}
      ></input>
    </div>
  );
}

export default IncreaseScoreForm;
