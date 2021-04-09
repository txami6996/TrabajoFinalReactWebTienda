import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import BotonModal from './BtModalProd';
export const ContextoAutenticado = React.createContext({
    autenticado: false,
});
class historialPedidos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DatosUsuario: [],
            productos: [],
            error: false

        }
    }
    componentDidMount() {
        console.log('<HidtorialPedido> se ha montado');
        console.log(this.props.idToken)
        axios.get('https://miprimerproyecto-5055f-default-rtdb.europe-west1.firebasedatabase.app/Pedidos.json?auth=' + this.props.idToken)

            .then(response => {
                let DatosUsuario = [];
                //let productos = [];
                let cont = 0;
                for (let key in response.data) {
                    //console.log(response.data)
                    DatosUsuario.push({
                        ciudad: response.data[key][cont].ciudad,
                        fecha: response.data[key][cont].fecha,
                        pedidos: response.data[key][cont].pedidos,
                        telefono: response.data[key][cont].telefono,
                        usuario: response.data[key][cont].usuario,
                        idb: key
                    });
                }
                this.setState({ DatosUsuario: DatosUsuario });
                //console.log(DatosUsuario)

            }).catch(error => {
                this.setState({ error: true });
            });
    }
    borraArticulo = (id, idb) => {
       // console.log(idb)
        axios.delete('https://miprimerproyecto-5055f-default-rtdb.europe-west1.firebasedatabase.app/Pedidos/' + idb + '.json?auth=' + this.props.idToken)
            .then(response => {
                console.log(response);
            });
        let DatosUsuario = [...this.state.DatosUsuario];
        DatosUsuario.splice(id, 1);
        this.setState({ DatosUsuario: DatosUsuario });
        console.log("borrado")
    }

    render() {
        let listaBaseDatos = null;
        listaBaseDatos = (
            <>
                {this.state.DatosUsuario.map((datos, id) => {
                   // console.log("estoy en table")

                   // console.log(datos)
                    return (

                        <tr key={id}>
                            <td>{datos.fecha}</td>
                            <td>{datos.usuario}</td>
                            <td>{datos.ciudad}</td>
                            <td>{datos.telefono}</td>
                            <td>
                                <BotonModal producto={datos.pedidos} />
                            </td>
                            <td> <Button variant="danger" onClick={() => this.borraArticulo(id, datos.idb)}> X </Button></td>
                        </tr>

                    )
                })}
            </>
        )
        return (
            <>
                <div style={{textAlign:"center"}}><h1>Historial de pedidos</h1></div>
                <ContextoAutenticado.Provider
                    value={{
                        autenticado: this.state.autenticado,
                        otroValor: this.state.otroValor,
                        cambiaLogin: this.cambiaLogin
                    }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Usuario</th>
                                <th>Ciudad</th>
                                <th>Telefono</th>
                                <th>Pedidos</th>
                                <th>Cancelar Compra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaBaseDatos}
                        </tbody>
                    </Table>

                </ContextoAutenticado.Provider>

            </>


        )
    }
}

export default historialPedidos;