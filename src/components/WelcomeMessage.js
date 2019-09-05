import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import { Code } from '../styles/style';
import s from '../styles/home.style';


export default class WelcomeMessage extends React.Component {
    render() {
        return <h1>Hello, {this.props.username}</h1>;
    }
}