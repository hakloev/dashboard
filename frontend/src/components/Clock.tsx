import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Clock({ className }: { className: string }) {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(tick, 1000);
        return () => clearInterval(timer);
    });

    function tick() {
        setDate(new Date());
    }

    return <p className={className}>{moment(date).format("HH:mm")}</p>;
}

export default styled(Clock)`
    font-weight: bold;
    font-size: 2.5em;
`;
