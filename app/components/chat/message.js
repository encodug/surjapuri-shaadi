import Image from 'next/image'

function ChatMessage({reciever = false, message}) {
  return (
    <div className={`flex space-x-5 items-center mb-2 w-full ${reciever ? 'justify-start' : 'justify-end'}`}>
        <div className='flex flex-col'>
            <div className="w-10 h-10 rounded-full relative overflow-hidden mb-1">
                <Image src="https://dummyimage.com/30x30" alt="Dummy Image" fill className="object-cover object-center"/>
            </div>
        </div>
        <div className={`max-w-xs rounded-r-lg rounded-bl-lg p-2 ${reciever ? 'bg-slate-300' : 'bg-red-600 text-white'}`}>
            <p>{message}</p>
        </div>
    </div>
  )
}

export default ChatMessage