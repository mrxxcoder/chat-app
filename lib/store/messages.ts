import { create } from 'zustand'

export type Imessage = {
    created_at: string;
    id: string;
    is_edit: boolean;
    sent_by: string;
    text: string;
    users: {
        avatar_url: string;
        created_at: string;
        display_name: string;
        id: string;
    } | null;
}

interface MessageState {
  messages: Imessage[]
  optimisticIds: string[]
  addMessage: (message: Imessage) => void
  actionMessage: Imessage | undefined
  deleteMessage: (id: string) => void
  setActionMessage: (message: Imessage | undefined) => void
  editMessage: (updateMessage: Imessage) => void
  setOptimisticIds: (id: string) => void
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  optimisticIds: [],
  addMessage: (newMessage) => set((state) => ({
     messages: [...state.messages, newMessage],
    })),
  deleteMessage: (id) => set((state) => ({ messages: state.messages.filter((message) => message.id !== id) })),
  actionMessage: undefined,
  setActionMessage: (message) => set(() => ({ actionMessage: message })),
  setOptimisticIds: (id: string) => set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
  // editMessage: (id, text, is_edit) => set((state) => ({
  //   messages: state.messages.map((message) =>
  //     message.id === id ? { ...message, text, is_edit: is_edit } : message
  //   )
  // }))
  editMessage: (updateMessage) => set((state) => {
    return {
      messages: state.messages.filter(
        message => {
          if(message.id === updateMessage.id) {
            message.text = updateMessage.text
            message.is_edit = updateMessage.is_edit
          }
          return message
        }
      )
    }
  })
}))
