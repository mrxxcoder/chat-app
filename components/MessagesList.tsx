"use client"

import { useMessage } from "@/lib/store/messages"
import Message from "./Message"

const MessagesList = () => {
    const messages = useMessage(state => state.messages)
  return (
    <div className='flex-1 flex flex-col p-5 h-full overflow-y-auto'>
              <div className='flex-1'></div>
              
              <div className='space-y-7'>
                {messages.map((val, index) => <Message key={index} val={val}/>)}



              </div>
          </div>
  )
}

export default MessagesList