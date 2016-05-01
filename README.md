# React Football

React Football Web App using football-data.org for the datas. Made by Maxime Leuger (SDWM1).

## Endpoints List of the service

Main URL : http://www.football-data.org/

SoccerSeason	List all available soccer seasons.	/v1/soccerseasons/
Team	List all teams for a certain soccerseason.	/v1/soccerseasons/{id}/teams
LeagueTable	Show League Table / current standing.	/v1/soccerseasons/{id}/leagueTable
Fixture	List all fixtures for a certain soccerseason.	/v1/soccerseasons/{id}/fixtures
Fixture	List fixtures across a set of soccerseasons.	/v1/fixtures/
Fixture	Show one fixture.	/v1/fixtures/{id}
Fixture	Show all fixtures for a certain team.	/v1/teams/{id}/fixtures/
Team	Show one team.	/v1/teams/{id}
Player	Show all players for a certain team.	/v1/teams/{id}/players

# App Architecture

Tree organization :
First of all we have a view of all available sesasons
When we click on a season we got all the revelant datas (teams, leaguetable, few infos on each team ...)
When we click on a team we have access to its players, its main infos, all of its season games and result and so on

# Design Ergo

Material design approach
