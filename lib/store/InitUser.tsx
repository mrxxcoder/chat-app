'use client'

import { User } from "@supabase/supabase-js"
import { useEffect, useRef } from "react"
import { useUser } from "./user"

const InitUser = ({user}: {user: User | null}) => {
    const init = useRef(false)

    useEffect(() => {
        if(!init.current) {
            useUser.setState({user})
        }

        init.current = true

        // eslint-disable-next-line
    }, [])
  return (
    <></>
  )
}

export default InitUser