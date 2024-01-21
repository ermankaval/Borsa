import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { BiSearch, BiMenu } from 'react-icons/bi';
import Logo from './Logo';
import { useAppContext } from './context';

const Navbar = () => {
    const { state } = useAppContext();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // const { likedMoviesCount } = useWishlist();

    const handleScroll = () => {
        const isScrolled = window.scrollY > 0;
        if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
        }
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMobileMenuItemClick = () => {
        setIsMobileMenuOpen(false);
    };

    const closeMobileMenuOutsideClick = useRef(null);

    const handleClickOutside = (event) => {
        if (closeMobileMenuOutsideClick.current && !closeMobileMenuOutsideClick.current.contains(event.target)) {
            setIsMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [scrolled]);

    return (
        <nav className={`flex items-center justify-between p-4 ${scrolled ? 'bg-black' : ''} bg-black`}>
            <div className='container flex justify-between items-center'>
                <Link href="/">
                    <Logo style={`h-auto w-[100px] ${scrolled ? 'text-white' : 'text-black'}`} />
                </Link>
                <ul className='hidden space-x-4 md:flex'>
                    <li className='headerLink'>
                        <Link href="/hakkında">
                            <span className={`text-white ${scrolled ? 'hover:text-gray-300' : 'hover:text-gray-800'}`}>Hakkında</span>
                        </Link>
                    </li>

                    <li className='headerLink'>
                        <Link href="/trendingNow">
                            <span className={`text-white ${scrolled ? 'hover:text-gray-300' : 'hover:text-gray-800'}`}>İletişim</span>
                        </Link>
                    </li>
                    <li className='headerLink'>
                        <Link href="/TrackingListPage">
                            <span className={`text-white ${scrolled ? 'hover:text-gray-300' : 'hover:text-gray-800'}`}>Takip Listem ({state.trackedCount})</span>
                        </Link>
                    </li>
                </ul>
                <div className="md:hidden" style={{ marginRight: '20px' }}>
                    <button
                        className="text-white focus:outline-none"
                        onClick={handleMobileMenuToggle}
                    >
                        <BiMenu className="h-6 w-6 cursor-pointer" />
                    </button>
                </div>
            </div>

            <div
                ref={closeMobileMenuOutsideClick}
                className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} fixed top-0 right-0 w-3/4 h-full bg-black bg-opacity-70 overflow-y-auto`}
            >
                <ul className="flex flex-col space-y-4 p-4">
                    <li onClick={handleMobileMenuItemClick}>
                        <Link href="/hakkında">
                            <span className={`text-white ${scrolled ? 'hover:text-gray-300' : 'hover:text-gray-800'}`}>Hakkında</span>
                        </Link>
                    </li>

                    <li onClick={handleMobileMenuItemClick}>
                        <Link href="/trendingNow">
                            <span className={`text-white ${scrolled ? 'hover:text-gray-300' : 'hover:text-gray-800'}`}>İletişim</span>
                        </Link>
                    </li>
                    <li onClick={handleMobileMenuItemClick}>
                        <Link href="/MyList">
                            <span className={`text-white ${scrolled ? 'hover:text-gray-300' : 'hover:text-gray-800'}`}>
                                {/* My List ({likedMoviesCount}) */}
                                Takip Listem ({state.trackedCount})
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
