"use client"
import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from './ui/input'
import { Button } from './ui/button'

function JoinPoll() {
    return (

            <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-[#ff0054]'>Join a Poll</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Join the poll</DialogTitle>
          <DialogDescription>
            Enter the valid room id to join the poll
          </DialogDescription>
        </DialogHeader>
          <div className="grid flex-1 gap-2">
            <Input
                placeholder='1234 5678'
            />
          </div>
          <Button type='button' className='w-fit'>Join Now</Button>
      </DialogContent>
    </Dialog>

    )
}

export default JoinPoll