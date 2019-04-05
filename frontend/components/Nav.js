import Link from 'next/link';
import User from './User';
import NavStyles from './styles/NavStyles';
import Signout from './Signout';

const Nav = () => (
    <User>
        {({data: { me }}) => (
            <NavStyles data-test="nav">
                {me && (
                    <>
                        <Link href="/">
                            <a style={{textTransform: 'initial'}}>{me.username}</a>
                        </Link>
                        <Link href="/games">
                            <a>Game Notes</a>
                        </Link>
                        <Link href="/players">
                            <a>Player Notes</a>
                        </Link>
                        {me.permissions.indexOf('ADMIN') !== -1 && (
                            <Link href="/permissions">
                                <a>Permissions</a>
                            </Link>
                        )}
                        <Signout />
                    </>
                )}
                {!me && (
                    <Link href="/login">
                        <a>Sign In</a>
                    </Link>
                )}
            </NavStyles>
        )}    
    </User>
);

export default Nav;