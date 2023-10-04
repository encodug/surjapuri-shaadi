    'use client'
import withAuth from "@/app/(auth)/withAuth"
import ChatMessage from "@/app/components/chat/message"
import { ArrowLeftIcon, GifIcon, InformationCircleIcon, PhotoIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Connections from "@/app/components/chat/connections";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link"
import { useChatConnection } from "../useChatConnection"
import { useEffect, useMemo, useRef, useState } from "react"
import ChatMessageInput from "@/app/components/chat/MessageInput"
import { useAuth } from "@/app/(auth)/useAuth"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/app/lib/firebase"
import BlurredImage from "@/app/components/profile/blurredImage"

function PrivateChat({params}) {
    const [messages, setMessages] = useState(null);
    const [loading, setLoading] = useState(true);

    const latestMessage = useRef();
    
    const profileId = params.connection;
    const { connections } = useChatConnection();
    const { user }  = useAuth();
    
    const profile = useMemo(() => {
        if (!profileId) return null; // Handle the case where profileId is not available
    
        return connections.find((connection) => connection.connectionId === profileId);
      }, [profileId, connections]);

    
    useEffect(() => {
      const unsub = onSnapshot(doc(db, "chatroom", profileId), (doc) => {
        try{ 
            if(doc.exists()){
                const data = doc.data();
                setMessages(data.messages);
            } 
            setLoading(false);
        } catch(error) {
            setLoading(true);
            console.error("Error fetching data from Firestore:", error);
        }
      });
    
      return () => {
        unsub();
      }
    }, []);

  return (
        <main className="flex-1 flex">
            <div className='flex flex-col md:flex-row lg:container lg:mx-auto lg:px-8 lg:py-2 lg:space-x-4 overflow-hidden w-full'>
                <div className={`flex-1 flex-col bg-transparent md:bg-red-600 p-5 md:flex-none md:basis-4/12 xl:basis-3/12 lg:rounded-lg md:flex ${profile === null ? 'flex' : 'hidden'}`}>
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
                <div className={`flex-1 border-t border-b border-slate-300 md:flex-none md:basis-8/12 xl:basis-9/12 lg:border lg:rounded-lg lg:shrink md:inline-flex ${profile === null ? 'hidden' : 'flex'}`}>
                    {profile &&
                        <div className="w-full flex flex-col max-h-full h-full">
                            <div className="flex p-3 items-center border-b w-full bg-white lg:rounded-t-lg">
                                <Link href="/chat">
                                    <ArrowLeftIcon className="w-10 h-10 mr-3 text-red-600 hover:bg-slate-100 p-2 rounded md:hidden"/>
                                </Link>
                                <div className="w-12 h-12 border rounded-full mr-4 relative flex-shrink-0 overflow-hidden">
                                {profile?.photoApproved === 0 ? (
                                    <BlurredImage src={profile?.photoUrl} alt={profile?.name} className="object-cover object-center w-full h-full"/>
                                ) : (
                                    <Image src={profile?.photoUrl} alt={profile?.name} fill className={`object-cover object-center`}/>
                                )}
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-black title-font font-semibold">{profile?.name}</h2>
                                </div>
                                <InformationCircleIcon className="w-8 h-8 ml-auto border-2 rounded-full p-0 text-red-600 border-red-300 hover:ring-4 hover:ring-red-400"/>
                            </div>
                            <div className="flex-1 overflow-y-scroll p-6 items-end justify-end flex flex-col">
                            {!loading ? (
                                messages?.map((message, index) => (
                                    <div key={index} ref={latestMessage}>
                                        <ChatMessage message={message.messageText} receiver={message.sender_id === user.uid ? false : true} />
                                    </div>
                                ))
                            ) : (
                                <p>Loading messages...</p> // You can replace this with a loading spinner or any loading indicator you prefer.
                            )}
                            </div>
                            <div className="mt-auto bg-white lg:rounded-b-lg p-1.5 py-2 flex items-center border-t">
                                {/*<div className="mr-1 rounded-full text-red-600 hover:bg-slate-100 p-1">
                                    <GifIcon className="w-6 h-6"/>
                                </div>
                                <div className="mr-2 rounded-full text-red-600 hover:bg-slate-100 p-1">
                                    <PhotoIcon className="w-6 h-6"/>
                                </div>*/}
                                <ChatMessageInput user={user} connectionId={profile.connectionId}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </main>

  )
}

export default withAuth(PrivateChat);