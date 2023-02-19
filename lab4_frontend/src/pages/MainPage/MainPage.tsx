import React from 'react';
import {Button, Table} from 'shared'
import {MainControls} from "features";
import "./MainPage.css";
import {AppDispatch} from "app/store/store";
import {
    clearEntriesAction,
    entryServerType,
    setEntriesAction
} from "app/store/actions/entriesActions";
import {connect} from "react-redux";
import {logoutAction} from "app/store/actions/authorizationActions";
import {getEntries} from "../../entities/serverUtils";
import {useNavigate} from "react-router-dom";
import {Header} from "widgets";


// @ts-ignore
const MainPageComponent = (props) => {

    const navigate = useNavigate();

    const {authInfo, entries, stateLogout, setStateEntries, clearStateEntries } = props;


    React.useEffect(() => {

        if (!authInfo.authFlag) {
            navigate('/');
        }

        getEntries({ username: authInfo.username, password: authInfo.password})
            .then(response => {
                if (response.data.error) {
                    console.log(response.data.message);
                }
                else {
                    setStateEntries(response.data.entries);
                }
            }).catch(() => {
            })

    }, [authInfo, navigate, setStateEntries]);


    const handleLogout = () => {
        stateLogout();
        clearStateEntries();
        navigate('/');
    }

    return (
        <div>

            <div className={'MainPage'}>
                <div>
                    <Header username={authInfo.username} />
                    <Button onClick={handleLogout} text={"Log Out"}/>
                    <MainControls />
                    <Table dots={entries} />
                </div>
            </div>
        </div>
    );
}

// @ts-ignore
const mapStateToProps = (state) => {
    return {
        entries: state.entries.entries,
        authInfo: state.authorization,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        setStateEntries: (entries: entryServerType[]) => dispatch(setEntriesAction(entries)),
        stateLogout: () => dispatch(logoutAction()),
        clearStateEntries: () => dispatch(clearEntriesAction()),
    }
}

const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageComponent);


export default MainPage;
