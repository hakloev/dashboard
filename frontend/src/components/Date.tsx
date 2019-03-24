import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Text = styled.p`
    margin: 0;
    font-weight: 100;
    font-size: 2em;
`;

function Clock() {
  const [date, setDate] = useState(moment());

  useEffect(() => {
    const tomorrow = moment().add(1, "day");
    const diff = tomorrow.diff(date, "milliseconds");

    const timeout = setTimeout(tick, diff);
    return () => clearTimeout(timeout);
  });

  function tick() {
    setDate(moment());
  }

  return (
    <Text>{moment(date).format("dddd, DD MMMM")}</Text>
  );
}

export default Clock;
