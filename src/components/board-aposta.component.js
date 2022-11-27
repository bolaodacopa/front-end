import React, { Component } from "react";
import BetService from "../services/bet.service";
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';

class BetAposta extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            username: '',
            loadbets: false,
            betsexist: false
        };
        console.log(this.props.username);
    }

    componentDidMount() {

        BetService.getBetsMatchesByFinishedbetsUsername(this.props.username).then(
            response => {
                const betsexist = (response.data.length > 0);
                const content = response.data;

                console.log(response.data);

                this.setState({
                    content: content,
                    betsexist: betsexist,
                    loadbets: true,
                    username: this.props.username
                });
            }
        )
    }

    render() {
        const username = this.state.username;
        return (
            <div class="row justify-content-center">
                <div class="col-sm-12">
                    <div class="card">
                        {!this.state.betsexist && this.state.loadbets && (
                            <div class="card-header text-center">
                                <h3 class="h6 mb-0 text-black">Apostas não encontradas!!!</h3>
                            </div>
                        )}
                        {!this.state.loadbets && (
                            <div class="card-header text-center">
                                <h3 class="h6 mb-0 text-black">
                                    <span className="spinner-border spinner-border-sm"></span>
                                    Carregando Apostas...
                                </h3>
                            </div>
                        )}
                        {this.state.betsexist && this.state.loadbets && (
                            <div>
                                <div class="card-header text-center">
                                    <h3 class="h6 mb-0 text-black">Apostas {username}</h3>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th class="text-center"></th>
                                                <th class="text-center">Partida</th>
                                                <th class="text-center">Fase</th>
                                                <th class="text-center">Resultado</th>
                                                <th class="text-center">Aposta</th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            {this.state.content.map((item, index) => {
                                                var fase = "";
                                                if (item.match.stage.name == 'GRUPOS') fase = 'Grupos'
                                                if (item.match.stage.name == 'OITAVASFINAL') fase = 'Oitavas de final'
                                                if (item.match.stage.name == 'QUARTASFINAL') fase = 'Quartas de final'
                                                if (item.match.stage.name == 'SEMIFINAL') fase = 'Semifinais'
                                                if (item.match.stage.name == 'TERCEIRO') fase = 'Terceiro lugar'
                                                if (item.match.stage.name == 'FINAL') fase = 'Final'

                                                const finishedmatch = (item.match.finishedmatch == 'SIM');

                                                var colorresult = 'bg-dark';
                                                if (item.result == 'ERROU')
                                                    colorresult = 'bg-danger';
                                                if (item.result == 'RESULTADO')
                                                    colorresult = 'bg-primary';
                                                if (item.result == 'PLACAR')
                                                    colorresult = 'bg-success';

                                                return (
                                                    <tr>
                                                        <td className="text-center">
                                                            <Link to={"/apostaporjogo/" + item.match.matchcode}>
                                                                <Icon.Search color="blue" />
                                                            </Link>
                                                        </td>
                                                        <td className="text-center">
                                                            <img src={item.match.hometeam.flag} alt="Image"></img> {item.match.hometeam.name} x {item.match.awayteam.name} <img src={item.match.awayteam.flag} alt="Image"></img>
                                                        </td>
                                                        <td className="text-center">{fase}</td>
                                                        <td class="text-center">
                                                            <div class=" py-2 px-4 mb-2 text-white d-inline-block bg-dark rounded">
                                                                <span class="h6">
                                                                    {finishedmatch && (
                                                                        <span>{item.match.hometeamgoals}:{item.match.awayteamgoals}</span>
                                                                    )}
                                                                    {!finishedmatch && (
                                                                        <span title={item.match.formatteddate}><Icon.Calendar3 color="white" /></span>
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td class="text-center">
                                                            <div class={"py-2 px-4 mb-2 d-inline-block text-white rounded " + colorresult}>
                                                                <span class="h6">
                                                                    {item.bet && (
                                                                        <span>{item.bet.hometeamgoals}:{item.bet.awayteamgoals}</span>
                                                                    )}
                                                                    {!item.bet && (
                                                                        <span title='Aposta n&atilde;o realizada'><Icon.EmojiExpressionlessFill color="white" /></span>
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}



                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default BetAposta;