import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import PostsList from "./pages/PostsList/PostsList";
import PostPage from "./pages/PostPage/PostPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/post/:id/" element={<PostPage />} />
            <Route path="*" replace element={<Navigate to="/" />} />
        </Routes>
    );
};

export default App;
