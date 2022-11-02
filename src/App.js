import React, { Component } from "react";
import * as Icon from 'react-bootstrap-icons';
import { Routes, Route, Link, useParams } from "react-router-dom";
import 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import BetGrupo from "./components/board-grupo.component";
import BetOitava from "./components/board-oitava.component";
import BetQuarta from "./components/board-quarta.component";
import BetSemi from "./components/board-semi.component";
import BetFinal from "./components/board-final.component";
import BetRanking from "./components/board-ranking.component";
import BetAposta from "./components/board-aposta.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }



  
  render() {
    const ApostaComponentWrapper = () => {
      const { username } = useParams();
      return <BetAposta username={username} />;
    };

    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div className="backgroundimage">
        <nav className="navbar navbar-expand navbar-dark bg-dark">

        {currentUser && (
            <div className="d-lg-none">
              <div className="navbar-nav ml-auto ">
                <li className="nav-item">
                  <div className="dropdown">
                    <button 
                        className="btn btn-secondary mr-1" 
                        type="button" 
                        id="dropdownMenuButton" 
                        data-toggle="dropdown" 
                        aria-haspopup="true">
                      <span class="navbar-toggler-icon"></span>
                    </button>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link to={"/grupo"} className="dropdown-item">
                          Grupos
                        </Link>				  
                        <Link to={"/oitava"} className="dropdown-item">
                          Oitavas de final
                        </Link>
                        <Link to={"/quarta"} className="dropdown-item">
                          Quartas de final
                        </Link>
                        <Link to={"/semi"} className="dropdown-item">
                          Semifinais
                        </Link>
                        <Link to={"/final"} className="dropdown-item">
                          Final
                        </Link>
                        <Link to={"/ranking"} className="dropdown-item">
                          Ranking
                        </Link>
                        <div class="dropdown-divider"></div>
                        <Link to={"/home"} className="dropdown-item">
                          {currentUser.username}
                        </Link>
                        <a href="/login" className="dropdown-item" onClick={this.logOut}>
                          LogOut
                        </a>
                    </div>
                  </div>
                </li>
              </div>
            </div>
        )}


          <Link to={"/"} className="navbar-brand">
            BOLAODACOPA.TK
          </Link>

          {currentUser && (
            <div>
            <div className="d-none d-lg-block">
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/grupo"} className="nav-link">
                    Grupos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/oitava"} className="nav-link">
                    Oitavas de final
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/quarta"} className="nav-link">
                    Quartas de final
                  </Link>
                </li> 
                <li className="nav-item">
                  <Link to={"/semi"} className="nav-link">
                    Semifinais
                  </Link>
                </li> 
                <li className="nav-item">
                  <Link to={"/final"} className="nav-link">
                    Final
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/ranking"} className="nav-link">
                    <Icon.TrophyFill  color="yellow"/> Ranking
                  </Link>
                </li>                                                              
              </div>
            </div>
            </div>
          )}

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <div className="d-none d-lg-flex">
                <li className="nav-item">
                  {/*<Link to={"/profile"} className="nav-link">*/}
                  <Link to={"/home"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/grupo" element={<BetGrupo />} />  
            <Route path="/oitava" element={<BetOitava />} />
            <Route path="/quarta" element={<BetQuarta />} /> 
            <Route path="/semi" element={<BetSemi />} />                        
            <Route path="/final" element={<BetFinal />} /> 
            <Route path="/ranking" element={<BetRanking />} />  
            <Route path="/aposta/:username" element={<ApostaComponentWrapper />} />                        
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
