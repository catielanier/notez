import UpdateCharacter from '../components/UpdateCharacter';
import PleaseSignIn from '../components/PleaseSignIn';
import AdminNav from '../components/AdminNav';

const UpdateCharacterPage = (props) => {
    return( 
        <div>
            <PleaseSignIn>
                <AdminNav />
                <UpdateCharacter />
            </PleaseSignIn>
        </div>
    )
}

export default UpdateCharacterPage;