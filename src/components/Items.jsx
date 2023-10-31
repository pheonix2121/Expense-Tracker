import React from "react";

const Items = (props) => {
  return (
    <div>
      <h5>Rs. {props.item.amount}</h5>
      <p>{props.item.description}</p>
      <h5>{props.item.category}</h5>
    </div>
  );
};

export default Items;