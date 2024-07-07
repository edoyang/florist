import { Link } from 'react-router-dom';
import { logout } from '../utils/isLogin';

const Sidebar = ({ isLoggedIn }) => {
  const handleLogout = () => {
    logout();
    window.location.reload();
    window.location.href = '/';
  };

  return (
    <>
      {isLoggedIn && (
        <div className="sidebar">
          <div className="logo">
            <h1>Management</h1>
          </div>
          <div className="menu">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/products">Products</Link>
            <Link to="/orders">Orders</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;