import React from "react";
import { StyledRulesGame } from "./styles";
import * as Icon from 'react-bootstrap-icons';

export default function RulesGame() {
    const [formVisivel, setFormVisivel] = React.useState(false);
    /*
    ## O que precisamos para o form funcionar?
    - pegar os dados, que precisam vir do state
        - titulo
        - url do vídeo 
    - precisamos ter um onSubmit do nosso form
    - Limpar o formulário após o Submit
    */

    return (
        <StyledRulesGame>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                <Icon.InfoCircleFill color="blue" />
            </button>
            {/* Ternário */}
            {/* Operadores de Curto-circuito */}
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        setFormVisivel(false);
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                <Icon.XLg color="black" />
                            </button>

                            <div  className="divrules">
                                <b>REGRAS</b>
                                <p>
                                    1) Caso o participante queira alterar o seu palpite, 
                                    poderá fazê-lo, sem limite de vezes, 
                                    até às 18:00 horas do dia anterior ao início de cada fase.
                                    Data limite para cada fase abaixo:
                                    <ul>
                                        <li>Fase de Grupos: 19/11/2022 às 18:00;</li>
                                        <li>Oitavas de final: 02/12/2022 às 18:00;</li> 
                                        <li>Quartas de final: 08/12/2022 às 18:00;</li>  
                                        <li>Semifinais: 12/12/2022 às 18:00;</li>  
                                        <li>Fase Final: 16/12/2022 às 18:00;</li>
                                    </ul>
                                </p>

                                <p>
                                    2) Após a data limite para palpites em cada fase, 
                                    serão divulgados os palpites realizados por todos os participantes.
                                </p>

                                <p>
                                    3) Fica estabelecido que os palpites deverão ser dados para o placar final do jogo, 
                                    considerando a prorrogação, se houver. 
                                    Assim, não será considerado o placar de pênaltis.
                                    <br/>Exemplo: Se um jogo terminar em 0x0 até o final da prorrogação, 
                                    e for para os pênaltis, tendo o placar de 5x4, será considerado o placar de 0x0.
                                </p>

                                <p>
                                    4) Fica estabelecido que o participante só está elegível 
                                    a receber pontuação em jogos que tiver palpitado.
                                </p>

                                <p>
                                    5) Os critérios	de pontuação serão os estabelecidos abaixo:
                                        <ul>
                                            <li>Acertar o placar exatado da partida: 5 pontos 
                                                <br/>Exemplo: "C" palpitou Brasil 3 x 0 Argentina e o jogo terminou Brasil 3 x 0 Argentina;</li>
                                            <li>Não acertar o placar, 
                                                mas acertar o resultado da partida: 3 pontos 
                                                <br/>Exemplo: "C" palpitou Brasil 3 x 0 Argentina e o jogo terminou Brasil 1 x 0 Argentina;</li>
                                            <li>Outro tipo de palpite: 0 pontos;</li>
                                            <li>Não palpitar: 0 pontos;</li>
                                        </ul>
                                </p>

                                <p>    
                                    6) Os pontos não são cumulativos em uma mesma partida, 
                                    ou seja, o máximo que um participante poderá pontuar por 
                                    partida são 5 (cinco) pontos.	
                                </p>

                                <p>    
                                    7) Será utilizado como critério de desempate o participante que tiver 
                                    mais acertos em placar exato. 
                                </p>

                                <p>
                                    8) Em caso de persistência de empate entre os participates após o critério do item 6), 
                                    o prêmio referente a respectiva cota será dividida em partes iguais entre eles.
                                </p>

                                <p>
                                    9) A Premiação será feita através da pontuação final de cada participante da seguinte maneira:
                                        <ul>
                                            <li>Cota 1: 50% do prêmio total para participante(s) de maior pontuação final;</li>
                                            <li>Cota 2: 30% do prêmio total para o segundo participante(s) de maior pontuação final;</li>
                                            <li>Cota 3: 20% do prêmio total para o terceiro participante(s) de maior pontuação final;</li>
                                        </ul>
                                </p>
                            </div>

                        </div>
                    </form>
                )
                : false}
        </StyledRulesGame>
    )
}