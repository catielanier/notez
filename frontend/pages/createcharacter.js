import CreateCharacter from '../components/CreateCharacter';
import PleaseSignIn from '../components/PleaseSignIn';

const CreateCharacterPage = (props) => {
    return( 
        <div>
            <PleaseSignIn>
                <CreateCharacter />
            </PleaseSignIn>
        </div>
    )
}

export default CreateCharacterPage;