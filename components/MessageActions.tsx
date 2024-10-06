import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useMessage } from "@/lib/store/messages"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useEffect, useState } from "react"
  
  export function DeleteAlert() {
    const deleteMessage = useMessage(state => state.deleteMessage)
    const actionMessage = useMessage(state => state.actionMessage)
    const supabase = createClient()
    const handleDeleteMessage = async () => {
      if(actionMessage) {

        const {error} = await supabase.from('messages').delete().eq('id', actionMessage?.id)
        toast.success('Message deleted suiccessfully')
        deleteMessage(actionMessage?.id)
        if(error) {
          toast.error(error.message)
        }
      }
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button id="trigger-delete"></button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMessage}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }


  export function EditDialog() {
    const actionMessage = useMessage(state => state.actionMessage)
    const [message, setMessage] = useState('')
    const supabase = createClient()
    const editMessage = useMessage(state => state.editMessage)
    const handleEditMessage = async () => {
      if(message) {

        if(actionMessage) {
          const {error} = await supabase.from('messages').update({text: message, is_edit: true}).eq('id', actionMessage?.id)
          toast.success('Message updated successfully')
          editMessage({
          ...actionMessage,
          text: message,
          is_edit: true
        })
        document.getElementById('trigger-edit')?.click()
        if(error) {
          toast.error(error.message)
        }
      }
    } else {
      document.getElementById('trigger-edit')?.click()
      document.getElementById('trigger-delete')?.click()
    }
  }

    useEffect(() => {
      if(actionMessage) {
        setMessage(actionMessage.text)
      }
    }, [actionMessage])

    return (
      <Dialog>
        <DialogTrigger asChild>
          <button id="trigger-edit"></button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>
            <DialogDescription>
              Make changes to your message here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <div className="flex">
              
              <Input
                name="message"
                value={message}
                id="message"
                onChange={(e) => setMessage(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" type="submit" onClick={handleEditMessage}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }