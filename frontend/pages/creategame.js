import CreateGame from '../components/CreateGame';
import PleaseSignIn from '../components/PleaseSignIn';

const CreateGamePage = (props) => {
    return( 
        <div>
            <PleaseSignIn>
                <CreateGame />
            </PleaseSignIn>
        </div>
    )
}

export default CreateGamePage;