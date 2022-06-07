import { isNavigator, isServer } from "libs/useSSR";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Blind from "./Blind";

const StyledDevMode = styled.div`
    position: relative;
    padding: .5%;
    background: #f73f3f;
    color: #fff;
    font-weight: 600;
    margin: 0 auto;
    .stateBox{
        font-size: 13px;
        .state{
            width: 10px;
            height: 10px;
            display: inline-block;
            border: 1px solid #fff;
            border-radius: 50%;
            background: yellow;
            &.on {
                background: green;
            }
            &.off{
                background: red;
            }  
        }
    }
`;

export default function DevModeView(){
     
    const isDevMode =  String(process.env.NODE_ENV).toLocaleLowerCase() === 'development';
    const [ isOlineState, setIsOlineState ] = useState(isNavigator() ? navigator.onLine : isServer());

    const handleOnline = () => {
        setIsOlineState(true);
    }

    const handleOffine = () => {
        setIsOlineState(false);
    }

    useEffect(() => {
        window.addEventListener('online',handleOnline);
        window.addEventListener('offline',handleOffine);
        return()=>{
            window.removeEventListener('online',handleOnline);
            window.removeEventListener('offline',handleOffine);
        }
    }, []);

    return((isDevMode === true) && (
    <StyledDevMode className="devModeView">
        <div>Development Mode</div>
        <div className="stateBox">네트워크 상태 <span className={`state ${isOlineState?'on':'off'}`}><Blind>{isOlineState?'on':'off'}</Blind></span></div>
    </StyledDevMode>));
}