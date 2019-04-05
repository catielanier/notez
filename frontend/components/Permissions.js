import React, {Component} from 'react';
import { Query, Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import PropTypes from 'prop-types'; 

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation updatePermissions($permissions: [Permission], $userId: ID!) {
        updatePermissions(permissions: $permissions, userId: $userId) {
            id
            permissions
            username
            email
        }
    }
`;

const ALL_USERS_QUERY = gql`
    query {
        users {
            id
            username
            email
            permissions
        }
    }
`;

const possiblePermissions = [
    'ADMIN',
    'USER',
    'NOTEUPDATE',
    'NOTEDELETE',
    'PERMISSIONUPDATE',
    'GAMECREATE',
    'BAN'
];

const Permissions = props => (
    <Query query={ALL_USERS_QUERY}>
    {({data, loading, error}) => (
        <div>
            <Error error={error} />
            <h2>Manage permissions</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        {possiblePermissions.map(permission => <th key={permission}>{permission}</th>)}
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {data.users.map(user => <UserPermissions user={user} key={user.id} />)}
                </tbody>
            </Table>
        </div>
    )}
    </Query>

)

class UserPermissions extends React.Component {
    static propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
            id: PropTypes.string,
            permissions: PropTypes.array
        }).isRequired
    }

    state = {
        permissions: this.props.user.permissions,
    }

    handlePermissionChange = (e) => {
        const checkbox = e.target;
        const updatedPermissions = [...this.state.permissions];
        if (checkbox.checked) {
            updatedPermissions.push(checkbox.value);
        }
        if (!checkbox.checked) {
            const index = updatedPermissions.indexOf(checkbox.value);
            updatedPermissions.splice(index, 1);
        }
        this.setState({
            permissions: updatedPermissions
        });
    }

    render() {
        const user = this.props.user;
        return(
            <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{
                userId: this.props.user.id,
                permissions: this.state.permissions
            }}>
                {(updatePermissions, {loading, error}) => (
                    <tr>
                    { error ? <Error error={error} /> : null}
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        {possiblePermissions.map(permission => (
                            <td key={permission}>
                                <label htmlFor={`${user.id}-permission-${permission}`}>
                                    <input type="checkbox" id={`${user.id}-permission-${permission}`} checked={this.state.permissions.includes(permission)} value={permission} onChange={this.handlePermissionChange} />
                                </label>
                            </td>
                        ))}
                        <td>
                            <SickButton type="button" disabled={loading} onClick={updatePermissions}>Update</SickButton>
                        </td>
                    </tr>
                )}
            </Mutation>
        )
}
    
}

export default Permissions;