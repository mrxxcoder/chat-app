import { Imessage } from '@/lib/store/messages'
import Image from 'next/image'
import React from 'react'

const Message = ({val} : {val: Imessage}) => {
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
                      </div>
                      <p className='text-gray-300'>{val?.text}</p>
                    </div>
    </div>
  )
}

export default Message