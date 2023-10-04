'use client'
import Image from "next/image"
import Link from "next/link";
import BlurredImage from "../profile/blurredImage";

function Connections({connections}) {

  return (
    <>
    {connections !== null && 
        connections?.map((connection) => (
            <div key={connection.connectionId} className="w-full">
                <Link href={`/chat/${connection.connectionId}`}>
                    <div className="flex items-center px-1 py-2 rounded-lg hover:bg-slate-100 md:hover:bg-red-500 cursor-pointer">
                        <div className="w-16 h-16 border rounded-full mr-4 relative flex-shrink-0 overflow-hidden">
                            {connection.photoApproved === 0 ? (
                                <BlurredImage src={connection.photoUrl} alt={connection.name} className="object-cover object-center w-full h-full"/>
                            ) : (
                                <Image src={connection.photoUrl} alt={connection.name} fill className={`object-cover object-center`}/>
                            )}
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-black md:text-white title-font text-lg font-semibold">{connection.name}</h2>
                            <p className="text-gray-700 md:text-slate-100 text-sm">{connection.location}</p>
                        </div>
                    </div>
                </Link>
            </div>
    ))}
    </>
  )
}

export default Connections