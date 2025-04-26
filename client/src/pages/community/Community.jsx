import React, { useState, useEffect, useCallback } from 'react'
import { Search } from 'lucide-react'
import CommunityPost from './community_post'
import Comment from './comment'
import axiosInstance from "../../api/axios";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// Debounce function to limit how often a function can be called
const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [commentsMap, setCommentsMap] = useState({}); // Map postId -> comments
    const [newCommentMap, setNewCommentMap] = useState({}); // Map postId -> new comment text
    const [loadingCommentsMap, setLoadingCommentsMap] = useState({}); // Map postId -> loading state
    const [userId, setUserId] = useState(null);
    const [likedPostsMap, setLikedPostsMap] = useState({}); // Map postId -> liked status
    const [likedCommentsMap, setLikedCommentsMap] = useState({}); // Map commentId -> liked status
    const [sortBy, setSortBy] = useState('created_at');
    const [sortOrder, setSortOrder] = useState('desc');

    // Create a debounced search function
    const debouncedSearch = useCallback(
        debounce(() => {
            setCurrentPage(1);
            fetchPosts();
        }, 500),
        [] // Empty dependency array means this function is created once
    );

    useEffect(() => {
        fetchUserProfile();
        fetchPosts();
    }, [currentPage]);

    useEffect(() => {
        if (userId && posts.length > 0) {
            checkLikedPosts();
            // Check liked comments for all fetched posts
            posts.forEach(post => {
                if (commentsMap[post.id] && commentsMap[post.id].length > 0) {
                    checkLikedComments(commentsMap[post.id]);
                }
            });
        }
    }, [userId, posts, commentsMap]);

    // Trigger search when searchTerm changes
    useEffect(() => {
        if (searchTerm !== '') {
            setIsSearching(true);
            debouncedSearch();
        }
    }, [searchTerm, debouncedSearch]);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(
                `https://viet-cultural-be.vercel.app/api/v1/users/profile`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (response.ok) {
                const data = await response.json();
                if (data && data.id) {
                    setUserId(data.id);
                }
            }
        } catch (err) {
            console.error("Lỗi khi fetch profile:", err);
        }
    };

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/post/get-all-posts', {
                params: {
                    page: currentPage,
                    limit: 10,
                    search: searchTerm,
                    sortBy: sortBy,
                    sortOrder: sortOrder
                }
            });

            const { posts: fetchedPosts, pagination } = response.data || { posts: [], pagination: {} };
            
            setPosts(fetchedPosts);
            setTotalPages(pagination.totalPages || 1);

            // Fetch comments for all posts
            fetchedPosts.forEach(post => {
                // If post already has comments from the API, use those
                if (post.comments && post.comments.length > 0) {
                    setCommentsMap(prev => ({
                        ...prev,
                        [post.id]: post.comments
                    }));
                } else {
                    fetchCommentsForPost(post.id);
                }
            });

            setLoading(false);
            setIsSearching(false);
        } catch (err) {
            console.error("Error fetching posts:", err);
            setError("Không thể tải bài đăng. Vui lòng thử lại sau.");
            setLoading(false);
            setIsSearching(false);
        }
    };

    const checkLikedPosts = async () => {
        try {
            const likedStatusMap = {};

            for (const post of posts) {
                try {
                    const response = await axiosInstance.get(`/post/${post.id}/is-liked`, {
                        params: { userId }
                    });
                    console.log(`Post ${post.id} liked status:`, response.data);
                    likedStatusMap[post.id] = response.data;
                } catch (err) {
                    console.error(`Error checking like status for post ${post.id}:`, err);
                    likedStatusMap[post.id] = false;
                }
            }

            setLikedPostsMap(likedStatusMap);
        } catch (err) {
            console.error("Error checking liked posts:", err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchPosts();
    };

    // Modified input change handler
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setIsSearching(false);
            setCurrentPage(1);
            fetchPosts();
        }
    };

    const fetchCommentsForPost = async (postId) => {
        setLoadingCommentsMap(prev => ({ ...prev, [postId]: true }));
        try {
            const response = await axiosInstance.get(`/comment/post/${postId}`);
            const comments = response.data || [];
            setCommentsMap(prev => ({
                ...prev,
                [postId]: comments
            }));

            if (userId) {
                checkLikedComments(comments);
            }
        } catch (err) {
            console.error("Error fetching comments for post", postId, ":", err);
        } finally {
            setLoadingCommentsMap(prev => ({ ...prev, [postId]: false }));
        }
    };

    const checkLikedComments = async (comments) => {
        try {
            const likedStatusMap = { ...likedCommentsMap };

            for (const comment of comments) {
                try {
                    const response = await axiosInstance.get(`/comment/${comment.id}/is-liked`, {
                        params: { userId }
                    });
                    likedStatusMap[comment.id] = response.data;
                } catch (err) {
                    console.error(`Error checking like status for comment ${comment.id}:`, err);
                    likedStatusMap[comment.id] = false;
                }
            }

            setLikedCommentsMap(likedStatusMap);
        } catch (err) {
            console.error("Error checking liked comments:", err);
        }
    };

    const handleNewCommentChange = (postId, text) => {
        setNewCommentMap(prev => ({
            ...prev,
            [postId]: text
        }));
    };

    const handleAddComment = async (postId) => {
        const commentText = newCommentMap[postId];
        if (!commentText || !commentText.trim()) return;

        if (!userId) {
            toast.error('Vui lòng đăng nhập để bình luận');
            return;
        }

        try {
            await axiosInstance.post(`/comment/create-comment`, {
                content: commentText,
                userId: parseInt(userId),
                postId: parseInt(postId),
                parentId: null
            });

            // Clear comment input
            setNewCommentMap(prev => ({
                ...prev,
                [postId]: ''
            }));

            toast.success('Bình luận đã được thêm');

            // Refresh comments for this post
            fetchCommentsForPost(postId);
            fetchPosts();
        } catch (err) {
            console.error("Error adding comment:", err);
            toast.error('Không thể thêm bình luận. Vui lòng thử lại sau.');
        }
    };

    const handleLikePost = async (postId) => {
        if (!userId) {
            toast.error('Vui lòng đăng nhập để thích bài viết');
            return;
        }

        try {
            // Update UI optimistically
            setLikedPostsMap(prev => ({
                ...prev,
                [postId]: true
            }));
            
            // Update post's like count in place
            setPosts(prevPosts => 
                prevPosts.map(post => 
                    post.id === postId 
                        ? { ...post, likeCount: (post.likeCount || 0) + 1 } 
                        : post
                )
            );

            // Send API request in background
            await axiosInstance.post(`/post/like`, {
                postId,
                userId: parseInt(userId)
            });

            toast.success('Đã thích bài viết');
            fetchPosts();
        } catch (err) {
            console.error("Error liking post:", err);
            
            // Revert optimistic updates on error
            setLikedPostsMap(prev => ({
                ...prev,
                [postId]: false
            }));
            
            // Revert like count
            setPosts(prevPosts => 
                prevPosts.map(post => 
                    post.id === postId 
                        ? { ...post, likeCount: (post.likeCount || 1) - 1 } 
                        : post
                )
            );
            
            toast.error('Không thể thích bài đăng. Vui lòng thử lại sau.');
        }
    };

    const handleUnlikePost = async (postId) => {
        if (!userId) {
            return;
        }

        try {
            // Update UI optimistically
            setLikedPostsMap(prev => ({
                ...prev,
                [postId]: false
            }));
            
            // Update post's like count in place
            setPosts(prevPosts => 
                prevPosts.map(post => 
                    post.id === postId 
                        ? { ...post, likeCount: Math.max((post.likeCount || 1) - 1, 0) } 
                        : post
                )
            );

            // Send API request in background
            await axiosInstance.post(`/post/like`, {
                postId,
                userId: parseInt(userId)
            });

            toast.success('Đã bỏ thích bài viết');
            fetchPosts();
        } catch (err) {
            console.error("Error unliking post:", err);
            
            // Revert optimistic updates on error
            setLikedPostsMap(prev => ({
                ...prev,
                [postId]: true
            }));
            
            // Revert like count
            setPosts(prevPosts => 
                prevPosts.map(post => 
                    post.id === postId 
                        ? { ...post, likeCount: (post.likeCount || 0) + 1 } 
                        : post
                )
            );
            
            toast.error('Không thể bỏ thích bài đăng. Vui lòng thử lại sau.');
        }
    };

    const handleLikeComment = async (postId, commentId) => {
        if (!userId) {
            toast.error('Vui lòng đăng nhập để thích bình luận');
            return;
        }

        try {
            // Update UI optimistically
            setLikedCommentsMap(prev => ({
                ...prev,
                [commentId]: true
            }));
            
            // Update comment like count in place
            setCommentsMap(prev => ({
                ...prev,
                [postId]: prev[postId].map(comment => 
                    comment.id === commentId 
                        ? { ...comment, likes: (comment.likes || 0) + 1 } 
                        : comment
                )
            }));

            // Send API request in background
            await axiosInstance.post(`/comment/like-comment/${commentId}`, {
                userId: parseInt(userId)
            });

            toast.success('Đã thích bình luận');
            fetchPosts();
        } catch (err) {
            console.error("Error liking comment:", err);
            
            // Revert optimistic updates on error
            setLikedCommentsMap(prev => ({
                ...prev,
                [commentId]: false
            }));
            
            // Revert comment like count
            setCommentsMap(prev => ({
                ...prev,
                [postId]: prev[postId].map(comment => 
                    comment.id === commentId 
                        ? { ...comment, likes: Math.max((comment.likes || 1) - 1, 0) } 
                        : comment
                )
            }));
            
            toast.error('Không thể thích bình luận. Vui lòng thử lại sau.');
        }
    };

    const handleUnlikeComment = async (postId, commentId) => {
        if (!userId) {
            return;
        }

        try {
            // Update UI optimistically
            setLikedCommentsMap(prev => ({
                ...prev,
                [commentId]: false
            }));
            
            // Update comment like count in place
            setCommentsMap(prev => ({
                ...prev,
                [postId]: prev[postId].map(comment => 
                    comment.id === commentId 
                        ? { ...comment, likes: Math.max((comment.likes || 1) - 1, 0) } 
                        : comment
                )
            }));

            // Send API request in background
            await axiosInstance.post(`/comment/unlike-comment/${commentId}`, {
                userId: parseInt(userId)
            });

            toast.success('Đã bỏ thích bình luận');
            fetchPosts();
        } catch (err) {
            console.error("Error unliking comment:", err);
            
            // Revert optimistic updates on error
            setLikedCommentsMap(prev => ({
                ...prev,
                [commentId]: true
            }));
            
            // Revert comment like count
            setCommentsMap(prev => ({
                ...prev,
                [postId]: prev[postId].map(comment => 
                    comment.id === commentId 
                        ? { ...comment, likes: (comment.likes || 0) + 1 } 
                        : comment
                )
            }));
            
            toast.error('Không thể bỏ thích bình luận. Vui lòng thử lại sau.');
        }
    };

    const PaginationButton = ({ number, active }) => (
        <button
            className={`px-3 py-1 rounded ${active ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setCurrentPage(typeof number === 'number' ? number : (number === '<' ? currentPage - 1 : currentPage + 1))}
            disabled={(number === '<' && currentPage === 1) || (number === '>' && currentPage === totalPages)}
        >
            {number}
        </button>
    );

    return (
        <div className="min-h-screen bg-[url('/bg/bg3.png')] bg-cover bg-center">
            <div className="container mx-auto py-8 px-4">
                <div className="bg-white rounded-lg p-6 mb-8 max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Bạn đang tìm kiếm điều gì?"
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                            />
                            {isSearching && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <div className="w-4 h-4 border-t-2 border-green-500 border-r-2 rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>
                        <Link to="/community/create-post">
                            <button className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2">+ Bài đăng mới</button>
                        </Link>
                    </div>

                    {/* Loading and Error states */}
                    {loading && <div className="text-center py-10">Đang tải bài đăng...</div>}
                    {error && <div className="text-center text-red-500 py-10">{error}</div>}

                    {/* Forum posts */}
                    {!loading && !error && posts.length === 0 && (
                        <div className="text-center py-10">Không có bài đăng nào. Hãy là người đầu tiên đăng bài!</div>
                    )}

                    {!loading && !error && posts.map((post) => (
                        <div key={post.id} className="mb-8">
                            <CommunityPost
                                avatar={post.user?.avatar || "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"}
                                author={post.user?.full_name || "Người dùng ẩn danh"}
                                title={post.title}
                                content={post.question || ""}
                                tags={post.tags || ["Ứng dụng"]}
                                likes={post.likeCount || 0}
                                comments={(commentsMap[post.id]?.length) || 0}
                                shares={post.shares || 0}
                                image={post.imageUrl}
                                isLiked={likedPostsMap[post.id] || false}
                                created_at={post.created_at}
                                onLike={() => likedPostsMap[post.id].liked ? handleUnlikePost(post.id) : handleLikePost(post.id)} />

                            {/* Comments section for this post */}
                            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-800 mb-4">
                                    {(commentsMap[post.id]?.length || 0) > 0
                                        ? `${commentsMap[post.id]?.length} bình luận`
                                        : "Chưa có bình luận"}
                                </h3>

                                {loadingCommentsMap[post.id] && (
                                    <div className="text-center py-2">Đang tải bình luận...</div>
                                )}

                                {!loadingCommentsMap[post.id] && commentsMap[post.id]?.map((comment) => (
                                    <Comment
                                        key={comment.id}
                                        avatar={comment.user?.avatar || "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"}
                                        author={comment.user?.full_name || "Người dùng ẩn danh"}
                                        content={comment.content}
                                        likes={comment.likes || 0}
                                        isLiked={likedCommentsMap[comment.id] || false}
                                        onLike={() => likedCommentsMap[comment.id]
                                            ? handleUnlikeComment(post.id, comment.id)
                                            : handleLikeComment(post.id, comment.id)}
                                        replies={comment.replies || []}
                                    />
                                ))}

                                {/* Add comment form */}
                                <div className="mt-4 flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-full bg-green-400 flex-shrink-0"></div>
                                    <div className="w-full">
                                        <div className="bg-gray-100 rounded-lg p-3">
                                            <textarea
                                                className="w-full bg-transparent focus:outline-none resize-none"
                                                placeholder="Viết bình luận của bạn ở đây!"
                                                value={newCommentMap[post.id] || ''}
                                                onChange={(e) => handleNewCommentChange(post.id, e.target.value)}
                                                rows={2}
                                            ></textarea>
                                        </div>
                                        <div className="flex justify-end mt-2">
                                            <button
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md"
                                                onClick={() => handleAddComment(post.id)}
                                            >
                                                Gửi
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 my-6"></div>
                        </div>
                    ))}

                    {/* Pagination */}
                    {!loading && !error && posts.length > 0 && (
                        <div className="flex justify-center mt-8 space-x-2">
                            <PaginationButton number="<" active={false} />
                            {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                                <PaginationButton key={i} number={i + 1} active={currentPage === i + 1} />
                            ))}
                            {totalPages > 5 && currentPage < totalPages - 2 && <span className="px-2">...</span>}
                            {totalPages > 5 && <PaginationButton number={totalPages} active={currentPage === totalPages} />}
                            <PaginationButton number=">" active={false} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Community