import React, { Component } from "react";
import BetService from "../services/bet.service";
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';

class BetApostaPorJogo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            username: '',
            loadbets: false,
            betsexist: false,
            match: [],
            matchcode: this.props.matchcode
        };
        console.log(this.props.matchcode);
    }

    componentDidMount() {

        BetService.getBetsByMatchcode(this.props.matchcode).then(
            response => {
                const betsexist = ((response.data.bets) && (response.data.bets.length > 0));
                const content = response.data;
                const match = response.data.match;

                console.log(response.data.bets.length);

                this.setState({
                    content: content,
                    betsexist: betsexist,
                    loadbets: true,
                    match: match
                });
            }
        )
    }

    render() {
        var match = undefined;
        var bets = undefined;
        var fase = undefined;
        var finishedmatch = undefined;
        if (this.state.content.match) {
            match = this.state.content.match;
            console.log(match.id);


            if (match.stage.name == 'GRUPOS') fase = 'Grupos'
            if (match.stage.name == 'OITAVASFINAL') fase = 'Oitavas de final'
            if (match.stage.name == 'QUARTASFINAL') fase = 'Quartas de final'
            if (match.stage.name == 'SEMIFINAL') fase = 'Semifinais'
            if (match.stage.name == 'TERCEIRO') fase = 'Terceiro lugar'
            if (match.stage.name == 'FINAL') fase = 'Final'

            finishedmatch = (match.finishedmatch == 'SIM');

            bets = this.state.content.bets;
        }
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
                        {this.state.betsexist && this.state.loadbets && match && (
                            <div>
                                <div className="card-header text-center">
                                    <h3 className="h6 mb-0 text-black">
                                        <div>
                                            <span>
                                                <img src={match.hometeam.flag} alt="Image"></img>
                                                <span className="ml-2">{match.hometeam.name}</span>
                                            </span>
                                            <span className="h6 ml-2 mr-2">
                                                {finishedmatch && (
                                                    <span>{match.hometeamgoals}<span className="ml-1 mr-1">x</span>{match.awayteamgoals}</span>
                                                )}
                                                {!finishedmatch && (
                                                    <span title={match.formatteddate}>x</span>
                                                )}
                                            </span>
                                            <span>
                                                {match.awayteam.name} <img src={match.awayteam.flag} alt="Image"></img>
                                            </span>
                                            <span className="ml-2">({fase})</span>
                                        </div>

                                    </h3>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th className="text-center"></th>
                                                <th>Participante</th>
                                                <th className="text-center">Aposta</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {bets && bets.map((item, index) => {
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
                                                            <Link to={"/aposta/" + item.username}>
                                                                <Icon.Search color="blue" />
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            {item.name + ' (' + item.username + ')'}
                                                        </td>
                                                        <td className="text-center">
                                                            <div class={"py-2 px-4 mb-2 d-inline-block text-white rounded " + colorresult}>
                                                                <span className="h6">
                                                                    {((item) && (item.hometeamgoals >= 0)) ? (
                                                                        <span>{item.hometeamgoals}:{item.awayteamgoals}</span>
                                                                    ) : (
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

export default BetApostaPorJogo;