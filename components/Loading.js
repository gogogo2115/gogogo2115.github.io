import styled from "styled-components";

const StyledLoading = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0 auto;
    z-index: 2000;
`

export default function Loading(){
    return(
    <StyledLoading>
        Loading
    </StyledLoading>);
}