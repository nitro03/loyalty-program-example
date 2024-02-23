import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import Logo from "./components/Logo/Logo";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/500.css';
import './css/app.css';

function App() {
    return (
        <div className="App">
            <Container>
                <Col lg={8}>
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
                                    <Route path="/allUsers" element={<UserDetails/>}/>
                                    <Route path="/user/:id" element={<UserDetails/>}/>
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
