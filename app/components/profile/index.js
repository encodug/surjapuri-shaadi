import { calculateAge } from "@/app/lib/utils"
import Link from "next/link"
import ProfileImage from "./ProfileImage"


function Profiles({profiles = null}) {
  return (
    <>
    {profiles !== null ? (
        profiles.map((data) => (
            <Link href={`/member-profile/${data.uid}`} key={data.uid}>
                <div className="w-full h-96 rounded-lg bg-gray-400 overflow-hidden relative border hover:-translate-y-1 group/item">
                    <div className="w-full h-full relative">
                        <ProfileImage profile={data}/>
                    </div>
                    <div className="absolute bg-slate-200 p-4 inset-x-0 bottom-0 rounded-b lg:h-full lg:bg-transparent lg:before:h-full lg:before:w-full lg:before:absolute lg:before:bottom-0 lg:before:left-0 lg:before:bg-gradient-to-t lg:before:from-black/60 lg:before:via-black/20 lg:before:to-transparent lg:text-white flex  items-end flex-wrap content-end">
                        <div className="lg:z-10">
                        <p className="text-base font-bold w-full mb-2">{data.name}</p>
                        <div className="lg:hidden group-hover/item:block">
                            <p className="w-full text-sm">{calculateAge(data.DOB)} years, {data.gender}</p>
                            <p className="w-full text-sm">{data.district} {data.state && `, ${data.state}`}</p>
                        </div>
                        </div>
                    </div>
                </div>
            </Link>
        ))
    ) : (
        <div>No Profiels matched.</div>
    )}
    
    </>
  )
}

export default Profiles