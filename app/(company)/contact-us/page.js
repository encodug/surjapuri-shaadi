import React from 'react'

function ContactUs() {
  return (
    <>
    <div className='bg-red-600 py-8 pb-36'>
        <div className="container mx-auto p-6 md:px-8">
            <h1 className='text-4xl text-white font-bold'>Contact Us</h1>
            <p className='text-white mt-4'>We are here to assist you and provide support in your search for love and companionship within the Surjapuri community.</p>
        </div>
    </div>
    <div className='flex -mt-28 container mx-auto p-6 md:px-8'>
        <div className='bg-slate-200 p-6 rounded shadow md:basis-3/5'>
            <h2 className='font-bold'>Customer Support</h2>
            <ol className='list-decimal list-outside pl-4 space-y-3 marker:font-bold pt-4'>
                <li><span className='text-red-600 font-bold'>Email :</span> surjapurishaadi@gmail.com</li>
                <li><span className='text-red-600 font-bold'>Phone :</span> 9742514279</li>
                <li>
                    <span className='text-red-600 font-bold'>Working Hours:</span>
                    <ul className='list-disc list-outside pl-4 space-y-2 marker:font-bold'>
                        <li>Monday to Friday 10AM to 7PM</li>
                        <li>Saturday: 10AM to 4PM</li>
                        <li>Sunday: Holiday</li>
                    </ul>
                </li>
                <li>
                    <span className='text-red-600 font-bold'>Mailing Address:</span>
                    <br/>
                    <p>Siposip Technologies Private Limited, Teenpool Chowk, Islampur, Dist: Uttar Dinajpur, West Bengal: 733202</p>
                </li>
            </ol>
        </div>
    </div>
    <div className='container mx-auto p-6 md:px-8'>
        <p>We value your input and suggestions on how we can improve our services. Please share your feedback with us at <span className='font-bold'>feedbacksurjapurishaadi@gmail.com</span>.</p>
        <p className='pt-5'>At SurjapuriShaadi.com, we are committed to providing a reliable and secure platform to help you find your life partner. Whether you have questions, need assistance, or have ideas for improvement, don't hesitate to get in touch with us. Our dedicated team is here to assist you on your journey to meaningful connections and love within the Surjapuri community.</p>
    </div>
    </>
  )
}

export default ContactUs