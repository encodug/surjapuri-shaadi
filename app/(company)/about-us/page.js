import Image from 'next/image'
import React from 'react'

function About() {
  return (
    <>
    <div className="p-6 lg:p-12 container mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="md:basis-1/2 flex-none text-3xl xl:text-5xl text-red-600 font-bold">SurjapuriShaadi.com</div>
            <div className="md:basis-1/2">Your gateway to finding love and companionship in the vibrant and culturally rich Surjapuri regions of West Bengal and Bihar. We are dedicated to helping you connect with your life partner, fostering relationships that are bound by tradition, culture, and shared values.</div>
        </div>
    </div>
    <div className='relative'>
        <div className='h-96 relative saturate-50'>
            <Image src="/images/about-us.png" fill quality={100} className="object-cover lg:object-fill object-center" alt="Happy Couple, Finds your today"/>\
        </div>
        <div className='absolute inset-0'>
            <h1 className='font-extrabold text-5xl lg:text-6xl text-white text-center py-48 shadow-sm'>Finding Love</h1>
        </div>
        
    </div>

    <div className="px-6 pt-6 lg:px-12 md:pt-12 container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
            <div className="md:basis-1/2 pb-4 md:p-4">
                <h1 className='text-center text-3xl text-black font-bold'>Our Mission</h1>
                <p className='mt-6'>Our mission is to bring together individuals from the Surjapuri community and adjacent regions in West Bengal and Bihar, providing a platform where they can find their ideal life partners. We are committed to preserving and celebrating the unique cultural and traditional values of the Surjapuri community, while embracing modern technology to facilitate meaningful connections.</p>
            </div>
            <div className='md:basis-1/2 relative h-[512px] w-full'>
                <Image src="/images/about-us-mission.png" fill quality={100} className="object-cover lg:object-fill object-center" alt="Happy Couple, Finds your today"/>
            </div>
        </div>
    </div>
    <div className="justify-center w-full">
        <div className="flex flex-row items-center max-w-lg mx-auto">
            <div className="md:basis-1/2 bg-red-600 h-24"></div>
            <div className="md:basis-1/2 bg-gray-900 h-24"></div>
        </div>
    </div>
    <div className="px-6 lg:px-12 container mx-auto">
        <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:basis-1/2 pb-4 md:p-4">
                <h1 className='text-center text-3xl text-black font-bold'>Our Vision</h1>
                <p className='mt-6'>Our vision is to be the leading online matrimonial platform for the Surjapuri community, connecting people not just by geography, but by their roots, traditions, and aspirations. We aspire to:</p>
                <ul role='list' className='list-disc list-inside py-4 pl-5 space-y-3 marker:text-red-600'>
                    <li>Promote Cultural Unity: We aim to foster cultural unity by facilitating matches within the Surjapuri community, allowing people to share and preserve their rich heritage.</li>
                    <li>Create Lasting Bonds: We believe in the power of lasting relationships and want to be the catalyst for love stories that stand the test of time.</li>
                    <li>Regional Inclusivity: SurjapuriShaadi.com is not just limited to one state or region but extends to the entire Surjapuri-speaking community, promoting inclusivity and diversity within the community.</li>
                    <li>User-Centric Approach: We are dedicated to providing a user-friendly platform that simplifies the search for a life partner, with an emphasis on privacy, security, and a pleasant user experience.</li>
                    <li>Modern Tradition: We acknowledge the importance of tradition while embracing modern technology. Our platform combines the best of both worlds to help you find your perfect match.</li>
                </ul>
            </div>
            <div className='md:basis-1/2 relative h-[512px] md:h-[950px] lg:h-[768px] w-full'>
                <Image src="/images/about-us-vision.png" fill quality={100} className="object-cover lg:object-fill object-center" alt="Happy Couple, Finds your today"/>
            </div>
        </div>
    </div>

    <div className="py-8 md:py-20 px-6 md:px-8">
        <div className=' max-w-3xl mx-auto'>
            <h1 className='text-center text-3xl md:text-4xl xl:text-5xl text-black font-bold'>Why Surjapurishaadi.com?</h1>
            <ul role='list' className='list-disc list-inside py-4 pl-5 space-y-3 marker:text-red-600'>
                <li>Promote Cultural Unity: We aim to foster cultural unity by facilitating matches within the Surjapuri community, allowing people to share and preserve their rich heritage.</li>
                <li>Create Lasting Bonds: We believe in the power of lasting relationships and want to be the catalyst for love stories that stand the test of time.</li>
                <li>Regional Inclusivity: SurjapuriShaadi.com is not just limited to one state or region but extends to the entire Surjapuri-speaking community, promoting inclusivity and diversity within the community.</li>
                <li>User-Centric Approach: We are dedicated to providing a user-friendly platform that simplifies the search for a life partner, with an emphasis on privacy, security, and a pleasant user experience.</li>
                <li>Modern Tradition: We acknowledge the importance of tradition while embracing modern technology. Our platform combines the best of both worlds to help you find your perfect match.</li>
            </ul>
            <p className='mt-6'>SurjapuriShaadi.com is more than just a matrimonial website; it's a bridge to your future, connecting you with your soulmate while preserving the cultural roots that bind you. We look forward to helping you embark on this exciting journey of finding love and companionship within the Surjapuri community. Join us today and start your quest for a lifelong partnership on SurjapuriShaadi.com.</p>
        </div> 
        
    </div>
    
    </>
  )
}

export default About