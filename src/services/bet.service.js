import API from './api';
import authHeader from './auth-header';

class BetService {

    getMatchesByGroup(group) {
        return API.get('bets/matches?group=' + group, { headers: authHeader() });
    }

    getMatchesByStage(stage) {
        return API.get('bets/matches?stage=' + stage, { headers: authHeader() });
    }
    
    getBetsMatchesByStageGroup(stage, group) {
        const params = {stage: stage, group: group};
        return API.get('bets/matches', { params: params, headers: authHeader() });
    }

    getBetsMatchesByFinishedbetsUsername(username) {
        const params = {username: username};
        return API.get('bets/matches', { params: params, headers: authHeader() });
    }
    
    getBetsByMatchcode(matchcode) {
        return API.get('bets/matches/'+matchcode, { headers: authHeader() });
    }

    postBets(bets) {
        var contentType = {'Content-Type': 'application/json'};
        return API.post("bets", JSON.stringify(bets), { headers: {...authHeader(), ...contentType} });
    }

    getRanking() {
        return API.get('ranking', {headers: authHeader()});
    }    

}

export default new BetService();