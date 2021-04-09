import React from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Modal, Button } from "react-bootstrap";
import './Tienda.css';
import BotonModal from './BotonModal';
import deco1 from '../../Imagenes/unoTienda.jpg'; // gives image path
import deco2 from '../../Imagenes/dosTienda.jpg'; // gives image path
//Eliminar este js al final del proyecto, no le voy a dar uso
//import BotonModal from './BotonModal'

class Tienda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      cantidades: [],
      historialPedidos: [],
      Total: 0,
      // compraActual:[],
      isOpen: false,
      error: false,
      compraRealizada: false
    }
  }

  componentDidMount() {
    console.log('<Workers> se ha montado');
    axios.get('https://miprimerproyecto-5055f-default-rtdb.europe-west1.firebasedatabase.app/Productos.json')

      .then(response => {
        let productos = [];
        let cantidades = [];
        for (let key in response.data) {
          productos.push({
            nombre: response.data[key].Nombre,
            precio: response.data[key].Precio,
            ruta: response.data[key].Ruta,
            idb: key
          });
          cantidades.push(
            1
          );
        }
        this.setState({ productos: productos, cantidades: cantidades });
        console.log(cantidades)
      }).catch(error => {
        this.setState({ error: true });
      });
  }
  //no funciona este reset
  resetEstado() {
    
    //let historialPedidosAux=[...this.state.historialPedidos]
    //personas[id].nombre = 'Borrado';

    //console.log(historialPedidosAux)
  }
  componentWillUnmount() {
    console.log('<App> se va a desmontar');
  }
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => {
    
    if(this.state.compraRealizada===true){
      console.log("pppppp")
      this.setState({historialPedidos:[],Total:0});
    }
    this.setState({ isOpen: false,compraRealizada:false});

  }
  incrementaBoton = (id) => {
    let valorNuevo = [...this.state.cantidades];
    valorNuevo[id] = this.state.cantidades[id] + 1;
    this.setState({ cantidades: valorNuevo });
  }
  decrementaBoton = (id) => {
    let valorNuevo = [...this.state.cantidades];
    valorNuevo[id] = this.state.cantidades[id] - 1;
    if (valorNuevo[id] <= 0) {
      valorNuevo[id] = 0;
    }
    this.setState({ cantidades: valorNuevo });
  }
  borraArticulo = (id) => {
    let pedidos = [...this.state.historialPedidos];
    let precioUpdate = this.state.Total - this.state.historialPedidos[id].precioTotal;
    pedidos.splice(id, 1);
    //personas[id].nombre = 'Borrado';
    this.setState({ historialPedidos: pedidos, Total: precioUpdate });
  }

  infoCarritoCompra = (idb, nombre, precio, id) => {
    this.openModal();
    let historialPedidos = [...this.state.historialPedidos];
    let precioTotal = this.state.cantidades[id] * precio;
    let totalaux = this.state.Total;
    totalaux = totalaux + precioTotal;
   // console.log(totalaux)

    historialPedidos.push({
      identificador: idb,
      nombre: nombre,
      precio: precio,
      unidades: this.state.cantidades[id],
      precioTotal: precioTotal
    })

    let aux = [...this.state.cantidades];
    aux[id] = 1;
    this.setState({ historialPedidos: historialPedidos, cantidades: aux, Total: totalaux });

    //console.log(historialPedidos)
  }
  cambia = (event) => {
    console.log("eyy")
  }
  handleCallback = (childData) => {
    this.setState({ compraRealizada: childData })
    console.log(childData)
  }
  render() {

    let listaProductos = null;
    let texto = null;
    let texto2 = null;
    let texto3=null;
    if (this.state.historialPedidos.length >= 1) {
      texto = (<BotonModal carrito={this.state.historialPedidos} totalpagar={this.state.Total} parentCallback={this.handleCallback} />)
      // this.cambiaEstado('texto demasiado corto')
      //this.state.mivalor=this.state.posiblesEstados[0].name;
    }
    if (this.state.compraRealizada === true && this.state.historialPedidos.length >= 1) {
      texto2 = (<div>&#10004; Compra realizada con exito</div>)
      texto3=(<div>
        <Modal show={this.state.compraRealizada} onHide={this.closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title> &#10004;Compra Finalizada</Modal.Title>
                </Modal.Header>
                <Modal.Body> Gracias por depositar su confianza </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.closeModal} >
                    Realizar un nuevo pedido
                 </Button>
                </Modal.Footer>
              </Modal>
      </div>)
    }
    let listacarrito = null;
    listacarrito = (
      <div>
        {this.state.historialPedidos.map((pedido, id) => {
          return (<div style={{ marginTop: "5px", marginLeft: "5px" }} key={id}>
            {pedido.unidades} x {pedido.nombre} - {pedido.precio}€ = {pedido.precioTotal}€

            <Button variant="danger" onClick={() => this.borraArticulo(id)}> X </Button>

          </div>
          )
        })}
      </div>
    )

    listaProductos = (
      <Row>

        {this.state.productos.map((elemento, id) => {
          return (<Col style={{ textAlign: 'center' }} key={id}><img style={{ width: "200px%", height: "200px" }} src={elemento.ruta} alt="Producto" />
            <div style={{ textAlign: 'center' }} >
              <div style={{ textAlign: 'center' }} >

                {elemento.precio} €
              </div>
              <button onClick={() => this.decrementaBoton(id)}  >-</button>
              <input type='number' value={this.state.cantidades[id]}
                onChange={(event) => this.cambia(event)} className="estiloInputTienda"></input>
              <button onClick={() => this.incrementaBoton(id)}>+</button>
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <button onClick={() => this.infoCarritoCompra(elemento.idb, elemento.nombre, elemento.precio, id)} >add</button>
              <Modal show={this.state.isOpen} onHide={this.resetEstado}>
                <Modal.Header closeButton>
                  <Modal.Title>Pedido añadido correctamete al carrito</Modal.Title>
                </Modal.Header>
                <Modal.Body> Gracias por depositar su confianza </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.closeModal} >
                    Continuar
                 </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Col>
          )
        })}

      </Row>

    )

    return (
      <>
        <Row style={{ backgroundColor: "black", color: "white" }} >
          <Col style={{ marginBottom: "10px", }}>
            <img src={deco1} alt="Logo" />
          </Col>
          <Col>
            <h4>Adentrate en los mas profundo de nuestro reino</h4>
              Disfruta de nuestras maravillosas ofertas
          </Col>
        </Row>
        <Row style={{ backgroundColor: "black", color: "white" }} >
          <Col style={{ marginBottom: "10px", }}>
            <h4>Arte de videojuego</h4>
              Hazte con uno de los posters exclusivos realizado por nuestros mejores artistas
          </Col>
          <Col>
            <img src={deco2} alt="Logo" />
          </Col>
        </Row>
        <Row >
          <h1>¡Productos en ofertas!</h1>

        </Row>
        <Row style={{ paddingTop: "10px" }}>
          <main style={{ width: "80%" }}>{listaProductos}</main>
          <aside style={{ width: "20%" }} >
            <h2>Carrito</h2>
            <ul className="ulCarrito" >
              <li> {listacarrito}</li>

            </ul>
            Total: {this.state.Total} €
            <div>
              {texto}
              {texto2}
              {texto3}
            </div>

          </aside>
        </Row>
        <div style={{ textAlign: 'center' }}>

        </div>
      </ >
    )
  }
};

export default Tienda;