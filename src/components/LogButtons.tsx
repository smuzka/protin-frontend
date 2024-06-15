import {doesJwtTokenExists} from "../auth/auth";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import React from "react";

type Props = {
    logoutHandler: (e: React.MouseEvent<HTMLElement>) => void,
}

const LogButtons = (props: Props) => {

    return <h4 className="m-0">
        { doesJwtTokenExists() ? <LogoutButton logoutHandler={props.logoutHandler}/> : <LoginButton/> }
    </h4>
}


export default LogButtons