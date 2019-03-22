import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ClockText = styled.p`
    font-weight: 100;
    font-size: 2.5em;
`;

function Clock({ className }: { className?: string }) {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(tick, 1000);
        return () => clearInterval(timer);
    });

    function tick() {
        setDate(new Date());
    }

    return (
        <ClockText>
            {moment(date).format("HH:mm")}
        </ClockText>
    );
}

export default Clock;
