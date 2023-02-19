import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const MainPage = lazy(() => import("./MainPage/MainPage"));
const StartPage = lazy(() => import("./StartPage/StartPage"));

export const Routing = () => {
    return (
        <Routes>
            <Route path="/home" element={<MainPage />}/>
            <Route path="/" element={<StartPage />}/>
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
};
