import React from 'react'

function SideBar() {
    return (
        <div className='h-screen  max-w-80 p-10'>
            <div className='flex flex-col h-full gap-6'>
                <div>Logo</div>
                <div className='flex flex-col gap-3'>
                    <div>Home</div>
                    <div>Create a poll</div>
                    <div>Create a survey</div>
                    <div>Your Polls</div>
                    <div>Your Survey</div>
                </div>
                <div className='flex mt-auto'>
                    <div>Help and support</div>
                </div>
            </div>
        </div>
    )
}

export default SideBar