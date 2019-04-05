import Profile from '../components/Profile';
import PleaseSignIn from '../components/PleaseSignIn';
import Columns from './login';

const ProfilePage = (props) => {
    return( 
        <div>
            <PleaseSignIn>
                <Profile />
            </PleaseSignIn>
        </div>
    )
}

export default ProfilePage;