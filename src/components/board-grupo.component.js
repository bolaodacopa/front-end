import React, { Component } from "react";
import GrupoPartida from "./grupopartida.component";

function BetGrupo()  {
    return (  
      <div>
        <div class="row">
          <GrupoPartida name="Grupo A" group="A" stage="GRUPOS"/>
          <GrupoPartida name="Grupo B" group="B" stage="GRUPOS"/>
        </div>
        <div class="row">
          <GrupoPartida name="Grupo C" group="C" stage="GRUPOS"/>
          <GrupoPartida name="Grupo D" group="D" stage="GRUPOS"/>
        </div>      
        <div class="row">
          <GrupoPartida name="Grupo E" group="E" stage="GRUPOS"/>
          <GrupoPartida name="Grupo F" group="F" stage="GRUPOS"/>
        </div>
        <div class="row">
          <GrupoPartida name="Grupo G" group="G" stage="GRUPOS"/>
          <GrupoPartida name="Grupo H" group="H" stage="GRUPOS"/>
        </div>
      </div>
    );
}

export  default  BetGrupo;