import CreatePlayerFilter from '../components/CreatePlayerFilter';
import PleaseSignIn from '../components/PleaseSignIn';
import AdminNav from '../components/AdminNav';

const CreatePlayerFilterPage = (props) => {
    return( 
        <div>
            <PleaseSignIn>
                <AdminNav />
                <CreatePlayerFilter />
            </PleaseSignIn>
        </div>
    )
}

export default CreatePlayerFilterPage;