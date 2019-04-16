import PleaseSignIn from '../components/PleaseSignIn';
import Games from '../components/Games';
import Link from 'next/link';

const Home = props => (
  <PleaseSignIn>
    <Games />
  </PleaseSignIn>
);

export default Home;