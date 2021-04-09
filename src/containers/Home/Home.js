import React from 'react';
import Carrusel1 from '../../Imagenes/Hollow2.jpg';
import './Home.css';
import Tienda from '../../components/Tienda/Tienda';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
class Home extends React.Component {
    render() {

        return (
            <>
                
                <Row style={{paddingTop:"10px",paddingBottom:"10px",backgroundColor:"black"}}>
                    <Col style={{textAlign:'center'}}>
                        <img src={Carrusel1} style={{width:'100%'}} alt="Portada Home"/>
                        <div className="texto-encima"><h2>Bienvenido a casa, adentrate en la aventura</h2></div>
                    </Col>
                </Row>
                <div style={{ backgroundColor: "white" }}>
                    <Tienda />
                </div>
            </>
        )
    }
}

export default Home;