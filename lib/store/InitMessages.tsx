'use client'
import { useEffect, useRef } from "react"
import { Imessage, useMessage } from "./messages"

const InitMessages = ({messages}: {messages: Imessage[]}) => {
    const init = useRef(false)

    useEffect(() => {
        if(!init.current) {
            useMessage.setState({messages})
        }

        init.current = true

        // eslint-disable-next-line
    }, [])
  return (
    <></>
  )
}

export default InitMessages