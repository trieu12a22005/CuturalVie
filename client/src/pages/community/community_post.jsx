import React, { useState, useRef } from 'react'
import { MoreVertical } from 'lucide-react'

// Hàm để định dạng thời gian
const formatTimeAgo = (dateString) => {
    if (!dateString) return "Không xác định";

    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
        return "Vừa xong";
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} phút trước`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} giờ trước`;
    } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ngày trước`;
    } else if (diffInSeconds < 2592000) {
        const weeks = Math.floor(diffInSeconds / 604800);
        return `${weeks} tuần trước`;
    } else if (diffInSeconds < 31536000) {
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months} tháng trước`;
    } else {
        const years = Math.floor(diffInSeconds / 31536000);
        return `${years} năm trước`;
    }
};

const CommunityPost = ({
    avatar, author, title, content, tags, likes, comments, shares, image, onLike, isLiked, created_at,
    postId, userId, ownerId, onEdit, onDelete
}) => {
    const timeAgo = formatTimeAgo(created_at);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu if clicked outside
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    // Generate a color class for each tag based on its index for diversity
    const tagColors = [
        "bg-red-800 text-white",
        "bg-orange-400 text-white",
        "bg-green-500 text-white",
        "bg-blue-500 text-white",
        "bg-purple-500 text-white",
        "bg-pink-500 text-white",
        "bg-yellow-500 text-black",
        "bg-teal-500 text-white",
        "bg-indigo-500 text-white",
        "bg-gray-500 text-white"
    ];

    return (
        <div className="mb-6 cursor-pointer hover:bg-gray-50 rounded-lg p-3 transition-colors relative">
            <div className='flex flex-row justify-between gap-2'>
                <div className="flex items-start gap-3 mb-2">
                    <img src={avatar || "/placeholder.svg"} alt={author} width={50} height={50} className="rounded-full object-cover aspect-square" />
                    <div>
                        <h2 className="font-bold text-lg">{title}</h2>
                        <p className="text-sm text-gray-600">
                            Viết bởi: <span className="text-green-600">{author}</span>
                        </p>
                    </div>
                </div>
                <div className='flex flex-row gap-8'>
                    {image ? (
                        <div className="ml-auto">
                            <div className="text-xs text-gray-500 text-right mb-1">{timeAgo}</div>
                            <img src={image || "/placeholder.svg"} alt={title} width={150} height={100} className="rounded-lg" />
                        </div>
                    ) : (
                        <div className="ml-auto text-xs text-gray-500">{timeAgo}</div>
                    )}
                    {/* Three-dot menu for owner */}
                    {userId && ownerId && userId === ownerId && (
                        <div className="ml-auto relative" ref={menuRef}>
                            <button
                                className="p-2 rounded-full hover:bg-gray-200"
                                onClick={e => { e.stopPropagation(); setMenuOpen(v => !v); }}
                            >
                                <MoreVertical size={20} />
                            </button>
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-20">
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        onClick={e => { e.stopPropagation(); setMenuOpen(false); onEdit && onEdit(postId); }}
                                    >Sửa bài</button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                        onClick={e => { e.stopPropagation(); setMenuOpen(false); onDelete && onDelete(postId); }}
                                    >Xóa bài</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>


            <p className="text-gray-700 mb-3">{content}</p>

            <div className="flex flex-wrap gap-2 mb-3">
                {tags && tags.map((tag, index) => (
                    <span
                        key={index}
                        className={`px-3 py-1 text-xs rounded-full ${tagColors[index % tagColors.length]}`}
                    >
                        {tag.name}
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
                    <svg
                        fill={isLiked ? "#ff0000" : "#000000"}
                        width="18"
                        height="18"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1"
                    >
                        <title>ionicons-v5-f</title>
                        <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm74.69,252.82c-9.38,11.44-26.4,29.73-65.7,56.41a15.93,15.93,0,0,1-18,0c-39.3-26.68-56.32-45-65.7-56.41-20-24.37-29.58-49.4-29.3-76.5.31-31.06,25.22-56.33,55.53-56.33,20.4,0,35,10.63,44.1,20.41a6,6,0,0,0,8.72,0c9.11-9.78,23.7-20.41,44.1-20.41,30.31,0,55.22,25.27,55.53,56.33C360.27,251.42,350.68,276.45,330.69,300.82Z" />
                    </svg>
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
            </div>
        </div>
    )
}

export default CommunityPost