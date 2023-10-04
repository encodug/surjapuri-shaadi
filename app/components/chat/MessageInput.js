import { useAuth } from "@/app/(auth)/useAuth";
import { db } from "@/app/lib/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Timestamp, arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react"


function ChatMessageInput({user, connectionId}) {
    const [message, setMessage] = useState('');


    const handleInputChange = (e) => {
        setMessage(e.target.value);
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        const messagesRef = doc(db, 'chatroom', connectionId);
        try{
            updateDoc(messagesRef, {
                messages: arrayUnion({
                    messageText: message,
                    sender_id: user.uid,
                    created_at: Timestamp.now().toMillis(),
                })
            });
            setMessage('');
        } catch(error) {
            console.error('Error adding message:', error);
        }
        
    }

  return (
    <div className="w-full flex space-x-2">
        <input type="text" className="flex-1 bg-slate-200 rounded-lg border-0 p-1.5 w-full" placeholder="Aa" value={message} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
        <button type="submit" onClick={handleSubmit} className="text-red-600 hover:bg-red-300 rounded p-1 hover:text-gray-900"><PaperAirplaneIcon className="w-6 h-6"/></button>
    </div>
  )
}

export default ChatMessageInput