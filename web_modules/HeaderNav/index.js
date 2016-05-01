import React, {PropTypes, Component } from 'react';
import {Link, IndexLink} from 'react-router'

import InputArtist from 'InputArtist'
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';


import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import styles from './index.css'

export default class HeaderNav extends Component {

    state = {
        open: false
    };

    handleToggle = () =>{
      this.setState({open: !this.state.open});
    };

    render() {

      return (
        <div>
            <div className={styles.topBar}></div>
          <AppBar
            title={<img width="200px" src="http://www.jaflore.com/img/sdw/logo2.png"/>}
            iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationMenu /></IconButton>}

            iconElementRight={<InputArtist />}
            className={styles.appbar}/>
            <LeftNav
                open={this.state.open}
                onRequestChange={(open) => {}}>
                    <AppBar
                        title="Menu"
                        iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationClose /></IconButton>}	/>
                    <IndexLink to="/" activeClassName={styles.activeLink} className={styles.link}>
                        <MenuItem>Home</MenuItem>
                    </IndexLink>
                    <Link to="/discover" activeClassName={styles.activeLink} className={styles.link}>
                        <MenuItem>Discover</MenuItem>
                    </Link>
            </LeftNav>
        </div>)

    }
}
