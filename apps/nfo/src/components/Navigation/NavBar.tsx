import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav className="flex space-x-4 p-4 border-b border-gray-700">
            <Link to="/" className="text-link hover:underline">Home</Link>
            <Link to="/oracle-tuner" className="text-link hover:underline">Oracle Tuner</Link>
        </nav>
    );
}