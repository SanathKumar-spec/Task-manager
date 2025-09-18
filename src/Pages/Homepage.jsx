import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function Homepage() {
    return (
        <div>
            <div className='fixed w-full'>
                <Header />
            </div>
            <div className='flex top-10'>
                <Sidebar />
                <div className="mt-80 text-3xl font-bold flex-1 p-4 flex items-center justify-center ml-70">
                    <h1>The Website Is Under Construction</h1>
                </div>
            </div>
        </div>
    )
}
