import { Dialog, Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Fragment } from "react";


function Lightbox({currentIndex, setCurrentIndex, images, isOpen, setIsOpen}) {

    const gotoPrevious = () => {
        currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(images.length - 1);
    }

    const gotoNext = () => {
        currentIndex + 1 < images.length ? setCurrentIndex(currentIndex + 1) : setCurrentIndex(0);
    }
  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                 <div className="fixed inset-0 bg-black bg-opacity-75" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex h-screen items-center justify-center p-6 text-center overflow-hidden">
                    <Transition.Child
                    as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-auto h-full transform transition-all flex items-center space-x-2">
                            <ChevronLeftIcon className="w-8 h-8 text-white cursor-pointer" onClick={gotoPrevious}/>
                            <Image src={images[currentIndex].photoUrl} width={768} height={500} className="w-full h-auto md:h-full md:w-auto"/>
                            <ChevronRightIcon className="w-8 h-8 text-white cursor-pointer" onClick={gotoNext}/>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
  )
}

export default Lightbox