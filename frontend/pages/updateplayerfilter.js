import UpdatePlayerFilter from '../components/UpdatePlayerFilter';
import PleaseSignIn from '../components/PleaseSignIn';
import AdminNav from '../components/AdminNav';

const UpdatePlayerFilterPage = (props) => {
    return( 
        <div>
            <PleaseSignIn>
                <AdminNav />
                <UpdatePlayerFilter />
            </PleaseSignIn>
        </div>
    )
}

export default UpdatePlayerFilterPage;