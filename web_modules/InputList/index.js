import React, {PropTypes, Component } from 'react';
import debounce from 'lodash.debounce';

import Item from "Item";
import Input from "Input";

import styles from "./index.css"

export default class List extends Component {

    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array,
        onInputChange: PropTypes.func,
        onItemClick: PropTypes.func,
        autoFilter: PropTypes.bool,
        limit: PropTypes.number,
    };

    static defaultProps = {
        title: "",
        items: [],
        onInputChange: null,
        onItemClick: null,
        autoFilter: true,
        limit: -1,
    };

    state = {
        inputValue: ""
    };

    onChangeHandler = (value) => {
      this.setState({inputValue: value})
    };

    filterName = (item) => {
      return (item.name && item.name.toLowerCase().search(this.state.inputValue.toLowerCase())!=-1);
    };

    render() {

      const {
        title,
        items,
        onInputChange,
        onItemClick,
        autoFilter,
        limit,
      } = this.props

      const onChangeHandler = (onInputChange) ? debounce(onInputChange,300) :  this.onChangeHandler
      let selectedIndex = 0;

      return (
        <div className={styles.list}>
            {
                <Input placeholder={title} onChange={onChangeHandler}/>
            }
            <div className={styles.results}>
            {
              items &&
              items.map((item, index) => {

                const isFilter = (!autoFilter || autoFilter && this.filterName(item))
                if(isFilter) selectedIndex++;
                const isLimited = (limit==-1 || selectedIndex<=limit)

                return (
                    isFilter && isLimited &&
                    <Item key={index} id={item.id} name={item.name} onClick={onItemClick}/>
                );
              })
            }
            </div>
        </div>)

    }
}
