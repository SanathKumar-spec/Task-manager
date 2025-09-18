import React from 'react'

export default function Sidebar() {
    return (
        <div>
            <aside className="w-64 bg-white border-r h-[calc(100vh-1rem)] fixed top-17">
                <nav className="p-4">
                    <div className="mb-8">
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Workspace</h2>
                        <button className="w-full bg-blue-50 text-blue-700 font-medium py-2 px-3 rounded-lg text-left mb-2">
                            <i className="fas fa-home mr-2"></i>My Tasks
                        </button>
                        <button className="w-full hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-left mb-2">
                            <i className="fas fa-users mr-2"></i>Team Tasks
                        </button>
                        <button className="w-full hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-left">
                            <i className="fas fa-calendar mr-2"></i>Calendar
                        </button>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Projects</h2>
                        <button className="w-full hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-left mb-2">
                            <i className="fas fa-briefcase mr-2"></i>Website Redesign
                        </button>
                        <button className="w-full hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-left mb-2">
                            <i className="fas fa-briefcase mr-2"></i>Marketing Campaign
                        </button>
                        <button className="w-full hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-left">
                            <i className="fas fa-briefcase mr-2"></i>Product Launch
                        </button>
                    </div>

                    <div>
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Teams</h2>
                        <div className="space-y-2">
                            <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/05147380-2a35-420e-bda0-c0352f9fa54a.png" alt="Development team avatar with code symbols and blue theme" className="h-6 w-6 rounded mr-2" />
                                <span className="text-sm">Development</span>
                            </div>
                            <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/522bde8f-4b88-43f3-8128-e4129e07b429.png" alt="Design team avatar with creative tools and purple theme" className="h-6 w-6 rounded mr-2" />
                                <span className="text-sm">Design</span>
                            </div>
                            <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/941b0fcf-2528-494c-880f-2d181ad882b9.png" alt="Marketing team avatar with megaphone and green theme" className="h-6 w-6 rounded mr-2" />
                                <span className="text-sm">Marketing</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </div>
    )
}
