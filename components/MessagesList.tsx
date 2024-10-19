"use client"

import { Imessage, useMessage } from "@/lib/store/messages"
import Message from "./Message"
import { DeleteAlert, EditDialog } from "./MessageActions"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useRef } from "react"
import { toast } from "sonner"

const MessagesList = () => {
    const {messages, addMessage, optimisticIds, deleteMessage, editMessage} = useMessage(state => state)
    const supabase = createClient()
    const messageEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages])

    useEffect(() => {
      const channel = supabase
      .channel('chat-room')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' },
        async payload => {
          if (!optimisticIds.includes(payload.new.id)) {
						const { error, data } = await supabase
							.from("users")
							.select("*")
							.eq("id", payload.new.sent_by)
							.single();
						if (error) {
							toast.error(error.message);
						} else {
							const newMessage = {
								...payload.new,
								users: data,
							};
							addMessage(newMessage as Imessage);
						}
					}
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, payload => {
        console.log(payload)
        deleteMessage(payload.old.id)
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, async payload => {
        console.log(payload)
        const { error, data } = await supabase
        .from("users")
        .select("*")
        .eq("id", payload.new.sent_by)
        .single();
      if (error) {
        toast.error(error.message);
      } else {
        const newMessage = {
          ...payload.new,
          users: data,
        };
        editMessage(newMessage as Imessage);
      }
      })
      .subscribe()


      return () => {
        channel.unsubscribe()
      }
    }, [messages])
  return (
    <div className='flex-1 flex flex-col p-5 h-full overflow-y-auto'>
              <div className='flex-1'></div>

              <div className='space-y-7'>
                {messages.map((val, index) => <Message key={index} val={val}/>)}
                <div ref={messageEndRef} />


              </div>
              <DeleteAlert />
              <EditDialog />
          </div>
  )
}

export default MessagesList