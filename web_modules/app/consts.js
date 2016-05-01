//const apiPath = `https://api.spotify.com/v1/`;
const apiPath = `http://api.football-data.org/v1/`;
//const apiExplorerPath = `https://artistexplorer.spotify.com/`;

export default {
  api:{
    enpoints:{

    getChampionships:()=>{
        return apiPath+`soccerseasons/`
    },
    getTeams:(idChampionship)=>{
        return apiPath+`soccerseasons/${idChampionship}/teams`
    },
    getCurrentGames:()=>{
        return apiPath+`fixtures`
    },
    getTeam:(idTeam)=>{
        return apiPath+`teams/${idTeam}`
    },
    getChampionship:(idSoccerSeason)=>{
        return apiPath+`soccerseasons/${idSoccerSeason}`
    },
    getTable:(idSoccerSeason)=>{
        return apiPath+`soccerseasons/${idSoccerSeason}/leagueTable`
    },
    getPlayers:(idTeam)=>{
        return apiPath+`teams/${idTeam}/players`
    },
    getFixtures:(idSoccerSeason)=>{
        return apiPath+`soccerseasons/${idSoccerSeason}/fixtures`
    },
    getTeamFixtures:(idTeam)=>{
        return apiPath+`teams/${idTeam}/fixtures`
    }
    }
  }
}
