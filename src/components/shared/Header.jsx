import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../ecommerce/CartContext';

const Header = ({ activeUser, onSwitchUser }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart();
  const location = useLocation();

  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  const navigation = [
    { name: 'Home', href: `/user/${activeUser?.userId}`, current: location.pathname === `/user/${activeUser?.userId}` },
    { name: 'Shop', href: `/user/${activeUser?.userId}/shop`, current: location.pathname.includes('/shop') },
    { name: 'About', href: `/user/${activeUser?.userId}/about`, current: location.pathname.includes('/about') },
    { name: 'Contact', href: `/user/${activeUser?.userId}/contact`, current: location.pathname.includes('/contact') },
    { name: 'Orders', href: `/user/${activeUser?.userId}/orders`, current: location.pathname.includes('/orders') },
    { name: 'Wallet', href: `/user/${activeUser?.userId}/wallet`, current: location.pathname.includes('/wallet') },
  ];

  const userMenuItems = [
    { name: 'Orders', href: `/user/${activeUser?.userId}/orders`, icon: ShoppingBagIcon },
    { name: 'Wallet', href: `/user/${activeUser?.userId}/wallet`, icon: UserCircleIcon },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <Link to={`/user/${activeUser?.userId}`} className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-gradient-primary hidden sm:block">ShopSmart</span>
          </Link>

          {/* User Info (Desktop) */}
          <div className="hidden lg:flex flex-col text-xs mr-4 text-secondary-600">
            <span className="font-semibold">User: {activeUser?.userId}</span>
            <span>Mobile: {activeUser?.parentMobile}</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-menu">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-item ${item.current ? 'nav-item-active text-primary-600' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="header-actions">
            {/* Search (Desktop) */}
            <div className="search-container">
              <MagnifyingGlassIcon className="search-icon h-5 w-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Cart */}
            <Link to={`/user/${activeUser?.userId}/cart`} className="btn btn-ghost btn-sm relative">
              <ShoppingBagIcon className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="user-menu">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="user-avatar"
              >
                {activeUser?.userId?.substring(0, 2).toUpperCase() || 'U'}
              </button>

              {isUserMenuOpen && (
                <div className="nav-dropdown animate-fade-in">
                  <div className="px-4 py-3 border-b border-secondary-100">
                    <p className="text-sm font-medium text-gray-900">User ID: {activeUser?.userId}</p>
                    <p className="text-xs text-gray-500">Mobile: {activeUser?.parentMobile}</p>
                  </div>
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4 mr-3 text-secondary-400" />
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t border-secondary-200 mt-2 pt-2">
                    <button
                      onClick={onSwitchUser}
                      className="flex items-center w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <ArrowsRightLeftIcon className="h-4 w-4 mr-3" />
                      Switch User
                    </button>
                    {/* <button className="flex items-center w-full px-4 py-2 text-sm text-danger-600 hover:bg-danger-50 transition-colors duration-200">
                      <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                      Sign Out
                    </button> */}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost btn-sm md:hidden"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="mobile-menu animate-slide-down">
            <div className="px-4 pt-2 pb-6 space-y-2 border-b border-secondary-100">
              <div className="flex items-center space-x-3 mb-4 p-3 bg-secondary-50 rounded-lg">
                <div className="user-avatar bg-primary-500">
                  {activeUser?.userId?.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{activeUser?.userId}</p>
                  <p className="text-xs text-gray-500">{activeUser?.parentMobile}</p>
                </div>
              </div>

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-all ${item.current
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600'
                    : 'text-secondary-600 hover:bg-secondary-50'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => {
                    onSwitchUser();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                >
                  <ArrowsRightLeftIcon className="h-5 w-5 mr-3" />
                  Switch User
                </button>
                <button className="flex items-center w-full px-3 py-2 text-base font-medium text-danger-600 hover:bg-danger-50 transition-colors duration-200">
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;