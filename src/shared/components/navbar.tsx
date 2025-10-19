import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  MdOutlinePeopleAlt,
  MdOutlineInsertChart,
  MdOutlineSwitchAccount,
  MdOutlineCardGiftcard,
} from "react-icons/md";
import { FaMoneyBills } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoIosArrowForward, IoIosMenu, IoIosArrowDown } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "../../assets/logo.svg";
import { BsChatLeftText, BsBell } from "react-icons/bs";
import { RiBug2Line } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import Copy from "../../assets/copy.svg";
import Invoicing from "../../assets/invoicing.svg";
import MediaKit from "../../assets/mediakit.svg";
import Store from "../../assets/store.svg";
import AppIcon from "../../assets/appIcon.svg";
import Booking from "../../assets/booking.svg";
import List from "../../assets/list.svg";
import { useUser } from "../hooks/useUser";

const menuItems = [
  { label: "Home", icon: <GoHome size={18} />, path: "/" },
  {
    label: "Analytics",
    icon: <MdOutlineInsertChart size={18} />,
    path: "/analytics",
  },
  { label: "Revenue", icon: <FaMoneyBills size={18} />, path: "/revenue" },
  { label: "CRM", icon: <MdOutlinePeopleAlt size={18} />, path: "/crm" },
  {
    label: "Apps",
    icon: <img src={AppIcon} alt="app-icon" />,
    dropdown: [
      {
        icon: Copy,
        label: "Link in Bio",
        description: "Manage your link in bio",
        path: "/apps/app1",
      },
      {
        icon: Store,
        label: "Store",
        description: "Manage your store activities",
        path: "/apps/app2",
      },
      {
        icon: MediaKit,
        label: "Media Kit",
        description: "Manage your media kit",
        path: "/apps/app3",
      },
      {
        icon: Invoicing,
        label: "Invoicing",
        description: "Manage your invoices",
        path: "/apps/app4",
      },
      {
        icon: Booking,
        label: "Bookings",
        description: "Manage your bookings",
        path: "/apps/app5",
      },
    ],
  },
];

