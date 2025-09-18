import React from 'react'

export default function Main() {
    return (
        <div>
            <main className="flex-1 p-6 border-red-500 ml-70">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
                            <p className="text-gray-600">Manage your tasks and collaborate with your team</p>
                        </div>
                        <button onclick="openTaskModal()" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center">
                            <i className="fas fa-plus mr-2"></i>New Task
                        </button>
                    </div>

                    <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                        <div className="flex flex-wrap gap-4">
                            <select className="border border-gray-300 rounded px-3 py-2">
                                <option>All Tasks</option>
                                <option>Completed</option>
                                <option>Pending</option>
                                <option>Overdue</option>
                            </select>
                            <select className="border border-gray-300 rounded px-3 py-2">
                                <option>Sort by Due Date</option>
                                <option>Sort by Priority</option>
                                <option>Sort by Title</option>
                            </select>
                            <select className="border border-gray-300 rounded px-3 py-2">
                                <option>All Projects</option>
                                <option>Website Redesign</option>
                                <option>Marketing Campaign</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="task-card bg-white rounded-lg shadow-sm p-4 priority-high">
                            <div className="flex justify-between items-start mb-3">
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">High Priority</span>
                                <div className="flex space-x-2">
                                    <button onclick="editTask(1)" className="text-gray-400 hover:text-blue-600">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteTask(1)" className="text-gray-400 hover:text-red-600">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Complete project proposal</h3>
                            <p className="text-gray-600 text-sm mb-3">Finalize the project proposal document and send to client for review</p>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm text-red-600 font-medium">
                                    <i className="fas fa-clock mr-1"></i>Today, 3:00 PM
                                </span>
                                <div className="flex -space-x-2">
                                    <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7e226524-4dd5-44c8-8b47-f1a3e53f83eb.png" alt="Team member John with professional headshot" className="h-7 w-7 rounded-full border-2 border-white" />
                                    <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/494c2069-0b9c-440d-96d0-2ce2bba721a0.png" alt="Team member Maria with smiling portrait" className="h-7 w-7 rounded-full border-2 border-white" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Project: Website Redesign</span>
                                <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                                    Mark Complete
                                </button>
                            </div>
                        </div>

                        <div className="task-card bg-white rounded-lg shadow-sm p-4 priority-medium">
                            <div className="flex justify-between items-start mb-3">
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Medium Priority</span>
                                <div className="flex space-x-2">
                                    <button onclick="editTask(2)" className="text-gray-400 hover:text-blue-600">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteTask(2)" className="text-gray-400 hover:text-red-600">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Review marketing materials</h3>
                            <p className="text-gray-600 text-sm mb-3">Check all marketing collateral for the upcoming campaign launch</p>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm text-orange-600 font-medium">
                                    <i className="fas fa-clock mr-1"></i>Tomorrow, 10:00 AM
                                </span>
                                <div className="flex -space-x-2">
                                    <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0a7acbd5-1e6b-4aad-8d50-c2951cb08ba1.png" alt="Team member David with confident expression" className="h-7 w-7 rounded-full border-2 border-white" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Project: Marketing Campaign</span>
                                <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                                    Mark Complete
                                </button>
                            </div>
                        </div>

                        <div className="task-card bg-white rounded-lg shadow-sm p-4 priority-low completed">
                            <div className="flex justify-between items-start mb-3">
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Low Priority</span>
                                <div className="flex space-x-2">
                                    <button onclick="editTask(3)" className="text-gray-400 hover:text-blue-600">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteTask(3)" className="text-gray-400 hover:text-red-600">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2 line-through">Update documentation</h3>
                            <p className="text-gray-600 text-sm mb-3 line-through">Update user documentation with new features</p>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm text-green-600 font-medium">
                                    <i className="fas fa-check-circle mr-1"></i>Completed
                                </span>
                                <div className="flex -space-x-2">
                                    <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ae3f39e1-74f0-4ed0-b0ec-8c534a373df0.png" alt="Team member Lisa with professional smile" className="h-7 w-7 rounded-full border-2 border-white" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Project: Product Launch</span>
                                <button className="text-gray-600 text-sm font-medium hover:text-gray-800">
                                    Reopen Task
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Team Collaboration</h2>
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold">Recent Team Activity</h3>
                                <button className="text-blue-600 text-sm font-medium">View All</button>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8024d12e-162a-4f6a-858d-66dd8508cc63.png" alt="Team member Alex with profile picture" className="h-10 w-10 rounded-full" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-800"><span className="font-medium">Alex Chen</span> assigned a new task: "Review client feedback"</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/087f01bf-a994-418c-8d9b-c58c16b68fdf.png" alt="Team member Maria with professional photo" className="h-10 w-10 rounded-full" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-800"><span className="font-medium">Maria Rodriguez</span> completed task: "Finalize design mockups"</p>
                                        <p className="text-xs text-gray-500">5 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}
