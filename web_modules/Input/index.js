import React, {PropTypes, Component} from "react"

import styles from "./index.css"

export default class Input extends Component {

    static propTypes = {
        type: PropTypes.string,
        onChange: PropTypes.func,
        name: PropTypes.string,
        value: PropTypes.string,
        placeholder: PropTypes.string
    };

    static defaultProps = {
        type: "text",
        onChange: ()=>{},
        name: null,
        placeholder: null,
        value: null,
    };

    state = {
        value: this.props.value
    };

    onChangeHandler = (event) => {
        const {
            onChange
        } = this.props

        this.setState({value: event.target.value});

        if( typeof onChange=="function" ){
            onChange(event.target.value)
        }
    };

    componentWillReceiveProps(nextProps){
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value })
        }
    }

    render() {

        const {
            type,
            name,
            placeholder,
        } = this.props

        return (
            <input
                className={styles.input}
                type={type}
                name={name}
                placeholder={placeholder}
                value={this.state.value}
                onChange={this.onChangeHandler} />
        )

    }
}
