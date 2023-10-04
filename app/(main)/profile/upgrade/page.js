import { ArrowSmallRightIcon, CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid'
import React from 'react'

function UpgradeAccount() {
  return (
    <section className='p-6 md:px-8'>
        <div className="container mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Membership Plans</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Select from our multiple membership plan and find your best life partner with membership benefits.</p>
    </div>
    <div className="flex flex-wrap -m-4 justify-center">
      <div className="p-4 lg:w-1/3 w-full">
        <div className="h-full p-6 rounded-lg border-2 border-gray-900 flex flex-col relative overflow-hidden">
          <h2 className="text-lg tracking-widest title-font mb-1 font-bold">GOLD</h2>
          <h1 className="text-5xl text-gray-900 leading-none pb-4 mb-4 border-b border-gray-200 font-semibold">
            <p class="text-base ml-1 font-normal text-gray-500 line-through">&#8377;599.00</p>
            <p><span className='text-3xl'>&#8377;</span>399.00</p>
          </h1>
          <p className="flex items-center mb-2">
              <CheckCircleIcon className="w-6 h-6 mr-2 text-red-600"/>
              3 months Subscriptions
          </p>
          <p className="flex items-center mb-2">
              <CheckCircleIcon className="w-6 h-6 mr-2 text-red-600"/>
              7 Image Uploads
          </p>
          <p className="flex items-center mb-2">
              <CheckCircleIcon className="w-6 h-6 mr-2 text-red-600"/>
              20 connections
          </p>
          <span className='mb-3'></span>
          <button className="flex items-center mt-auto text-white bg-gray-900 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
            UPGRADE <ArrowSmallRightIcon className='w-4 h-4 ml-auto'/>
          </button>
          {/*<p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>*/}
        </div>
      </div>
      <div className="p-4 lg:w-1/3 w-full">
        <div className="h-full p-6 rounded-lg border-2 border-slate-100 bg-red-600 flex flex-col relative overflow-hidden">
          <span className="bg-slate-100 px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl flex items-center justify-center"><StarIcon className='w-4 h-4 mr-1'/>POPULAR</span>
          <h2 className="text-lg tracking-widest title-font text-white mb-1 font-bold">DIAMOND</h2>
          <h1 className="text-5xl text-white leading-none pb-4 mb-4 border-b border-gray-200 font-semibold">
            <p class="text-base ml-1 font-normal text-slate-100 line-through">&#8377;899.00</p>
            <p><span className='text-3xl'>&#8377;</span>699.00</p>
          </h1>
          <p className="flex items-center mb-2 text-white">
              <CheckCircleIcon className="w-6 h-6 mr-2 text-gray-900"/>
              6 months Subscriptions
          </p>
          <p className="flex items-center mb-2 text-white">
              <CheckCircleIcon className="w-6 h-6 mr-2 text-gray-900"/>
              15 Image Uploads
          </p>
          <p className="flex items-center mb-2 text-white">
              <CheckCircleIcon className="w-6 h-6 mr-2 text-gray-900"/>
              50 Connections
          </p>
          <span className='mb-3'></span>
          <button className="flex items-center mt-auto text-white bg-gray-900 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
            UPGRADE <ArrowSmallRightIcon className='w-4 h-4 ml-auto'/>
          </button>
          {/*<p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>*/}
        </div>
      </div>
      <div className="p-4 lg:w-1/3 w-full">
        <div className="h-full p-6 rounded-lg border-2 border-gray-900 flex flex-col relative overflow-hidden">
          <h2 className="text-lg tracking-widest title-font mb-1 font-bold">SPECIAL</h2>
          <h1 className="text-5xl text-gray-900 leading-none pb-4 mb-4 border-b border-gray-200 font-semibold">
            <p class="text-base ml-1 font-normal text-gray-500 line-through">&#8377;1299.00</p>
            <p><span className='text-3xl'>&#8377;</span>999.00</p>
          </h1>
          <p className="flex items-center mb-2">
              <CheckCircleIcon className="w-6 h-6 mr-2 text-red-600"/>
              12 months Subscriptions
          </p>
          <p className="flex items-center mb-2">
              <CheckCircleIcon className="w-6 h-6 mr-2 text-red-600"/>
              30 Image Uploads
          </p>
          <p className="flex items-center mb-2">
              <CheckCircleIcon className="w-6 h-6 mr-2 text-red-600"/>
              80 connections
          </p>
          <span className='mb-3'></span>
          <button className="flex items-center mt-auto text-white bg-gray-900 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
            UPGRADE <ArrowSmallRightIcon className='w-4 h-4 ml-auto'/>
          </button>
          {/*<p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>*/}
        </div>
      </div>
    </div>
  </div>
    </section>
  )
}

export default UpgradeAccount