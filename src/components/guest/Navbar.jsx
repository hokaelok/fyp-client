import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <header className="bg-white shadow w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 cursor-pointer">
          <Link to="/">
            BiliBala
          </Link>
        </h1>
        <nav className="flex space-x-4">
          <Link to="/login" >
            <Button variant="link">
              Login
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;