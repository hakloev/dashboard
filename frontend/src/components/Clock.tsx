import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Text = styled.p`
    margin: 0;
    font-weight: 100;
    font-size: 2.5em;
`;

function Clock() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(tick, 1000);
        return () => clearInterval(timer);
    });

    function tick() {
        setDate(new Date());
    }

    return (
        <Text>{moment(date).format("HH:mm")}</Text>
    );
}

export default Clock;
