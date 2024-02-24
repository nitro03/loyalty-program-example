import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import Logo from "./components/Logo/Logo";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import PointsPage from "./pages/PointsPage/PointsPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/500.css';
import './css/app.css';
import {ALL_USERS_PATH, USER_PATH} from "./utils/paths";

function App() {
    return (
        <div className="App">
            <Container>
                <Col lg={12}>
                    <Row>
                        <header className="App-header">
                            <Logo/>
                        </header>
                    </Row>
                    <Row>
                        <main>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<Home/>}/>
                                    <Route path={ALL_USERS_PATH} element={<PointsPage/>}/>
                                    <Route path={USER_PATH} element={<PointsPage/>}/>
                                </Routes>
                            </BrowserRouter>
                        </main>
                    </Row>
                </Col>
            </Container>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default App;
