import styled from "styled-components";
import LinkBlank from "./LinkBlank";

const StyledFooter = styled.footer`
    ul{
        &::after{
        content: "";
        clear: both;
        display: block;
        }
        li{
        float:left;
        margin-bottom: 0;
        line-height: normal;
            &:not(:last-child)::after{
                content: "|";
                margin: 0 5px;
            }
        }
    }
    .copyright{
        text-align: center;
    }
`
function Footer(){
    return(
    <StyledFooter>
        <ul>
            <li><LinkBlank href="mailto:gogogo2115@gmail.com" title="메일 보내기">메일 보내기</LinkBlank></li>
            <li><LinkBlank href="https://github.com/gogogo2115">github</LinkBlank></li>
        </ul>
        <div className="copyright">
        Copyright © <b>gogogo2115</b>
        </div>
    </StyledFooter>);
}
export default Footer;