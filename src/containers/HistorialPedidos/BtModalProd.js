import React from 'react';
import { Modal, Button } from "react-bootstrap";

class BtModalProd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    cambia = () => {
        let lol = this.props.producto
        console.log(lol)
    }
    render() {
        let listaProd = null;
        listaProd = (
            <>
                {this.props.producto.map((producto, id) => {
                    return (
                        <div style={{ marginTop: "5px", marginLeft: "5px" }} key={id}>
                           Producto: {producto.nombre}  Precio : {producto.precio} € Unidades : {producto.unidades} Total: {producto.precioTotal} €
                        </div>
                    )
                })}
            </>
        )
        return (
            <>
                <Button variant="primary" onClick={this.openModal}>
                    Pedidos
                 </Button>

                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Articulos comprados {this.cambia()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul  >
                            <li> {listaProd}</li>

                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal} >
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>


        )
    }
}

export default BtModalProd;