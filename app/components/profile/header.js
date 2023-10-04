'use client'
import { useAuth } from '@/app/(auth)/useAuth'
import withAuth from '@/app/(auth)/withAuth';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'
import Image from 'next/image';

function ProfileHeader() {
    const { user } = useAuth();
  return (
    <div className='flex flex-col md:flex-row space-y-3 md:space-x-5 justify-center items-center'>
        <div className="w-full md:basis-1/3 xl:basis-1/5 h-80 md:h-60 relative">
            <div className="w-full h-full rounded-3xl overflow-hidden relative">
                {user.photoUrl === null || user.photoUrl === '' ? (
                    <Image fill className="object-cover object-center w-full h-full" src={(user.gender ? '/images/maleAvatar.png' : '/images/femaleAvatar.png')} alt={user.name} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                ) : (
                    <Image fill className="object-cover object-center w-full h-full" src={user.photoUrl} alt={user.name} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                )}
            </div>
            <button className="w-12 h-12 p-3 shadow rounded-full bg-white absolute -bottom-4 -right-4 cursor-pointer">
                <FolderPlusIcon className="w-6 h-6"/>
            </button>
        </div>
        <div className="flex-1 md:basis-2/3 xl:basis-4/5">
            <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center lg:text-left">{user.name}</h1>
            </div>
            <div className="flex flex-col lg:flex-row lg:flex-wrap lg:space-4 text-center lg:text-left gap-1 mt-2">
                <p className='mr-4'><span className="font-thin">Age:</span> {new Date().getFullYear() - new Date(user.DOB).getFullYear()} </p>
                <p className='mr-4'><span className="font-thin">Gender:</span> {user?.gender}</p>
                <p className='mr-4'><span className="font-thin">Location:</span> { user.userProfile?.location }, { user.userProfile?.district }, {user.userProfile?.state}</p>
                <p className='mr-4'><span className="font-thin">Email:</span> {user?.email}</p>
            </div>
        </div>
    </div>
  )
}

export default withAuth(ProfileHeader);