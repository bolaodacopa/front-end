import React, { useState } from  'react'
import Input from "react-validation/build/input";
import betService from '../services/bet.service';

const divStyle = {
    display: 'flex',
    alignItems: 'center'
};  

function Partida(props) {
    const match = props.match;
    const bet = props.bet; 

    return (        
    <div class="row bg-white align-items-center ml-0 mr-0 py-2">
        <div class="col-md-4 col-lg-4 mb-4 mb-lg-0">
          <div class="text-center text-lg-left">
            <div class="d-block d-lg-flex align-items-center">
              <div class="image image-small text-center mb-3 mb-lg-0 mr-lg-3">
                <img src={match.hometeam.flag} alt="Image"></img>
              </div>
              <div class="text">
                <h6 class="h6 small mb-0 text-black">{match.hometeam.name}</h6>
              </div>
            </div>
          </div>
        </div>
  
        <div class="col-md-4 col-lg-4 text-center mb-4 mb-lg-0">

{/** 
        <div style={divStyle}>
          <div class="d-inline-block">
            <div class=" py-2 px-4 mb-2 text-white d-inline-block bg-dark rounded"><span class="h6">3:2</span></div>
          </div>
          &nbsp;
          <div class="d-inline-block">
            <div class=" py-2 px-4 mb-2 text-white d-inline-block bg-dark rounded"><span class="h6">3:2</span></div>
          </div>
          </div>
*/}
          <div class="d-inline-block">

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
            <div style={divStyle}>
            <input type="hidden" name="matchcode" value={match.matchcode}/>   
            <input
                name="hometeamgoals"
                type="number"
                min="0" 
                max="99"
                maxLength="2"
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
                onInput={(event)=>event.target.value=event.target.value.slice(0,event.target.maxLength)}                 
                class="text-center"
                matchcode={match.matchcode}
                defaultValue={bet?bet.awayteamgoals:""}
              />      
              </div>            

          </div>              
        </div>

        <div class="col-md-4 col-lg-4 text-center text-lg-right">
          <div class="">
            <div class="d-block d-lg-flex align-items-center">
              <div class="text order-1 w-100">
                <h6 class="h6 small mb-0 text-black">{match.awayteam.name}</h6>
              </div>
              <div class="image ml-lg-3 mb-3 mb-lg-0 order-2">
                <img src={match.awayteam.flag} alt="Image"></img>
              </div>                  
            </div>
          </div>
        </div>
      </div>   
    );
  }
  
  export  default  Partida;