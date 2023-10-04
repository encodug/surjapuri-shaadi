  'use client'
import { Tab } from '@headlessui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useChatConnection } from '../../chat/useChatConnection'
import { useAuth } from '@/app/(auth)/useAuth';
import { BellIcon, CheckCircleIcon, PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { fetchGetParamRequest } from '@/app/lib/utils';
import ProfileImage from '@/app/components/profile/ProfileImage';

function Connections() {
   const [shortlisted, setShortlisted] = useState([]);
   const { connections } = useChatConnection();
   const { user } = useAuth();

   const interestSent = useMemo(() => {
    return connections.filter((connection) => connection.uid_1 === user.uid);
  }, [user, connections]);

  const interestRecieved = useMemo(() => {
    return connections.filter((connection) => connection.uid_2 === user.uid);
  }, [user, connections]);


  const fetchShortlisted = async () => {
    const {success, data} = await fetchGetParamRequest('/api/connection/shortlist/', user.uid);
    if(success) {
        const { shortlistedWithUsers }  = data;
        setShortlisted(shortlistedWithUsers);
    }
  }

  useEffect(() => {
    fetchShortlisted();
  }, []);

  
   
  return (
    
      <Tab.Group> 
        <Tab.List className="flex space-x-1 rounded-xl bg-red-700/20 p-1">
          <Tab className={({ selected }) => (`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-red-600 ring-red-400 ring-opacity-60 ring-offset-2 ring-offset-red-200 focus:outline-none focus:ring-2 ${selected ? 'bg-white shadow' : 'text-red-400 hover:bg-white/[0.12] hover:text-white'}`)}>Interest Sent</Tab>
          <Tab className={({ selected }) => (`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-red-600 ring-red-400 ring-opacity-60 ring-offset-2 ring-offset-red-200 focus:outline-none focus:ring-2 ${selected ? 'bg-white shadow' : 'text-red-400 hover:bg-white/[0.12] hover:text-white'}`)}>Interest Received</Tab>
          <Tab className={({ selected }) => (`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-red-600 ring-red-400 ring-opacity-60 ring-offset-2 ring-offset-red-200 focus:outline-none focus:ring-2 ${selected ? 'bg-white shadow' : 'text-red-400 hover:bg-white/[0.12] hover:text-white'}`)}>Shortlisted</Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className={`p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
              {interestSent.map((profile) => (
                  <div key={profile.uid} className='border rounded-lg shadow overflow-hidden'>
                    <div className='w-full h-64 relative'>
                      <ProfileImage profile={profile}/>
                    </div>
                    <Link href={`/member-profile/${profile.uid_2}`}>
                      <div className='p-3'>
                        <p className='font-bold text-lg'>{profile.name}</p>
                        <p className='inline-flex items-center justify-start text-red-400 capitalize'>
                          <PaperAirplaneIcon className='w-4 h-4 mr-2'/>Interest {profile.status}
                        </p>
                      </div>
                    </Link>
                    
                      <div className='flex'>
                        <button className='flex-1 p-2 bg-slate-200 font-semibold inline-flex items-center text-center justify-center' disabled={profile.status === 'pending'}><BellIcon className='w-4 h-4 mr-2'/>Reminder</button>
                        <button className='flex-1 p-2 bg-red-600 text-white font-semibold  inline-flex items-center text-center justify-center'><TrashIcon className='w-4 h-4 mr-2'/>Delete</button>
                      </div>
                  </div>
              ))}
          </Tab.Panel>
          <Tab.Panel className={`p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
            {interestRecieved.map((profile) => (
                  <div key={profile.uid} className='border rounded-lg shadow overflow-hidden'>
                    <div className='w-full h-64 relative'>
                      <ProfileImage profile={profile}/>
                    </div>
                    <Link href={`/member-profile/${profile.uid_1}`}>
                      <div className='p-3'>
                        <p className='font-bold text-lg'>{profile.name}</p>
                        <p className='inline-flex items-center justify-start text-red-400 capitalize'>
                          <PaperAirplaneIcon className='w-4 h-4 mr-2'/>Interest {profile.status}
                        </p>
                      </div>
                    </Link>
                    {profile.status === 'pending' &&
                      <div className='flex'>
                        <button className='flex-1 p-2 bg-slate-200 font-semibold inline-flex items-center text-center justify-center'><BellIcon className='w-4 h-4 mr-2'/>Accept</button>
                        <button className='flex-1 p-2 bg-red-600 text-white font-semibold  inline-flex items-center text-center justify-center'><TrashIcon className='w-4 h-4 mr-2'/>Reject</button>
                      </div>
                    } 
                    {(profile.status === 'rejected' || profile.status === 'blocked') &&
                      <div className='flex'>
                        <button className='flex-1 p-2 bg-slate-200 font-semibold inline-flex items-center text-center justify-center'><BellIcon className='w-4 h-4 mr-2'/>View Profile</button>
                      </div>
                    } 
                  </div>
              ))}
          </Tab.Panel>
          <Tab.Panel className={`p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
            {shortlisted.map((profile) => (
                <div key={profile.uid} className='border rounded-lg shadow overflow-hidden'>
                    <div className='w-full h-64 relative'>
                      <ProfileImage profile={profile}/>
                    </div>
                    <Link href={`/member-profile/${profile.uid_1}`}>
                      <div className='p-3'>
                        <p className='font-bold text-lg'>{profile.name}</p>
                      </div>
                    </Link>
                    
                    <div className='flex'>
                        <button className='flex-1 p-2 bg-slate-200 font-semibold inline-flex items-center text-center justify-center'><CheckCircleIcon className='w-4 h-4 mr-2'/>Send Interest</button>
                        <button className='flex-1 p-2 bg-red-600 text-white font-semibold  inline-flex items-center text-center justify-center'><TrashIcon className='w-4 h-4 mr-2'/>Remove</button>
                    </div>
                    
                  </div>
              ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      
  )
}

export default Connections