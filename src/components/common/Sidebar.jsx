import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/redux/slice/authSlice';
import { removeReducers } from '@/redux/store';
import { toast } from 'sonner';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Separator } from '../ui/separator';

import {
  Menu,
  X,
  CircleUserIcon,
  Building2,
  LogOut
} from 'lucide-react';

const Sidebar = ({ navItems, isMobile, enableCompany = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userType = useSelector((state) => state.user.userType);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    removeReducers();
    navigate('/');
    toast.success('Logged out successfully');
  };

  useEffect(() => {
    setIsOpen(!isMobile || !isMobile && isOpen);
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navActions = [
    { title: 'Profile', icon: <CircleUserIcon className="w-6 h-6 text-blue-700" />, url: `/${userType}/profile` },
    ...(enableCompany ? [{ title: 'Organization', icon: <Building2 className="w-6 h-6 text-blue-700" />, url: `/${userType}/organization` }] : []),
    { title: 'Logout', icon: <LogOut className="w-6 h-6 text-blue-700" />, url: '/', onClick: handleLogout },
  ];

  return (
    <>
      <aside className={`bg-white text-black h-screen sticky top-0 flex flex-col ${isOpen ? 'w-56' : 'w-14'} transition-all duration-300 shadow-lg fixed ${isMobile ? 'z-50' : 'relative'}`}>
        <div className="flex items-center justify-between p-4 shadow-md">
          <button
            className="text-black focus:outline-none"
            onClick={toggleSidebar}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-blue-700" />
            ) : (
              <Menu className="w-6 h-6 text-blue-700" />
            )}
          </button>
        </div>
        <nav className="mt-4 flex-1">
          <TooltipProvider delayDuration={200}>
            {navItems.map((item, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    key={index}
                    to={item.url}
                    className={`flex items-center font-semibold px-4 py-2 mb-1 rounded-lg transition-colors duration-200 relative ${location.pathname === item.url
                      ? 'bg-blue-100 text-black'
                      : 'hover:bg-blue-100'
                      }`}
                  >
                    {item.icon}
                    {isOpen && <span className="ml-5">{item.title}</span>}
                  </Link>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent className="font-semibold" side="right">
                    {item.title}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
        <nav className={`mb-4 ${isOpen && 'px-4'}`}>
          <TooltipProvider delayDuration={200}>
            {navActions.map((action, index) => (
              <React.Fragment key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={action.url}
                      onClick={action.onClick}
                      className="flex items-center w-full px-4 py-2 text-black rounded-lg hover:bg-blue-100 focus:outline-none transition-colors duration-200"
                    >
                      {action.icon}
                      {isOpen && (
                        <span className="ml-5 font-semibold">
                          {action.title}
                        </span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {!isOpen && (
                    <TooltipContent className="font-semibold" side="right">
                      {action.title}
                    </TooltipContent>
                  )}
                </Tooltip>
                {index < navActions.length - 1 && <Separator className="bg-gray-300" />}
              </React.Fragment>
            ))}
          </TooltipProvider>
        </nav>
      </aside>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
