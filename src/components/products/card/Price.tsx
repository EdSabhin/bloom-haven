import React from "react";

const Price = ({ price }: { price: number | string}) => {
  return <h3>${price}</h3>;
};

export default Price;
