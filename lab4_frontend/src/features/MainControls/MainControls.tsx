import React, {useState} from 'react';
import "./MainControls.css";
import {Button, Input, Island, RadioButtons, useWindowDimensions, Text, HStack} from "shared";
import {Graph} from "../../entities";
import { connect } from "react-redux"
import {
    addEntryAction,
    clearEntriesAction,
    entryServerType,
} from "app/store/actions/entriesActions";
import {AppDispatch} from "app/store/store";
import {addEntry, deleteEntries} from "entities/serverUtils";
import {useNavigate} from "react-router-dom";
import {logoutAction} from "../../app/store/actions/authorizationActions";


// @ts-ignore
const MainControlsComponent = (props) => {
    const {authInfo, entries, addStateEntry, stateLogout, clearStateEntries} = props;

    const {width} = useWindowDimensions();
    const navigate = useNavigate();



    const [r, setR] = useState(3);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const handleEntrySubmit = (coordinates: {x: number, y: number}) => {
        addEntry({x: coordinates.x, y: coordinates.y, r, username: authInfo.username, password: authInfo.password}).then(response =>
            {
                if (response.data.error) {
                    stateLogout();
                    navigate('/');
                }

                addStateEntry(response.data.entry);
            }
        ).catch(() => {
            stateLogout();
            navigate('/');
        })
    }

    const handleSubmitClick = () => {
        handleEntrySubmit({x: x, y: y});
    }

    const handleClear = () => {
        setR(3);
        setX(0);
        setY(0);

        deleteEntries({username: authInfo.username, password: authInfo.password}).then(response =>
            {
                console.log(response);

                if (response.data.error) {
                    stateLogout();
                    navigate('/');
                }

                clearStateEntries();
            }
        ).catch(() => {
            stateLogout();
            navigate('/');
        })
    }

    const handleRChange = (value: string) => {
        setR(Number(value) <1 ? 1 : Number(value));
    }

    const handleXChange = (value: string) => {
        setX(Number(value));
    }

    const handleYChange = (value: string | number) => {
        setY(Number(value));
    }


    const MobilePage = () => {
        return (
            <div className={'controls'}>
                <Graph r={r} entries={entries} onClick={handleEntrySubmit} />
                <Island>
                    <Text text={'Радиус'} />
                    <RadioButtons id={'radius'} defaultChecked={String(r)} onChange={handleRChange} items={["-3","-2","-1","0","1","2","3","4","5"]} />
                    <Text text={'Координата X'}/>
                    <RadioButtons id={'x_coordinate'} defaultChecked={String(x)} onChange={handleXChange} items={["-3","-2","-1","0","1","2","3","4","5"]} />
                    <Text text={'Координата Y'}/>
                    <Input onChange={handleYChange} type={"number"} bounds={{min: -3, max: 5}} value={y} />
                    <Button onClick={handleSubmitClick} text={"Отправить"} />
                    <Button onClick={handleClear} text={"Очистить"} />
                </Island>
            </div>
        );
    }

    const TabletPage = () => {
        return (
            <div className={'controls'}>
                <Graph r={r} entries={entries} onClick={handleEntrySubmit} />
                <Island>
                    <Text text={'Радиус'} />
                    <RadioButtons id={'radius'} defaultChecked={String(r)} onChange={handleRChange} items={["-3","-2","-1","0","1","2","3","4","5"]} />
                    <Text text={'Координата X'}/>
                    <RadioButtons id={'x_coordinate'} defaultChecked={String(x)} onChange={handleXChange} items={["-3","-2","-1","0","1","2","3","4","5"]} />
                    <Text text={'Координата Y'}/>
                    <Input onChange={handleYChange} type={"number"} bounds={{min: -3, max: 5}} value={y} />
                    <HStack>
                        <Button onClick={handleSubmitClick} text={"Отправить"} />
                        <Button onClick={handleClear} text={"Очистить"} />
                    </HStack>
                </Island>
            </div>
        );
    }

    const PCPage = () => {
        return (
            <div className={'controls'}>
                <HStack>

                    <Island>
                        <Text text={'Радиус'} />
                        <RadioButtons id={'radius'} defaultChecked={String(r)} onChange={handleRChange} items={["-3","-2","-1","0","1","2","3","4","5"]} />
                        <Text text={'Координата X'}/>
                        <RadioButtons id={'x_coordinate'} defaultChecked={String(x)} onChange={handleXChange} items={["-3","-2","-1","0","1","2","3","4","5"]} />
                        <Text text={'Координата Y'}/>
                        <Input onChange={handleYChange} type={"number"} bounds={{min: -3, max: 5}} value={y} />
                        <HStack>
                            <Button onClick={handleSubmitClick} text={"Отправить"} />
                            <Button onClick={handleClear} text={"Очистить"} />
                        </HStack>
                    </Island>
                    <Graph r={r} entries={entries} onClick={handleEntrySubmit} />
                </HStack>
            </div>
        );
    }

    return (
        <div>
            {width >= 1074 ? <PCPage /> : width < 713 ? <MobilePage /> : <TabletPage />}
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
        addStateEntry: (entry: entryServerType) => dispatch(addEntryAction(entry)),
        clearStateEntries: () => dispatch(clearEntriesAction()),
        stateLogout: () => dispatch(logoutAction()),
    }
}

export const MainControls =  connect(mapStateToProps, mapDispatchToProps)(MainControlsComponent);



