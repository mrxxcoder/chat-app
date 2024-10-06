"use client"
import React from 'react'
import { Input } from './ui/input'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

const ChatInput = () => {
    const supabase = createClient()

    const handleSendMessage = async (text: string) => {
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