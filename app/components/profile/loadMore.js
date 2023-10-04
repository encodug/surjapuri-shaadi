'use client'
import { delay, fetchGetParamRequest } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import Profiles from ".";
import Spinner from "../ui/spinner";
import { useInView } from "react-intersection-observer";


function LoadMore({searchCriteria, ...props}) {

    const [pagesLoaded, setPagesLoaded] = useState(1);
    const [profiles, setProfiles] = useState([]);
    const [eod, setEod] = useState(false);
    const [ref, inView] = useInView();

    const loadMoreProfiles = async () => {
        await delay(1000);
        const nextPage = pagesLoaded + 1;
        searchCriteria.page = nextPage;
        const {success, data } = await fetchGetParamRequest('/api/search/quick/', JSON.stringify(searchCriteria))
        if(success) {
            setProfiles((prevData) => [...prevData, ...data.profiles]);
            setPagesLoaded(nextPage);
        } else {
            setEod(true);
        }
    }

    useEffect(() => {
        if(inView) {
            loadMoreProfiles();
        }
    }, [inView]);
    
  return (
    <>
        <Profiles profiles={profiles} />
        {!eod &&
            <div className="flex justify-center items-center p-4 col-span-1 md:col-span-3 xl:col-span-4" ref={ref}>
                <Spinner className="w-10 h-10"/>
            </div>
        }   
    </>
  )
}

export default LoadMore