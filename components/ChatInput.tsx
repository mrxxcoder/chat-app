"use client"
import React from 'react'
import { Input } from './ui/input'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useUser } from '@/lib/store/user'
import { v4 as uuidv4 } from 'uuid';
import { Imessage, useMessage } from '@/lib/store/messages'

const ChatInput = () => {
    const supabase = createClient()
    const user = useUser(state => state.user)
    const addMessage = useMessage(state => state.addMessage)

    const handleSendMessage = async (text: string) => {
        const newMessage = {
          id: uuidv4(),
          text,
          sent_by: user?.id,
          created_at: new Date().toISOString(),
          is_edit: false,
          users: {
            id: user?.id,
            avatar_url: user?.user_metadata?.avatar_url,
            created_at: new Date().toISOString(),
            display_name: user?.user_metadata?.user_name
          }
        }
        addMessage(newMessage as Imessage)
        const {error} = await supabase.from("messages").insert({text})
        if(error) {
            toast.error(error.message)
        }
    }
  return (
    <div className='p-5'>
              <Input onKeyDown={(e) => {
                if(e.key === 'Enter'){
                    if(e.currentTarget.value.trim() === '') {
                        toast.error('Message cannot be empty')
                        return
                    }
                    handleSendMessage(e.currentTarget.value)
                    e.currentTarget.value = ''
                }
              }} className='w-full h-full' placeholder='Type a message...'/>
    </div>
  )
}

export default ChatInput