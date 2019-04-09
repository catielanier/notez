import CreateCharacter from '../components/CreateCharacter';
import PleaseSignIn from '../components/PleaseSignIn';
import AdminNav from '../components/AdminNav';

const CreateCharacterPage = (props) => {
    return( 
        <div>
            <PleaseSignIn>
                <AdminNav />
                <CreateCharacter />
            </PleaseSignIn>
        </div>
    )
}

export default CreateCharacterPage;