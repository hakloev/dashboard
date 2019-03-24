import React from "react";
import styled from "styled-components";

import Clock from "../../components/Clock";
import Date from "../../components/Date";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1em;
`;

function Header() {
    return (
        <Container>
            <Clock />
            <Date />
        </Container>
    );
}

export default Header;
