import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import User from './User';
import Select from 'react-select';
import ReactSelectStyles from './styles/ReactSelectStyles';
import {ALL_GAMES_QUERY} from './CreateCharacter';

class Games extends Component {
    render() {
        return(
            <p>Oh hey it's a note page.</p>
        )
    }
}

export default Games;