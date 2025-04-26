import React from 'react'

const Comment = ({ avatar, author, content, likes, onLike, isLiked = false, replies = [] }) => {
    return (
        <div className="mb-4">
            <div className="flex items-start gap-3">
                <img src={avatar || "/placeholder.svg"} alt={author} width={40} height={40} className="rounded-full" />
                <div className="flex-1">
                    <h4 className="font-medium text-green-600">{author}</h4>
                    <p className="text-gray-700">{content}</p>
                    <div className="flex items-center mt-1 text-sm">
                        <button 
                            className={`flex items-center mr-3 ${isLiked ? 'text-blue-500' : 'text-gray-500'}`}
                            onClick={onLike}
                        >
                            <svg
                                className="w-4 h-4 mr-1"
                                fill={isLiked ? "currentColor" : "none"}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                ></path>
                            </svg>
                            {likes}
                        </button>
                        <button className="text-blue-500">Phản hồi</button>
                    </div>

                    {replies.map((reply, index) => (
                        <div key={index} className="flex items-start gap-3 mt-3 ml-6">
                            <img
                                src={reply.user?.avatar || "/placeholder.svg"}
                                alt={reply.user?.full_name || "Người dùng ẩn danh"}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <div>
                                <h4 className="font-medium text-green-600">{reply.user?.full_name || "Người dùng ẩn danh"}</h4>
                                <p className="text-gray-700">{reply.content}</p>
                                <div className="flex items-center mt-1 text-sm">
                                    <button className="flex items-center text-gray-500 mr-3">
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                            ></path>
                                        </svg>
                                        {reply.likes || 0}
                                    </button>
                                    <button className="text-blue-500">Phản hồi</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Comment