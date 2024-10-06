
import ChatHeader from '@/components/ChatHeader'
import ChatInput from '@/components/ChatInput'
import ChatMessages from '@/components/ChatMessages'
import InitUser from '@/lib/store/InitUser'
import { createClient } from '@/lib/supabase/server'

import React from 'react'

const page = async () => {
  const supabase = createClient()
  const {data} = await supabase.auth.getUser()
  
  return (
    <>
      <div className='h-screen max-w-3xl mx-auto md:py-10'>
        <div className='h-full border rounded-md flex flex-col'>
          <ChatHeader user={data?.user}/>
          <ChatMessages />
          <ChatInput />
          
        </div>
      </div>

      <InitUser user={data?.user}/>
    </>
  )
}

export default page