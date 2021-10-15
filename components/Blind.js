import styled, {css} from "styled-components"

const StlyedBlindCss = css`
    position: absolute !important;
    width: 1px !important; 
    height: 1px !important;
    margin: -1px !important;  
    overflow: hidden !important; 
    clip: rect(0 0 0 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
    font-size: 1px !important; 
    text-indent: -9999em !important;
    line-height: 0 !important;
`;

const Blind = styled.span`${StlyedBlindCss}`;
export const BlindDiv = styled(Blind).attrs({as: "div", className: "BlindDiv"})``;
export const BlindH1 = styled(Blind).attrs({as: "h1", className: "BlindH1"})``;
export const BlindH2 = styled(Blind).attrs({as: "h2", className: "BlindH2"})``;
export const BlindH3 = styled(Blind).attrs({as: "h3", className: "BlindH3"})``;
export const BlindH4 = styled(Blind).attrs({as: "h4", className: "BlindH4"})``;
export const BlindH5 = styled(Blind).attrs({as: "h5", className: "BlindH5"})``;
export const BlindH6 = styled(Blind).attrs({as: "h6", className: "BlindH6"})``;
export default Blind;