export default function Navbar() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const { data: user, isLoading, isError } = useUser();

  // get initials
  const userInitials =
    !user || isLoading
      ? "OJ"
      : `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
    setIsProfileMenuOpen(false);
  };
  const handleProfileMenuToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setOpenDropdown(null);
  };

  return (
    <nav className="w-full bg-white flex items-center justify-between px-6 py-3.5 rounded-full shadow-md shadow-[#2D3B430D]">
      {/* Left Logo */}

      <div className="flex items-center justify-center w-8 h-8 rounded-md ">
        <img src={logo} alt="logo" loading="lazy" />
      </div>
      <div className="hidden lg:flex items-center gap-8">
        {/* Menu items */}
        <ul
          className="flex items-center gap-5  font-semibold leading-6 text-[#56616B]
                   [&>li]:px-4 [&>li]:py-2 [&>li]:flex [&>li]:rounded-full [&>li]:items-center [&>li]:gap-2
                   [&>li]:cursor-pointer [&>li:not(.active)]:hover:bg-black/10 "
        >
          {menuItems.map((item, i) => {
            const isActive =
              location.pathname === item.path || openDropdown === item.label;
            const hasDropdown = !!item.dropdown;
            return (
              <li
                key={i}
                className={`relative text-sm xl:text-base ${
                  isActive
                    ? "active bg-[#131316] text-white [&_svg]:text-white"
                    : "text-[#56616B]"
                }`}
              >
                {hasDropdown ? (
                  <>
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      className="flex relative z-50 items-center text-inherit gap-4 font-semi-bold"
                      data-testid="app-button"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {openDropdown === item.label && (
                        <div className="flex items-center gap-2 transition-transform duration-300 overflow-hidden">
                          <span>Link in Bio</span>
                          <IoIosArrowDown size={16} />
                        </div>
                      )}
                    </button>

                    {/* Dropdown menu */}
                    {openDropdown === item.label && (
                      <ul
                        data-testid="app-dropDown"
                        className="absolute bg-white [&>li]:hover:shadow-xs [&>li]:hover:border-[0.5px] [&>li]:hover:border-gray-50 [&>li]:rounded-lg [&>li]:py-4 p-2.5 [&>li]:gap-3 top-full left-0 mt-8 max-w-[28.5rem] min-w-[22rem] rounded-2xl shadow-md "
                      >
                        {item.dropdown.map((sub, i) => (
                          <li
                            key={i}
                            className="px-4 group py-2 flex justify-between items-center "
                          >
                            <div className="flex items-center gap-3 group-hover:gap-0">
                              <div className="p-3 rounded-lg flex items-center justify-center shadow-sm">
                                <img src={sub.icon} alt={sub.label} />
                              </div>
                              <div className="text-black">
                                <p className="font-medium font-sm">
                                  {sub.label}
                                </p>
                                <p className="text-xs font-normal">
                                  {sub.description}
                                </p>
                              </div>
                            </div>
                            <IoIosArrowForward
                              size={18}
                              className="text-black  fill-black hidden group-hover:block "
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 text-inherit  no-underline"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right Icons Desktop */}
      <div className="hidden lg:flex relative items-center gap-2 text-gray-600">
        <div className="p-2.5">
          <BsBell size={20} className="cursor-pointer hover:text-black" />
        </div>
        <div className="p-2.5">
          <BsChatLeftText
            size={20}
            className="cursor-pointer hover:text-black"
          />
        </div>
        {/* Avatar */}
        <div
          onClick={handleProfileMenuToggle}
          className="bg-[#EFF1F6] flex items-center gap-2 py-1 pl-1.5 pr-2.5 rounded-full"
          data-testid="profile-button"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5C6670] to-[#131316]  flex items-center justify-center text-sm leading-4 font-semibold">
            <p className="bg-gradient-to-br from-[#FFFFFF] to-[#F2F3F5] bg-clip-text text-transparent">
              {userInitials}
            </p>
          </div>
          <IoIosMenu size={22} className="cursor-pointer hover:text-black" />
        </div>
        {isProfileMenuOpen && (
          <ul
            data-testid="profile-menu"
            className="absolute z-101 bg-white [&>li]:flex [&>li]:items-center [&>li]:gap-2 font-medium [&>li]:text-am [&>li]:py-2 top-full right-0 mt-8 px-6 space-y-4 py-5 max-w-[28.5rem] min-w-[22rem] rounded-2xl shadow-md group-hover:block"
          >
            <li className="  flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C6670] to-[#131316]  flex items-center justify-center text-base leading-4 font-semibold">
                <p className="bg-gradient-to-br from-[#FFFFFF] to-[#F2F3F5] bg-clip-text text-transparent">
                  {userInitials}
                </p>
              </div>
              {isError ? (
                <div>
                  <p className="text-sm text-red-600 font-normal">
                    Error loading user
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold font-sm">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-xs font-normal">{user?.email}</p>
                </div>
              )}
            </li>
            <li>
              <IoSettingsOutline size={18} /> Settings
            </li>
            <li>
              <img src={List} alt="app-icon" /> Purchase History
            </li>
            <li>
              <MdOutlineCardGiftcard size={18} /> Refer and Earn
            </li>
            <li>
              <img src={AppIcon} alt="app-icon" /> Integrations
            </li>
            <li>
              <RiBug2Line size={18} /> Report Bug
            </li>
            <li>
              <MdOutlineSwitchAccount size={18} />
              Switch Accounts
            </li>
            <li>
              <CiLogout size={18} className=" transform scale-x-[-1]" />
              Logout
            </li>
          </ul>
        )}
      </div>

      {/* Right Icons Mobile */}
      <div className="lg:hidden relative">
        <button
          onClick={handleProfileMenuToggle}
          className="bg-[#EFF1F6] flex items-center gap-2 py-1 pl-1.5 pr-2.5 rounded-full"
          data-testid="mobile-menu-button"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5C6670] to-[#131316]  flex items-center justify-center text-sm leading-4 font-semibold">
            <p className="bg-gradient-to-br from-[#FFFFFF] to-[#F2F3F5] bg-clip-text text-transparent">
              {userInitials}
            </p>
          </div>
          <IoIosMenu size={22} className="cursor-pointer hover:text-black" />
        </button>

        {isProfileMenuOpen && (
          <ul
            data-testid="mobile-menu-dropdown"
            className="absolute right-0 mt-4 bg-white shadow-lg rounded-2xl py-4 px-5 w-60 flex flex-col gap-4 z-50"
          >
            {/* Optional: User Info */}
            <li className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5C6670] to-[#131316] flex items-center justify-center text-sm font-semibold text-white">
                {userInitials}
              </div>
              <div className="text-sm">
                <p className="font-semibold">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </li>

            {/* Navigation Links */}
            {menuItems.map((item, i) => (
              <li key={i}>
                {item.dropdown ? (
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer font-medium text-sm">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        {item.label}
                      </div>
                      <IoIosArrowDown
                        size={16}
                        className="transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <ul className="mt-2 ml-4 flex flex-col gap-2">
                      {item.dropdown.map((sub, j) => (
                        <Link
                          to={sub.path}
                          key={j}
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2 text-gray-600 hover:text-black text-sm"
                        >
                          <img
                            src={sub.icon}
                            alt={sub.label}
                            className="w-4 h-4"
                          />
                          {sub.label}
                        </Link>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2 text-gray-700 hover:text-black text-sm"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                )}
              </li>
            ))}

            <li className="border-t border-gray-100 pt-3 text-sm flex items-center gap-2">
              <CiLogout size={18} className="transform scale-x-[-1]" /> Logout
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
