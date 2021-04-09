import React from 'react';
import './Header.css';
import logo from '../../Imagenes/Logo2.png'; // gives image path
//import Carrito from '../../Imagenes/Logo3.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

<script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script>


class Header extends React.Component {
    render() {
        return (
            <>
                <Row >
                    <Col>
                        <img className="alturaLogo" src={logo} alt="Logo" />
                    </Col>
                </Row>
            </>


        )
    }
}

export default Header;