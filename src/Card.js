import React from "react";

const Card = props => <img
  style={{ transform: props.transform}}
  alt={props.name}
  src={props.image}
/>;

export default Card;