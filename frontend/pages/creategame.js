import CreateGame from '../components/CreateGame';
import PleaseSignIn from '../components/PleaseSignIn';
import AdminNav from '../components/AdminNav';

const CreateGamePage = (props) => {
    return( 
        <div>
            <PleaseSignIn>
                <AdminNav />
                <CreateGame />
            </PleaseSignIn>
        </div>
    )
}

export default CreateGamePage;