import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Signin from './Signin';
import Signup from './Signup';
import RequestReset from './RequestReset';
import { Columns } from '../pages/login';

const PleaseSignIn = props => (
    <Query query={CURRENT_USER_QUERY}>
        {({data, loading}) => {
            if (loading) return <p>Loading...</p>
            if (!data.me) {
                return <div>
                    <p>Please sign in!</p>
                    <Columns>
                        <Signup />
                        <Signin />
                        <RequestReset />
                    </Columns>
                </div>
            }
            return props.children
        }}
    </Query>
)

export default PleaseSignIn;