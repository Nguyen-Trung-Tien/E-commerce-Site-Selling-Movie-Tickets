import React, { useEffect, useState, useContext } from 'react';
import { loginApi } from '../service/userService';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {

    const navigate = useNavigate();

    const { loginContext } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const [loadingDataAPI, setLoadingDataAPI] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            loginContext(email);
            navigate("/");
        }
    }, [])
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Invalid email or password!");
            return;
        }
        setLoadingDataAPI(true);
        let res = await loginApi(email, password);
        if (res && res.token) {
            localStorage.setItem("token", res.token);
            loginContext(email);
            navigate("/");
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        }
        setLoadingDataAPI(false);
    }


    const handleGoBack = () => {
        navigate("/");
    }
    return (
        <div className="login-container col-12 col-sm-4" >
            <div className="title">Login</div>
            <div className="text"> Email or Usersname  (eve.holt@reqres.in) </div>
            <input

                type="text"
                placeholder="Email or Username..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <div className='input-2'>
                <input
                    type={isShowPassword === true ? "text" : "password"}
                    placeholder="Password..."
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>

            <button
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >
                {loadingDataAPI === true ? <i className="fa-solid fa-sync fa-spin"></i> : ""}
                &nbsp;Login
            </button>
            <div className="back">
                <i className="fa-solid fa-chevron-left"></i>
                <span onClick={() => handleGoBack("/")}> &nbsp; Go back</span>
            </div>
        </div >
    );
}

export default Login