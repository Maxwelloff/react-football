import React, { Component, PropTypes } from 'react';
import fetchJSON from "app/fetchJSON";
import consts from "app/consts";
import InputList from "InputList";
import {Link, IndexLink} from 'react-router';
import styles from "./index.css"

export default class PageHome extends Component {

  state = {
    championships: null,
    response:null,
    fixtures:null
  };

  fetchChampionships(){
    fetchJSON(consts.api.enpoints.getChampionships()).then((response) => {
        if(!response.error){
            $.each(response,function(index){
                switch(response[index].id){
                    case 394:
                        response[index].bckgImg = "http://www.jaflore.com/img/sdw/bundesliga.jpg";
                        break;
                    case 395:
                        response[index].bckgImg = "http://www.jaflore.com/img/sdw/bundesliga.jpg";
                        break;
                    case 396:
                        response[index].bckgImg = "http://www.jaflore.com/img/sdw/ligue1.jpg";
                        break;
                    case 397:
                        response[index].bckgImg = "http://www.jaflore.com/img/sdw/ligue2.jpg";
                        break;
                    case 398:
                        response[index].bckgImg = "http://www.jaflore.com/img/sdw/premierleague.jpg";
                        break;
                    case 399:
                        response[index].bckgImg = "http://www.jaflore.com/img/sdw/ligabbva.jpg";
                        break;
                    case 400:
                        response[index].bckgImg = "http://www.jaflore.com/img/sdw/ligaadelante.jpg";
                        break;
                    case 401:
                        response[index].bckgImg = "http://www.jaflore.com/img/sdw/seriea.jpg";
                        break;
                    case 402:
                        response[index].bckgImg = "http://www.jaflore.com/img/sdw/primeiraliga.jpg";
                        break;
                    case 403:
                        response[index].bckgImg = "http://www.jaflore.com/img/sdw/3bundesliga.jpg";
                        break;
                    case 404:
                        response[index].bckgImg = "http://www.jaflore.com/img/sdw/eredivise.jpg";
                        break;
                    case 405:
                        response[index].bckgImg = "http://www.jaflore.com/img/sdw/championsleague.jpg";
                        break;
                    case 425:
                        response[index].bckgImg = "http://www.jaflore.com/img/sdw/ligueone.jpg";
                        break;
                    default:
                        response[index].bckgImg = "http://www.jaflore.com/img/sdw/default.jpg";
                        break;
                }
            });
            this.setState({championships:response});
        }
    });
  };

  fetchFixtures(){
    fetchJSON(consts.api.enpoints.getCurrentGames()).then((response) => {
        if(!response.error){
            this.setState({fixtures:response});
        }
    });
  };

  componentDidMount() {
    this.fetchChampionships();
    this.fetchFixtures();
  };

