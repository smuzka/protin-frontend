import React from "react";

type Props = {
    logoutHandler: (e: React.MouseEvent<HTMLElement>) => void,
}

const LogoutButton = (props: Props) => {
    return <button onClick={props.logoutHandler}>Logout</button>
}


export default LogoutButton;