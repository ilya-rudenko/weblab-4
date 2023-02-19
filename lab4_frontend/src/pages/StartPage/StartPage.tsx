import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css";
import {Button, Input, Island, Text} from "shared";
import {AppDispatch} from "../../app/store/store";
import {loginAction, registerAction, userType} from "../../app/store/actions/authorizationActions";
import {connect} from "react-redux";
import {login, register} from "../../entities/serverUtils";

// @ts-ignore
const StartPageComponent = (props) => {

    const {stateLogin, authInfo, stateRegister} = props;
    const navigate = useNavigate();

    React.useEffect(() => {
        if (authInfo.authFlag) {
            navigate('/home');
        }
    }, [navigate, authInfo])

    const [loginInput, setLoginInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [isErrorVisible, setErrorVisible] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleRegister = () => {
        register({username: loginInput, password: passwordInput} ).then(response => {

            console.log(response);

            if (response.data.error) {
                setErrorVisible(true);
                setErrorText(response.data.message);
            } else {
               stateRegister({username: loginInput, password: passwordInput});
               navigate('/home');
            }
        });
    }

    const handleLogIn = () => {
        login({username: loginInput, password: passwordInput} ).then(response => {

            console.log(response);

            if (response.data.error) {
                setErrorVisible(true);
                setErrorText(response.data.message);
            } else {
                stateLogin({username: loginInput, password: passwordInput});
                navigate('/home');
            }
        })
    }


    const handleLoginInput = (text: string | number) => {
        if (typeof text != "string") return;

        setLoginInput(text);
    }

    const handlePasswordInput = (text: string | number) => {
        if (typeof text != "string") return;

        setPasswordInput(text);
    }


    return <div className={'StartPage'}>
        <div>
            <Island>
                <Text text={"Welcome to the dungeon!"} />

                <Text text={"Login: "} />
                <Input onChange={handleLoginInput} type={"text"} value={loginInput} />

                <Text text={"Password: "} />
                <Input onChange={handlePasswordInput} type={"text"} value={passwordInput} />

                {isErrorVisible && (<Text text={errorText} isError/>) }

                <Button onClick={handleRegister} text={"Register"} />
                <Button onClick={handleLogIn} text={"Log in"} />
            </Island>
        </div>
    </div>
}

// @ts-ignore
const mapStateToProps = (state) => {
    return {
        authInfo: state.authorization,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        stateLogin: (user: userType) => dispatch(loginAction(user)),
        stateRegister: (user: userType) => dispatch(registerAction(user)),
    }
}

const StartPage = connect(mapStateToProps, mapDispatchToProps)(StartPageComponent);

export default StartPage;