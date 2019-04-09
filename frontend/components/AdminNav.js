import Link from 'next/link';
import styled from 'styled-components';

const Columns = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 20%);
    grid-gap: 20px;

    a {
        transition: all 0.2s ease;

        &:hover {
            border: 1px solid ${props => props.theme.action};
        }
    }
`;

const AdminNav = () => (
    <>
        <Columns>
            <div>
                <Link href="/creategame">
                    <a>Create Game</a>
                </Link>
            </div>
            <div>
                <Link href="/createcharacter">
                    <a>Create Character</a>
                </Link>
            </div>
            <div>
                <Link href="/creategamefilter">
                    <a>Create Game Filter</a>
                </Link>
            </div>
            <div>
                <Link href="/createplayerfilter">
                    <a>Create Player Filter</a>
                </Link>
            </div>
        </Columns>
        <Columns>
            <div>
                <Link href="/updategame">
                    <a>Update Game</a>
                </Link>
            </div>
            <div>
                <Link href="/updatecharacter">
                    <a>Update Character</a>
                </Link>
            </div>
            <div>
                <Link href="/updategamefilter">
                    <a>Update Game Filter</a>
                </Link>
            </div>
            <div>
                <Link href="/updateplayerfilter">
                    <a>Update Player Filter</a>
                </Link>
            </div>
        </Columns>
    </>
)

export default AdminNav;