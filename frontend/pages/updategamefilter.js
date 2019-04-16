import UpdateGameFilter from '../components/UpdateGameFilter';
import PleaseSignIn from '../components/PleaseSignIn';
import AdminNav from '../components/AdminNav';

const UpdateGameFilterPage = (props) => {
    return( 
        <div>
            <PleaseSignIn>
                <AdminNav />
                <UpdateGameFilter />
            </PleaseSignIn>
        </div>
    )
}

export default UpdateGameFilterPage;