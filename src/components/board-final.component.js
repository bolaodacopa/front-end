import React, { Component } from "react";
import GrupoPartida from "./grupopartida.component";

function BetFinal()  {
    return (
        <div>     
        <div class="row justify-content-center">
            <GrupoPartida name="Final" stage="FINAL"/>
        </div>
        <div class="row justify-content-center">
            <GrupoPartida name="Terceiro Lugar" stage="TERCEIRO"/>
        </div>        
        </div>
    );
}

export  default  BetFinal;