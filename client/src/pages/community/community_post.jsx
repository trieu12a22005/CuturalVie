import React from 'react'

const CommunityPost = ({ avatar, author, title, content, tags, likes, comments, shares, image, onLike }) => {
    return (
        <div className="mb-6 cursor-pointer hover:bg-gray-50 rounded-lg p-3 transition-colors">
            <div className="flex items-start gap-3 mb-2">
                <img src={avatar || "/placeholder.svg"} alt={author} width={50} height={50} className="rounded-full" />
                <div>
                    <h2 className="font-bold text-lg">{title}</h2>
                    <p className="text-sm text-gray-600">
                        Viết bởi: <span className="text-green-600">{author}</span>
                    </p>
                </div>
                {image ? (
                    <div className="ml-auto">
                        <div className="text-xs text-gray-500 text-right mb-1">3 giờ trước</div>
                        <img src={image || "/placeholder.svg"} alt={title} width={150} height={100} className="rounded-lg" />
                    </div>
                ) : (
                    <div className="ml-auto text-xs text-gray-500">2 giờ trước</div>
                )}
            </div>

            <p className="text-gray-700 mb-3">{content}</p>

            <div className="flex flex-wrap gap-2 mb-3">
                {tags && tags.map((tag, index) => (
                    <span
                        key={index}
                        className={`px-3 py-1 text-xs rounded-full ${tag === "Ứng dụng" ? "bg-red-800 text-white" : "bg-orange-400 text-white"
                            }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center text-sm text-gray-600 space-x-4">
                <span 
                    className="flex items-center cursor-pointer hover:text-green-600"
                    onClick={(e) => {
                        e.stopPropagation();
                        onLike && onLike();
                    }}
                >
                    <svg fill="#000000" width="18" height="18" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="mr-1"><title>ionicons-v5-f</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm74.69,252.82c-9.38,11.44-26.4,29.73-65.7,56.41a15.93,15.93,0,0,1-18,0c-39.3-26.68-56.32-45-65.7-56.41-20-24.37-29.58-49.4-29.3-76.5.31-31.06,25.22-56.33,55.53-56.33,20.4,0,35,10.63,44.1,20.41a6,6,0,0,0,8.72,0c9.11-9.78,23.7-20.41,44.1-20.41,30.31,0,55.22,25.27,55.53,56.33C360.27,251.42,350.68,276.45,330.69,300.82Z" /></svg>
                    <span className="text-base font-semibold">{likes} yêu thích</span>
                </span>
                <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    {comments} thảo luận
                </span>
                <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                    </svg>
                    {shares} chia sẻ
                </span>
            </div>
        </div>
    )
}

export default CommunityPost