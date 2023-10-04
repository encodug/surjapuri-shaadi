'use client'

import withAuth from "@/app/(auth)/withAuth"
import Connections from "@/app/components/chat/connections";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { useChatConnection } from "./useChatConnection";

function Chat() {
    const { connections } = useChatConnection();
  
  return (
    <main className="flex-1 flex">
            <div className='flex flex-col md:flex-row lg:container lg:mx-auto lg:px-8 lg:py-2 lg:space-x-4 overflow-hidden w-full'>
                <div className='flex-1 bg-transparent md:bg-red-600 p-5 md:flex-none md:basis-4/12 xl:basis-3/12 lg:rounded-lg'>
                    <div className='mb-5'>
                        <h2 className='font-bold text-2xl mb-2 text-black md:text-white'>Chats</h2>
                        <div className="relative block w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <MagnifyingGlassCircleIcon className="w-6 h-6 mr-2"/>
                            </div>
                            <input type="text" className='placeholder:text-gray-400 block  rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 w-full pl-9 pr-3' placeholder='Search Connection'/>
                        </div>
                    </div>
                    <Connections connections={connections.filter((connection) => connection.status === 'accepted')}/>
                </div>
                <div className={`hidden flex-1 border-t border-b border-slate-300 md:flex-none md:basis-8/12 xl:basis-9/12 lg:border lg:rounded-lg lg:shrink md:inline-flex`}>
                    <div className="w-full h-full bg-slate-200 justify-center items-center flex">
                      <p className="font-bold text-xl text-gray-600">Select a chat or start a new conversation</p>
                    </div>
                </div>
            </div>
        </main>
  ) 
}

export default withAuth(Chat)