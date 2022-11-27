import React, { Component } from "react";
import BetService from "../services/bet.service";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';

class BetRanking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            currentUser:'',
            loadranking: false,
            rankingexist: false
        };
    }

    componentDidMount() {
        BetService.getRanking().then(
            response => { 
                const user = AuthService.getCurrentUser();
                const rankingexist = (response.data.length > 0);         
                const content = response.data;

                console.log(response.data);

                this.setState({
                    content: content,
                    currentUser: user,
                    rankingexist: rankingexist,
                    loadranking: true
                });
            }
        )
    }

    render() {
        return (
            <div class="row justify-content-center">
                <div class="col-sm-12">
                    <div class="card">
                            {!this.state.rankingexist && this.state.loadranking && (
                                <div class="card-header text-center">
                                    <h3 class="h6 mb-0 text-black">Ranking não encontrado!!!</h3>
                                </div>
                            )}
                            {!this.state.loadranking &&  (
                                <div class="card-header text-center">
                                    <h3 class="h6 mb-0 text-black">
                                        <span className="spinner-border spinner-border-sm"></span>
                                            Carregando Ranking...
                                    </h3>                                
                                </div>
                            )}
                            {this.state.rankingexist && this.state.loadranking &&  (
                                <div>
                                <div class="card-header text-center">
                                    <h3 class="h6 mb-0 text-black">Ranking</h3>
                                </div>
                                <div class="table-responsive">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th class="text-center">#</th>
                                            <th class="text-center"></th>
                                            <th>Participante</th>
                                            <th class="text-center">Pontos</th>
                                            <th class="text-center">Partidas corretas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.content.map((item, index) => {
                                            var boldtr = "";
                                            if(item.username == this.state.currentUser.username)
                                                boldtr = "bg-info";
                                            return (
                                                <tr class={boldtr}>
                                                    <td class="text-center">{item.myrank}</td>
                                                    <td class="text-center">
                                                        <Link to={"/aposta/"+item.username}>
                                                            <Icon.Search color="blue"/>
                                                        </Link>                                                        
                                                    </td>
                                                    <td>
                                                        {item.name + ' (' + item.username + ')'}
                                                    </td>
                                                    <td class="text-center">{item.total}</td>
                                                    <td class="text-center">{item.correctmatches}</td>    
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

export  default BetRanking;