import PleaseSignIn from '../components/PleaseSignIn';
import AdminNav from '../components/AdminNav';
import CreateGameFilter from '../components/CreateGameFilter';

const CreateGameFilterPage = (props) => {
    return( 
        <div>
            <PleaseSignIn>
                <AdminNav />
                <CreateGameFilter />
            </PleaseSignIn>
        </div>
    )
}

export default CreateGameFilterPage;