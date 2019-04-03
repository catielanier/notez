import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
    <NavStyles data-test="nav">
        <Link href="/games">
            <a>Game Notes</a>
        </Link>
        <Link href="/players">
            <a>Player Notes</a>
        </Link>
        <Link href="/login">
            <a>Sign In</a>
        </Link>
    </NavStyles>
);

export default Nav;