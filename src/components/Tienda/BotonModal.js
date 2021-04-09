import React from 'react';
import './BotonModal.css';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
class BotonModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            usuario: null,
            ciudad: null,
            telefono: null,
            datos: [],
            compraRealizada: false

        }
    }
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    getValorUsuario = (event) => {
        //console.log("sss")
        //console.log(this.props.carrito)
        this.setState(
            {
                usuario: event.target.value
            })
    }
    getValorTelephone = (event) => {

        this.setState(
            {
                telefono: event.target.value
            })
    }
    getCiudad = (event) => {
        //console.log("sss")

        this.setState(
            {
                ciudad: event.target.value
            })
    }
    creaEnvia = () => {
        var hoy = new Date();
        var fecha = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        var FechaYHora = fecha + ' ' + hora;
        //console.log(fecha)
        let aux = [...this.state.datos]
        let aux2 = [...this.props.carrito]
        aux.push({
            fecha: FechaYHora,
            usuario: this.state.usuario,
            ciudad: this.state.ciudad,
            telefono: this.state.telefono,
            pedidos: aux2
        })

        if (this.state.usuario === null || this.state.ciudad === null || this.state.telefono === null) {
            console.log("vacio")
            return alert("Rellene todos los campos por favor")
        }
        this.setState({ datos: aux })

        axios.post('https://miprimerproyecto-5055f-default-rtdb.europe-west1.firebasedatabase.app/Pedidos.json', aux)
            .then(response => {
                //alert('Persona grabada');
                this.setState({ grabado: true });
            });

        this.props.parentCallback(true);

        this.setState({ datos: "" })
        //this.props.compraDone();
        this.closeModal();
    }
    render() {
        let listacarrito = null;
        listacarrito = (
            <div style={{backgroundColor:"#89F67D"}}>
                {this.props.carrito.map((pedido, id) => {
                    return (<div style={{ marginTop: "5px", marginLeft: "5px" }} key={id}>
                        {pedido.unidades} x {pedido.nombre} - {pedido.precio}€ = {pedido.precioTotal}€
                    </div>
                    )
                })}
            </div>
        )
        return (
            <>
                <Button variant="primary" onClick={this.openModal}>
                    Realizar pedido
                 </Button>

                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registre su compra</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="container">
                                <h1>Su pedido:</h1>
                                {listacarrito}
                                
                                <h2 >Total: {this.props.totalpagar} €</h2>
                                <label ><b>Email</b></label>
                                <input type="text" onChange={this.getValorUsuario} placeholder="Enter Email" required></input>
                                <label ><b>Telefono</b></label>
                                <input type="text" onChange={this.getValorTelephone} placeholder="telefono" required></input>
                                <label ><b>Ciudad</b></label>
                                <input type="text" onChange={this.getCiudad} placeholder="Ciudad" required></input>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal} >
                            Close
                        </Button>
                        <Button onClick={this.creaEnvia}>Confirmar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
export default BotonModal;