  render() {
    const {
        championships,
        response,
        fixtures
    } = this.state

    return (
      <div>
          <div className={styles.live}>
              <h1 className={styles.title}>Résultats</h1>
              <hr/>
                {
                    fixtures &&
                    fixtures.fixtures &&
                    fixtures.fixtures.map((fixture, index) => {
                        if(fixture.result.goalsHomeTeam!==null || fixture.result.goalsAwayTeam!==null){
                            return <div key={index} className={styles.fixture} >
                                        <div className={styles.homeTeams}>{fixture.homeTeamName}</div>
                                        <div className={styles.scores}>{fixture.result.goalsHomeTeam} - {fixture.result.goalsAwayTeam}</div>
                                        <div className={styles.awayTeams}> {fixture.awayTeamName}</div>
                                    </div>
                        }else{
                            return <div key={index} className={styles.fixture} >
                                        <div className={styles.homeTeams}>{fixture.homeTeamName}</div>
                                        <div className={styles.scores}>{fixture.result.goalsHomeTeam} - {fixture.result.goalsAwayTeam}</div>
                                        <div className={styles.awayTeams}> {fixture.awayTeamName}</div>
                                    </div>
                        }

                    })
                }
          </div>
          <ul className={styles.listChampionship}>
              <h1 className={styles.title}>Championnats</h1>
              <hr/>
                {
                  championships &&
                  championships.map((championship, index) => {
                    return <li key={index} className={styles.championship} >
                            <Link to={"/championship/"+championship.id}>
                                <figure>
                                    <img src={championship.bckgImg}/>
                                </figure>
                                <h2>{championship.caption}</h2>
                            </Link>
                            </li>
                  })
                }
                <h1 className={styles.title}>Articles</h1>
                <hr/>
                <div className={styles.imgArticle}>
                    <img src="http://www.jaflore.com/img/sdw/default.jpg"/>
                </div>
                <div className={styles.textArticle}>
                    <h2>Article 1</h2>
                    <p>
                        Ex his quidam aeternitati se commendari posse per statuas aestimantes eas ardenter adfectant quasi plus praemii de figmentis aereis sensu carentibus adepturi, quam ex conscientia honeste recteque factorum, easque auro curant inbracteari, quod Acilio Glabrioni delatum est primo
                     </p>
                </div>
                <div className={styles.imgArticle}>
                    <img src="http://www.jaflore.com/img/sdw/default.jpg"/>
                </div>
                <div className={styles.textArticle}>
                    <h2>Article 2</h2>
                    <p>
                        Ex his quidam aeternitati se commendari posse per statuas aestimantes eas ardenter adfectant quasi plus praemii de figmentis aereis sensu carentibus adepturi, quam ex conscientia honeste recteque factorum, easque auro curant inbracteari, quod Acilio Glabrioni delatum est primo
                     </p>
                </div>
                <div className={styles.imgArticle}>
                    <img src="http://www.jaflore.com/img/sdw/default.jpg"/>
                </div>
                <div className={styles.textArticle}>
                    <h2>Article 3</h2>
                    <p>
                        Ex his quidam aeternitati se commendari posse per statuas aestimantes eas ardenter adfectant quasi plus praemii de figmentis aereis sensu carentibus adepturi, quam ex conscientia honeste recteque factorum, easque auro curant inbracteari, quod Acilio Glabrioni delatum est primo
                     </p>
                </div>
                <div className={styles.imgArticle}>
                    <img src="http://www.jaflore.com/img/sdw/default.jpg"/>
                </div>
                <div className={styles.textArticle}>
                    <h2>Article 4</h2>
                    <p>
                        Ex his quidam aeternitati se commendari posse per statuas aestimantes eas ardenter adfectant quasi plus praemii de figmentis aereis sensu carentibus adepturi, quam ex conscientia honeste recteque factorum, easque auro curant inbracteari, quod Acilio Glabrioni delatum est primo
                     </p>
                </div>
                <div className={styles.imgArticle}>
                    <img src="http://www.jaflore.com/img/sdw/default.jpg"/>
                </div>
                <div className={styles.textArticle}>
                    <h2>Article 5</h2>
                    <p>
                        Ex his quidam aeternitati se commendari posse per statuas aestimantes eas ardenter adfectant quasi plus praemii de figmentis aereis sensu carentibus adepturi, quam ex conscientia honeste recteque factorum, easque auro curant inbracteari, quod Acilio Glabrioni delatum est primo
                     </p>
                </div>
                <div className={styles.imgArticle}>
                    <img src="http://www.jaflore.com/img/sdw/default.jpg"/>
                </div>
                <div className={styles.textArticle}>
                    <h2>Article 6</h2>
                    <p>
                        Ex his quidam aeternitati se commendari posse per statuas aestimantes eas ardenter adfectant quasi plus praemii de figmentis aereis sensu carentibus adepturi, quam ex conscientia honeste recteque factorum, easque auro curant inbracteari, quod Acilio Glabrioni delatum est primo
                     </p>
                </div>
                <div className={styles.imgArticle}>
                    <img src="http://www.jaflore.com/img/sdw/default.jpg"/>
                </div>
                <div className={styles.textArticle}>
                    <h2>Article 7</h2>
                    <p>
                        Ex his quidam aeternitati se commendari posse per statuas aestimantes eas ardenter adfectant quasi plus praemii de figmentis aereis sensu carentibus adepturi, quam ex conscientia honeste recteque factorum, easque auro curant inbracteari, quod Acilio Glabrioni delatum est primo
                     </p>
                </div>
                <div className={styles.imgArticle}>
                    <img src="http://www.jaflore.com/img/sdw/default.jpg"/>
                </div>
                <div className={styles.textArticle}>
                    <h2>Article 8</h2>
                    <p>
                        Ex his quidam aeternitati se commendari posse per statuas aestimantes eas ardenter adfectant quasi plus praemii de figmentis aereis sensu carentibus adepturi, quam ex conscientia honeste recteque factorum, easque auro curant inbracteari, quod Acilio Glabrioni delatum est primo
                     </p>
                </div>
          </ul>
      </div>
    )
  }
}
