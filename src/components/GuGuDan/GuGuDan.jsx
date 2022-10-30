import React from 'react';
import styles from './GuGuDan.module.css';
const {Component} = React;

class GuGuDan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: Math.ceil(Math.random() * 9),
            second: Math.ceil(Math.random() * 9),
            value: '',
            result: '',
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.first * this.state.second === parseInt(this.state.value)) {
            this.setState((prev) => {
                return {
                    first: Math.ceil(Math.random() * 9),
                    second: Math.ceil(Math.random() * 9),
                    value: '',
                    result: `정답! : ${prev.first} * ${prev.second}는 ${prev.first * prev.second} 입니다.`,
                }
            });
            this.input.focus();
        }
        else {
            this.setState({
                value: '',
                result: '땡',
            });
            this.input.focus();
        }
    }

    onChange = (e) => {
        this.setState({ value: e.target.value });
    }

    input;

    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.ques}><span className={styles.number}>{this.state.first}</span> <span className={styles.op}>*</span> <span className={styles.number}>{this.state.second}</span></div>
                <form onSubmit={this.onSubmit} className={styles.form}>
                    <input className={styles.input} ref={(c) => { this.input = c; }} type="number" value={this.state.value} onChange={this.onChange} />
                    <button className={styles.button}>입력!</button>
                </form>
                <div className={styles.result}>{this.state.result}</div>
            </div>
        );
    }
}

export default GuGuDan;