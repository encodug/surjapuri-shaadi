'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="text-gray-600 body-font mt-auto">
        <div className="p-6 lg:p-8  mx-auto container">
            <div className='flex sm:flex-row flex-col items-center'>
                <a href="#" className="h-8 w-24 relative">
                    <Image src="/images/logo.png" alt="Surjapuri Shaadi" fill className='object-contain' sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                </a>
                <div className='flex flex-col my-4 text-center md:flex-row md:ml-8'> 
                    <Link href="/about-us" className="text-base text-black font-medium leading-6 p-2 rounded-md hover:text-red-600">
                        About Us
                    </Link>
                    <Link href="/terms" className="text-base text-black font-medium leading-6 p-2 rounded-md hover:text-red-600">
                        Terms of Use
                    </Link>
                    <Link href="/privacy-policy" className="text-base text-black font-medium leading-6 p-2 rounded-md hover:text-red-600">
                        Privacy Policy
                    </Link>
                    <Link href="/refund-policy" className="text-base text-black font-medium leading-6 p-2 rounded-md hover:text-red-600">
                        Refund Policy
                    </Link>
                    <Link href="/contact-us" className="text-base text-black font-medium leading-6 p-2 rounded-md hover:text-red-600">
                        Contact Us
                    </Link>
                </div>
            </div>
            <div className='border-t flex sm:flex-row flex-col pt-4 items-center justify-between'>
                    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-1-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
                        © 2024 Siposip Technologies Private Limited
                    </p>
                    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-1-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">This website is strictly for matrimonial purpose only and not a dating website. </p>
                    <span className="inline-flex sm:mt-0 mt-4 justify-center sm:justify-start">
                        <a href="" className="text-gray-500">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </a>
                        <a href="" className="ml-3 text-gray-500">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                        <a href="" className="ml-3 text-gray-500">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                    </span>
            </div>
        </div>
    </footer>
  )
}

export default Footer