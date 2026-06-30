import React, { Component } from "react";
import GrupoPartida from "./grupopartida.component";

function BetOitava()  {
    return (    
        <div>
          <div class="row">
            <GrupoPartida name="Jogo 01 (Oitavas)" stage="8JOGO01"/>
            <GrupoPartida name="Jogo 02 (Oitavas)" stage="8JOGO02"/>
          </div>
          <div class="row">
            <GrupoPartida name="Jogo 03 (Oitavas)" stage="8JOGO03"/>
            <GrupoPartida name="Jogo 04 (Oitavas)" stage="8JOGO04"/>
          </div>
          <div class="row">
            <GrupoPartida name="Jogo 05 (Oitavas)" stage="8JOGO05"/>
            <GrupoPartida name="Jogo 06 (Oitavas)" stage="8JOGO06"/>
          </div>
          <div class="row">
            <GrupoPartida name="Jogo 07 (Oitavas)" stage="8JOGO07"/>
            <GrupoPartida name="Jogo 08 (Oitavas)" stage="8JOGO08"/>
          </div>
        </div>
    );
}

export  default  BetOitava;
