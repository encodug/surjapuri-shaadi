'use client'
import React, { Fragment, useState } from 'react'
import { ArrowRightOnRectangleIcon, Bars3Icon, ChevronDownIcon, Cog6ToothIcon, CurrencyRupeeIcon, PencilSquareIcon, UserIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/(auth)/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Menu, Transition } from '@headlessui/react';
import { Bars3BottomLeftIcon, Bars3CenterLeftIcon, BellAlertIcon, XMarkIcon } from '@heroicons/react/24/solid';

function Header() {
    const [mobileOpenMenu, setMobileOpenMenu] = useState(false);
    const { user } = useAuth();

    return (
        <header className="bg-white text-gray-600 body-font">
            <nav className="mx-auto flex container items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5 h-12 w-40 relative">
                    <span className="sr-only">Surjapuri Shaadi</span>
                    <Image src="/images/logo.png" alt="Surjapuri Shaadi" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='object-contain'/>
                </Link>
                </div>
                <div id="Navigation" className='flex flex-row items-center justify-center content-center'>
                    <div className="flex lg:hidden">
                        <button className="inline-flex items-center justify-center rounded-md text-gray-700 relative" onClick={() => setMobileOpenMenu(true)}>
                            <div className="sr-only">Open Main Menu</div>
                            <Bars3BottomLeftIcon className="w-6 h-6"/>
                        </button>
                    </div>
                    {user && 
                    <div className={`${mobileOpenMenu ? "fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto bg-gray-900 w-64" : "hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-5"}`} tabIndex="-1" aria-labelledby='drawer'>
                        <button type="button" onClick={()=> setMobileOpenMenu(false)} className={`text-white float-right lg:hidden`}>
                            <div className="sr-only">Close Main Menu</div>
                            <XMarkIcon className='w-6 h-6'/>
                        </button>
                        <div className='py-4 overflow-y-auto lg:overflow-y-hidden'>
                            
                                <ul className={`flex flex-col lg:items-center space-y-4 font-medium lg:flex-row lg:space-y-0 lg:space-x-4`}>
                                    <li>
                                        <Link href="/">
                                            <span className="text-base text-white lg:text-black font-semibold leading-6 p-2 rounded-md hover:bg-red-600 hover:text-slate-100 ">
                                                Home
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/search/advanced">
                                            <span className="text-base text-white lg:text-black font-semibold leading-6 p-2 rounded-md hover:bg-red-600 hover:text-slate-100">
                                                Search
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/profile/media">
                                            <span className="text-base text-white lg:text-black font-semibold leading-6 p-2 rounded-md hover:bg-red-600 hover:text-slate-100">
                                                Media
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/profile/connections">
                                            <span className="text-base text-white lg:text-black font-semibold leading-6 p-2 rounded-md hover:bg-red-600 hover:text-slate-100">
                                                Connections
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/chat">
                                            <span className="text-base text-white lg:text-black font-semibold leading-6 p-2 rounded-md hover:bg-red-600 hover:text-slate-100">
                                                Chat
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            
                            </div>
                        
                       </div>
                    }
                    {user === null ? (
                        <Link href="/signIn">
                            <span className="text-sm font-semibold leading-6 text-slate-100 bg-red-500 p-2 rounded-md">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Link>
                    ) :
                    (
                        <Menu as="div" className="relative inline-block ml-4">
                            <div>
                                <Menu.Button className="inline-flex items-center justify-center overflow-hidden h-12 w-12 rounded-full border-2 border-red-600 p-0.5">
                                    <Image quality={100} width={38} height={38} className='rounded-full w-full h-full object-fill object-center' src={user?.photoUrl ? user?.photoUrl : (user?.gender === 'Male' ? '/images/maleAvatar.png' : '/images/femaleAvatar.png')} alt={user?.name}/>
                                </Menu.Button>
                            </div>
                            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                <div className='px-1 py-1'>
                                    <Menu.Item>
                                        {({active}) => (
                                            <Link href="/profile" className='text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-red-600'>
                                                <UserIcon className='mr-2 h-5 w-5' aria-hidden="true"/> My Profile
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({active}) => (
                                            <Link href="/profile/edit" className='text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-red-600'>
                                                <PencilSquareIcon className='mr-2 h-5 w-5' aria-hidden="true"/> Edit Profile
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({active}) => (
                                            <Link href="/profile/upgrade" className='text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-red-600'>
                                                <CurrencyRupeeIcon className='mr-2 h-5 w-5' aria-hidden="true"/> Upgrade Account
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({active}) => (
                                            <Link href="/profile/settings" className='text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-red-600'>
                                                <Cog6ToothIcon className='mr-2 h-5 w-5' aria-hidden="true"/> Settings
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({active}) => (
                                            <button type="button" onClick={() => signOut(auth)} className='text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-red-600'>
                                                <ArrowRightOnRectangleIcon className='mr-2 h-5 w-5' aria-hidden="true"/> Logout
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                            </Transition>
                        </Menu> 
                    )}
                    </div>
            </nav>
        </header>
    )
}

export default Header