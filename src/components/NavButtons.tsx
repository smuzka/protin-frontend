import {doesJwtTokenExists} from "../auth/auth";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import React from "react";

type Props = {
    logoutHandler: (e: React.MouseEvent<HTMLElement>) => void,
}

const NavButtons = (props: Props) => {

    return (
        <div>
            {doesJwtTokenExists() ?
                <div className="flex flex-row gap-8">
                    <h4 className="m-0">
                        <a href="/profile" className="no-underline">Profil</a>
                    </h4>
                    <h4 className="m-0">
                        <a href="/random-user" className="no-underline">Szukaj swojej pary</a>
                    </h4>
                    <h4 className="m-0">
                        <a href="/matched-users" className="no-underline">Twoje pary</a>
                    </h4>
                    <h4 className="m-0">
                        <LogoutButton logoutHandler={props.logoutHandler}/>
                    </h4>
                </div>
                :
                <div>
                    <LoginButton/>
                </div>
            }
        </div>
    )
}


export default NavButtons