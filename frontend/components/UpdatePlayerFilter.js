import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import User, { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';
import Error from './ErrorMessage';
import Select from 'react-select';

const UPDATE_PLAYER_FILTER_MUTATION = gql`
    mutation UPDATE_PLAYER_FILTER_MUTATION(
        $name: String!
        $name_ja: String
        $name_ko: String
        $name_zh_CN: String
        $name_zh_TW: String
        $name_zh_HK: String
        $id: ID!
    ) {
        updatePlayerFilter(
            name: $name
            name_ja: $name_ja
            name_ko: $name_ko
            name_zh_CN: $name_zh_CN
            name_zh_TW: $name_zh_TW
            name_zh_HK: $name_zh_HK
            id: $id
        ) {
            id
            name
            name_ja
            name_ko
            name_zh_CN
            name_zh_TW
            name_zh_HK
        }
    }
`;

const ALL_PLAYER_FILTERS_QUERY = gql`
    query ALL_PLAYER_FILTERS_QUERY {
        playerFilters(
            orderBy: name_ASC
        ) {
            id
            name
            name_ja
            name_ko
            name_zh_CN
            name_zh_HK
            name_zh_TW
        }
    }
`;

class UpdatePlayerFilter extends Component {
    state = {
        name: '',
        name_ja: '',
        name_ko: '',
        name_zh_CN: '',
        name_zh_TW: '',
        name_zh_HK: '',
        id: ''
    }

    changeState = (e, a) => {
        const value = e.value || e.target.value;
        const { name } = a || e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return(
            <User>
                {({data: {me}}) => (
                    <Query query={ALL_PLAYER_FILTERS_QUERY}>
                        {({data: {playerFilters}}) => (
                            <Mutation mutation={UPDATE_PLAYER_FILTER_MUTATION} variables={this.state}>
                            {(updatePlayerFilter, {loading, error, called}) => (
                                <>
                                {console.log(playerFilters)}
                                    <h2>Update Player Filters</h2>
                                    <Form method="post" onSubmit={async (e) => {
                                        e.preventDefault();
                                        const res = await updatePlayerFilter();
                                        console.log(res);
                                        this.setState({
                                            name: '',
                                            name_ja: '',
                                            name_ko: '',
                                            name_zh_CN: '',
                                            name_zh_TW: '',
                                            name_zh_HK: '',
                                            id: ''
                                        });
                                    }}>
                                        <fieldset disabled={loading} aria-busy={loading}>
                                            <Error error={error} />
                                            {!error && !loading && called && <p>Filter successfully created.</p>}
                                            <label htmlFor="id">
                                                Select Filter:
                                                <Select options={
                                                    playerFilters.map(filter => {
                                                        return {
                                                            label: filter.name,
                                                            value: filter.id
                                                        }
                                                    })
                                                } name="id" onChange={async (e) => {
                                                    const {value} = e;
                                                    await this.setState({
                                                        name: '',
                                                        name_ja: '',
                                                        name_ko: '',
                                                        name_zh_CN: '',
                                                        name_zh_TW: '',
                                                        name_zh_HK: '',
                                                        id: ''
                                                    });
                                                    playerFilters.map(filter => {
                                                        if (filter.id === value) {
                                                            this.setState({
                                                                ...filter,
                                                                games: filter.games
                                                            });
                                                        }
                                                    });
                                                }} />
                                            </label>
                                            <label htmlFor="name">
                                                Filter Name:
                                                <input type="text" name="name" value={this.state.name} onChange={this.changeState} placeholder="Filter name" />
                                            </label>
                                            <label htmlFor="name_ja">
                                                日本語の名前:
                                                <input type="text" name="name_ja" value={this.state.name_ja} onChange={this.changeState} placeholder="フィルター名" />
                                            </label>
                                            <label htmlFor="name_ko">
                                                한국어 이름:
                                                <input type="text" name="name_ko" value={this.state.name_ko} onChange={this.changeState} placeholder="필터 이름" />
                                            </label>
                                            <label htmlFor="name_zh_CN">
                                                简体中文名字：
                                                <input type="text" name="name_zh_CN" value={this.state.name_zh_CN} onChange={this.changeState} placeholder="过滤器名称" />
                                            </label>
                                            <label htmlFor="name_zh_TW">
                                                繁體中文名字：
                                                <input type="text" name="name_zh_TW" value={this.state.name_zh_TW} onChange={this.changeState} placeholder="過濾器名稱" />
                                            </label>
                                            <label htmlFor="name_zh_HK">
                                                廣東話名字：
                                                <input type="text" name="name_zh_HK" value={this.state.name_zh_HK} onChange={this.changeState} placeholder="過濾器名稱" />
                                            </label>
                                            <button type="submit">Update Filter</button>
                                        </fieldset>
                                    </Form>
                                </>
                            )}
                            </Mutation>
                        )}
                    </Query>
                )}
            </User>
        )
    }
}

export default UpdatePlayerFilter;
export {ALL_PLAYER_FILTERS_QUERY};