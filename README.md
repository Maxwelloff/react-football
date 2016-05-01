# React Football

React Football Web App using football-data.org for the datas. Made by Maxime Leuger (SDWM1).

## Datas

JSON formated datas.
Main URL : http://www.football-data.org/

### SoccerSeason
List all available soccer seasons.	/v1/soccerseasons/
### Team
List all teams for a certain soccerseason.	/v1/soccerseasons/{id}/teams
### LeagueTable
Show League Table / current standing.	/v1/soccerseasons/{id}/leagueTable
### Fixture	(match)
List all fixtures for a certain soccerseason.	/v1/soccerseasons/{id}/fixtures
### Fixture
List fixtures across a set of soccerseasons.	/v1/fixtures/
### Fixture
Show one fixture.	/v1/fixtures/{id}
### Fixture
Show all fixtures for a certain team.	/v1/teams/{id}/fixtures/
### Team
Show one team.	/v1/teams/{id}
### Player
Show all players for a certain team.	/v1/teams/{id}/players

# App Architecture

"Tree" organization :
First of all we have a view of all available sesasons with fake articles to simulate content and avoid big white spaces.
When we click on a season we got all the revelant datas (teams, leaguetable, league fixtures, few infos on each team ...)
When we click on a team we have access to its players, its main infos, all of its season games and result and so on

# Design Ergo

Inspired by the design of eurosport.fr. Always have a left column with revelant results of each page.

# Issues

Search input : the football API I used was not made for queries as seen as in class with the Spotify Player Exercise we made. I didn't have access to an endpoint like this : v1/?q=any_team_or_player. Content display on the Home page and the championship page : too much white spaces at the bottom of the page.

# Ideas & Updates for V2

Make the search input functional, or at least make it functional for teams on the championship page and players on the team page. Group results by matchday : one button per matchday and matchday results would slide down on click. Build a User module allowing to write articles for the home page. Use the Google Image Search API in order to display players pictures. Get the most used color of each team logo and use it to apply a filter on players jerseys (ex: PSG jerseys would render dark blue, OM jerseys would white etc..). Make modals windows or box sliding effects to display players infos, put teams logos nearby teams names each times they are displayed, use another API to get the names of players who scored ...
