import ProfileHeader from "@/app/components/profile/header";
import Link from "next/link";
import { ChatConnectionProvider } from "../chat/useChatConnection";
import { Cog6ToothIcon, PhotoIcon, TicketIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Layout({ children }) {
  return (
        <>
        <ChatConnectionProvider>
          <main>
              <div className="container mx-auto p-6 md:px-12">
                <ProfileHeader/>
                <div className="flex mt-5 md:mt-8 bg-red-500 rounded-md text-slate-100 font-semibold text-sm space-x-6 p-3 justify-center items-center content-center md:justify-start">
                  <Link href="/profile">
                    <span className="inline-flex items-center">
                      <UserIcon className="w-5 h-5 mr-2"/> 
                      <p className="sr-only md:not-sr-only">Profile</p>
                    </span>
                  </Link>
                  <Link href="/profile/media">
                    <span className="inline-flex items-center">
                      <PhotoIcon className="w-5 h-5 mr-2"/> 
                      <p className="sr-only md:not-sr-only">Media</p>
                    </span>
                  </Link>
                  <Link href="/profile/connections">
                    <span className="inline-flex items-center">
                      <UserGroupIcon className="w-5 h-5 mr-2"/> 
                      <p className="sr-only md:not-sr-only">Connections</p>
                    </span>  
                  </Link>   
                  <Link href="/profile/subcriptions">
                    <span className="inline-flex items-center">
                      <TicketIcon className="w-5 h-5 mr-2"/> 
                      <p className="sr-only md:not-sr-only">Subsrciptions</p>
                    </span>  
                  </Link>      
                  <Link href="/profile/settings">
                    <span className="inline-flex items-center">
                      <Cog6ToothIcon className="w-5 h-5 mr-2"/> 
                      <p className="sr-only md:not-sr-only">Settings</p>
                    </span>  
                  </Link>  
                 
                </div>
              </div>
              <section className="flex flex-col lg:flex-row mx-auto container overflow-hidden p-6 md:px-12 space-x-4">
                <div className='flex-1 lg:basis-3/4'>{children}</div>
                <div className='flex-1 hidden lg:block lg:basis-1/4'>
                  <h2>Online Members</h2>
                  <div className="border rounded-lg w-full p-4 text-center">
                    <p className="text-2xl font-bold">Advertise Here</p>
                  </div>
                </div>
              </section>
          </main>
          </ChatConnectionProvider>
        </>
  )
}
