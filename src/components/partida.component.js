import React, { useState } from  'react'
import Input from "react-validation/build/input";
import betService from '../services/bet.service';
import * as Icon from 'react-bootstrap-icons';

const divStyle = {
    display: 'flex',
    alignItems: 'center'
};  

function Partida(props) {
    const match = props.match;
    const bet = props.bet; 
    const result = props.result;
    var finishedbets = false;
    var finishedmatch = false;
    var colorresult = 'bg-dark';

    if(match.stage.finishedbets=='SIM'){
      finishedbets = true;
    }

    if(match.finishedmatch=='SIM'){
      finishedmatch = true;
    }

    if(result=='ERROU')
      colorresult = 'bg-danger';
    if(result=='RESULTADO')
      colorresult = 'bg-primary';      
    if(result=='PLACAR')
      colorresult = 'bg-success';

    return (        
    <div class="row bg-white align-items-center ml-0 mr-0 py-2 table-bordered">
        <div class="col-md-4 col-lg-4 mb-4 mb-lg-0">
          <div class="text-center text-lg-left">
            <div class="d-block">
                <div class="image image-small mb-3 mb-lg-0 mr-lg-3">
                  <img src={match.hometeam.flag} alt="Image"></img>
                </div>
                <div class="text">
                  <h6 class="h6 small mb-0 text-black">{match.hometeam.name}</h6>
                </div>
            </div>
          </div>
        </div>
  
        <div class="col-md-4 col-lg-4 text-center mb-4 mb-lg-0">

          <div class="d-inline-block">

      {finishedbets && (
        <div style={divStyle}>
          <div class="d-inline-block">
            <div class=" py-2 px-4 mb-2 text-white d-inline-block bg-dark rounded">
              <span class="h6">
                {finishedmatch && (
                  <span>{match.hometeamgoals}:{match.awayteamgoals}</span>
                )}
                {!finishedmatch && (
                  <span title={match.formatteddate}><Icon.Calendar3  color="white"/></span>
                )}
              </span>
            </div>
          </div>
          &nbsp;
          <div class="d-inline-block">
            <div class={"py-2 px-4 mb-2 d-inline-block text-white rounded " + colorresult}>
              <span class="h6">
                {bet && (
                  <span>{bet.hometeamgoals}:{bet.awayteamgoals}</span>
                )}
                {!bet && (
                  <span title='Aposta n&atilde;o realizada'><Icon.EmojiExpressionlessFill color="white"/></span>
                )}                
              </span>
            </div>
          </div>
        </div>
      )}






{/** 
          <div style={divStyle}>
            <Input
                type="text"
                name="hometeamgoals"
                class="form-control text-center"
                //value={this.state.email}
                //onChange={this.onChangeEmail}
                //validations={[required]}
                //onKeyPress={(e) => handleKeyPress(e)} 
                size="1"
                maxlength="2"                
            />
            :
            <Input
                type="text"
                class="form-control text-center"
                name="awayteamgoals"
                //value={this.state.email}
                //onChange={this.onChangeEmail}
                //validations={[required]}
                //onKeyPress={(e) => handleKeyPress(e)} 
                size="1"
                maxlength="2"                
            />
            </div>
*/}

            {!finishedbets && (
            <div style={divStyle}>
            <input type="hidden" name="matchcode" value={match.matchcode}/>   
            <input
                name="hometeamgoals"
                type="number"
                min="0" 
                max="99"
                maxLength="2"
                size="1"
                onInput={(event)=>event.target.value=event.target.value.slice(0,event.target.maxLength)}                 
                class="text-center"
                matchcode={match.matchcode}
                defaultValue={bet?bet.hometeamgoals:""}
              />               
              :
              <input
                name="awayteamgoals"
                type="number"
                min="0" 
                max="99"
                maxLength="2"
                size="1"
                onInput={(event)=>event.target.value=event.target.value.slice(0,event.target.maxLength)}                 
                class="text-center"
                matchcode={match.matchcode}
                defaultValue={bet?bet.awayteamgoals:""}
              />      
              </div>            
            )}
          </div>              
        </div>

        <div class="col-md-4 col-lg-4">
          <div class=" text-center text-lg-right">
            <div class="d-block">
              <div class="image image-small">
                <img src={match.awayteam.flag} alt="Image"></img>
              </div>              
              <div class="text">
                <h6 class="h6 small mb-0 text-black">{match.awayteam.name}</h6>
              </div>                  
            </div>
          </div>
        </div>
        <div class="dropdown-divider"></div>
      </div>   
    );
  }
  
  export  default  Partida;