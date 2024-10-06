import React, { Suspense } from 'react'
import MessagesList from './MessagesList'
import { createClient } from '@/lib/supabase/server'
import InitMessages from '@/lib/store/InitMessages'

const ChatMessages = async () => {
    const supabase = createClient()
    const {data} = await supabase.from('messages').select('*, users(*)')
    console.log(data)
  return (
    <Suspense fallback={'Loading...'}>
        <MessagesList />
        <InitMessages messages={data || []}/>
    </Suspense>
  )
}

export default ChatMessages