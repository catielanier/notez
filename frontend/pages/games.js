import PleaseSignIn from '../components/PleaseSignIn';
import Games from '../components/Games';

const GameNotesPage = (props) => {
    return( 
        <div>
            <PleaseSignIn>
                <Games />
            </PleaseSignIn>
        </div>
    )
}

export default GameNotesPage;