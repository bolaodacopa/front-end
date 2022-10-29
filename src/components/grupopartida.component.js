import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Partida from "./partida.component";
import BetService from "../services/bet.service";
import EventBus from "../common/EventBus";
import * as Icon from 'react-bootstrap-icons';


class GrupoPartida extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        content: [],
        successful: false,
        matchexist: false,
        loadmatches: false,
        finishedbets: false,
        loading: false
      };
    }

    componentDidMount() {
        BetService.getBetsMatchesByStageGroup(this.props.stage, this.props.group).then(
          response => { 
            const matchexist = (response.data.length > 0);         
            const content = response.data;
            const loadmatches = true;
            var finishedbets = false;

            if(matchexist){
                const firstmatch = response.data[0].match;

                console.log(firstmatch.stage.finishedbets);

                if(firstmatch.stage.finishedbets=='SIM'){
                    finishedbets = true;
                }
            }

            this.setState({
              content: content,
              matchexist: matchexist,
              loadmatches: loadmatches,
              finishedbets: finishedbets
            });
          }
        );  
    }  


    handleBet = (e) => {    
        e.preventDefault();
        var matchcode = '';
        var auxmatchcode = '';
        var listMatch = new Array();
        var aposta = new Object();
        var erro = false;

        if((this.state.finishedbets) || (this.state.successful)){
            return;
        }        

        Array.prototype.forEach.call(e.target.elements, (element) => {
            if(erro)
                return;

            //console.log(element);
            if(element.getAttribute("matchcode")){
                //alert(element.value);
                auxmatchcode = element.getAttribute("matchcode");
                if(auxmatchcode != matchcode){
                    aposta = new Object();
                    matchcode = auxmatchcode;                     
                    aposta.matchcode = matchcode;
                }
                
                if(element.getAttribute("name") == 'hometeamgoals'){
                    if(!(element.value) || !(element.value >= 0)){
                        alert('Informe um placar válido para todas as partidas!');
                        erro = true;
                        return;
                    }

                    aposta.hometeamgoals = element.value;
                }

                if(element.getAttribute("name") == 'awayteamgoals'){
                    if(!(element.value) || !(element.value >= 0)){
                        alert('Informe um placar válido para todas as partidas!');
                        erro = true;
                        return;
                    }

                    aposta.awayteamgoals = element.value;
                    listMatch.push(aposta);
                }
            }
        });

        if(erro == false) {
            this.setState({
                loading: true
            });

            BetService.postBets(listMatch).then(
                response => {          
                    //alert('Aposta realizada');
                    this.setState({
                        successful: true,
                        loading: false
                    });
                }
            );
        }   
    }    

    render() {

        return (            
                <div class="col-sm-6 m-auto">
                    <div class="card">

                    {this.state.matchexist && this.state.loadmatches && (   
                        <div>
                            <div class="card-header text-center">
                                <h3 class="h6 mb-0 text-black">{this.props.name}</h3>
                            </div>



                            <Form
                                onSubmit={this.handleBet}
                                ref={c => {
                                this.form = c;
                                }}
                            >                        
                                {this.state.content.map((item, index) => {            
                                    return <Partida match={item.match} bet={item.bet} result={item.result}  key={index}/>
                                })}

                            {!this.state.successful && !this.state.finishedbets && (        
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block" disabled={this.state.loading}>
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}                                        
                                        <Icon.EmojiSunglassesFill  color="yellow"/> Fazer Aposta
                                    </button>
                                </div>
                            )}

                            {this.state.successful && (        
                                <div className="form-group">
                                <div
                                    className="h6 small alert alert-success text-center"
                                >
                                    <Icon.CheckCircleFill  color="green"/> Aposta realizada!!!
                                </div>
                                </div>
                            )}

                            {this.state.finishedbets && (        
                                <div className="form-group">
                                <div
                                    className="h6 small alert alert-success text-center"
                                >
                                    Apostas finalizadas!!
                                </div>
                                </div>
                            )}                                                    

                            <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                            />                            
                            </Form>
                        </div>
                        )}  
                        {!this.state.matchexist  && this.state.loadmatches && (                      
                            <h3 class="h6 mb-0 text-black">Nenhuma partida encontrada para '{this.props.name}'</h3>
                        )}
                        {!this.state.loadmatches && (                      
                            <h3 class="h6 mb-0 text-black">Carregando partidas...</h3>
                        )}                             
                    </div>      
                </div> 
            );
    }
}            

export default GrupoPartida;