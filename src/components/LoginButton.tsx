import axios from "axios";
import {getJwtToken, saveJwtToken} from "../auth/auth";
import {useNavigate} from "react-router-dom";


const LoginButton = () => {
    return <div className="flex flex-row gap-4">
        <a href='/login'>Login</a>
        <a href='/register'>Register</a>
    </div>
}


export default LoginButton;