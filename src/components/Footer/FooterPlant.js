
import React from 'react';
import './FooterPlant.css';

class FooterPlant extends React.Component {
    render() {
        return (
            <>

                <div className="footer">
                    <table>
                        <thead>
                            <tr>
                                <th>Magic Art</th>
                                <th>Productos</th>
                                <th>Contactanos</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                Welcome
                            </td>
                            <td>Camisetas</td>
                            <td>micasa@hotmail.com</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Pegatinas</td>
                            <td>C/Federico 62</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
                <div className="copyR">
                    <p>Copyright &copy; 2021 El baul del artista.</p>

                </div>

            </>


        )
    }
}

export default FooterPlant;