import { Imessage, useMessage } from '@/lib/store/messages'
import Image from 'next/image'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useUser } from '@/lib/store/user'


const Message = ({val} : {val: Imessage}) => {
  const user = useUser(state => state.user)
  
  
  return (
    <div className='flex gap-2' >
                    <div>

        
                    <Image 
                        src={val?.users?.avatar_url || ''} 
                        alt={val?.users?.display_name || ''} 
                        width={40}
                        height={40}
                        className='rounded-full object-cover'
                    />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-1 '>
                        <h1 className='font-bold'>{val?.users?.display_name}</h1>
                        <h2 className='text-sm font-normal text-gray-400'>{new Date(val?.created_at).toDateString()}</h2>
                        <span className='text-xs font-normal text-gray-400'>{val?.is_edit ? '(Edited)' : ''}</span>
                      </div>
                      <p className='text-gray-300'>{val?.text}</p>
                    </div>
                    <div className='ml-auto'>
                      {val.users?.id === user?.id && <MessageMenu message={val}/>}
                      
                    </div>
    </div>
  )
}

export default Message


const MessageMenu = ({message} : {message: Imessage}) => {

  const setActionMessage = useMessage(state => state.setActionMessage)

  return <DropdownMenu>
  <DropdownMenuTrigger>
    <EllipsisVertical />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => {
      document.getElementById('trigger-edit')?.click()
      setActionMessage(message)
    }}>Edit</DropdownMenuItem>

    <DropdownMenuItem onClick={() => {
      document.getElementById('trigger-delete')?.click()
      setActionMessage(message)
    }}>Delete</DropdownMenuItem>

  </DropdownMenuContent>
</DropdownMenu>
}