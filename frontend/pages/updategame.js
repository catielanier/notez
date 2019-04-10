import UpdateGame from '../components/UpdateGame';
import PleaseSignIn from '../components/PleaseSignIn';
import AdminNav from '../components/AdminNav';

const CreateGamePage = (props) => {
    return( 
        <div>
            <PleaseSignIn>
                <AdminNav />
                <UpdateGame />
            </PleaseSignIn>
        </div>
    )
}

export default CreateGamePage;