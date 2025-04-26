import React, { useState, useEffect, useCallback } from 'react'
import { Search } from 'lucide-react'
import CommunityPost from './community_post'
import Comment from './comment'
import axiosInstance from "../../api/axios";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

// Debounce function to limit how often a function can be called
const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
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
    const [commentsMap, setCommentsMap] = useState({});
    const [newCommentMap, setNewCommentMap] = useState({});
    const [loadingCommentsMap, setLoadingCommentsMap] = useState({});
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [likedPostsMap, setLikedPostsMap] = useState({});
    const [likedCommentsMap, setLikedCommentsMap] = useState({});
    const [sortBy] = useState('created_at');
    const [sortOrder] = useState('desc');
    const [filter, setFilter] = useState('all'); // 'all', 'liked', 'mine'
    const [likeLoadingMap, setLikeLoadingMap] = useState({}); // postId -> isLoading

    // Debounced search
    const fetchPosts = useCallback(async () => {
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
            console.log(fetchedPosts);
            setTotalPages(pagination.totalPages || 1);

            // Fetch comments for all posts
            fetchedPosts.forEach(post => {
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
            setError("Không thể tải bài đăng. Vui lòng thử lại sau.");
            setLoading(false);
            setIsSearching(false);
        }
    }, [currentPage, searchTerm, sortBy, sortOrder]);

    const debouncedSearch = useCallback(
        debounce(() => {
            setCurrentPage(1);
            fetchPosts();
        }, 500),
        [fetchPosts]
    );

    useEffect(() => {
        fetchUserProfile();
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [currentPage, fetchPosts]);

    useEffect(() => {
        if (userId && posts.length > 0) {
            checkLikedPosts();
            posts.forEach(post => {
                if (commentsMap[post.id] && commentsMap[post.id].length > 0) {
                    const unchecked = commentsMap[post.id].filter(
                        c => likedCommentsMap[c.id] === undefined
                    );
                    if (unchecked.length > 0) checkLikedComments(unchecked);
                }
            });
        }
        // eslint-disable-next-line
    }, [userId, posts, commentsMap]);

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
                    setUser(data);
                }
            }
        } catch (err) {
            // ignore
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
            // ignore
        } finally {
            setLoadingCommentsMap(prev => ({ ...prev, [postId]: false }));
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
                    likedStatusMap[post.id] = !!response.data.liked;
                } catch (err) {
                    likedStatusMap[post.id] = false;
                }
            }

            setLikedPostsMap(likedStatusMap);
        } catch (err) {
            // ignore
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
                    // Only store the boolean value
                    likedStatusMap[comment.id] = !!response.data.liked;
                } catch (err) {
                    likedStatusMap[comment.id] = false;
                }
            }

            setLikedCommentsMap(likedStatusMap);
        } catch (err) {
            // ignore
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchPosts();
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setIsSearching(false);
            setCurrentPage(1);
            fetchPosts();
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

            setNewCommentMap(prev => ({
                ...prev,
                [postId]: ''
            }));

            toast.success('Bình luận đã được thêm');
            fetchCommentsForPost(postId);
        } catch (err) {
            toast.error('Không thể thêm bình luận. Vui lòng thử lại sau.');
        }
    };

    const handleLikePost = async (postId) => {
        if (!userId) {
            toast.error('Vui lòng đăng nhập để thích bài viết');
            return;
        }
        setLikeLoadingMap(prev => ({ ...prev, [postId]: true }));
        try {
            setLikedPostsMap(prev => ({
                ...prev,
                [postId]: true
            }));
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId
                        ? { ...post, likeCount: (post.likeCount || 0) + 1 }
                        : post
                )
            );
            await axiosInstance.post(`/post/like`, {
                postId,
                userId: parseInt(userId)
            });
            toast.success('Đã thích bài viết');
        } catch (err) {
            setLikedPostsMap(prev => ({
                ...prev,
                [postId]: false
            }));
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId
                        ? { ...post, likeCount: Math.max((post.likeCount || 1) - 1, 0) }
                        : post
                )
            );
            toast.error('Không thể thích bài đăng. Vui lòng thử lại sau.');
        } finally {
            setLikeLoadingMap(prev => ({ ...prev, [postId]: false }));
        }
    };

    const handleUnlikePost = async (postId) => {
        if (!userId) {
            toast.error('Vui lòng đăng nhập để thao tác');
            return;
        }
        setLikeLoadingMap(prev => ({ ...prev, [postId]: true }));
        try {
            setLikedPostsMap(prev => ({
                ...prev,
                [postId]: false
            }));
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId
                        ? { ...post, likeCount: Math.max((post.likeCount || 1) - 1, 0) }
                        : post
                )
            );
            await axiosInstance.post(`/post/like`, {
                postId,
                userId: parseInt(userId)
            });
            toast.success('Đã bỏ thích bài viết');
        } catch (err) {
            setLikedPostsMap(prev => ({
                ...prev,
                [postId]: true
            }));
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId
                        ? { ...post, likeCount: (post.likeCount || 0) + 1 }
                        : post
                )
            );
            toast.error('Không thể bỏ thích bài đăng. Vui lòng thử lại sau.');
        } finally {
            setLikeLoadingMap(prev => ({ ...prev, [postId]: false }));
        }
    };

    const handleLikeComment = async (postId, commentId) => {
        if (!userId) {
            toast.error('Vui lòng đăng nhập để thích bình luận');
            return;
        }

        try {
            setLikedCommentsMap(prev => ({
                ...prev,
                [commentId]: true
            }));
            setCommentsMap(prev => ({
                ...prev,
                [postId]: prev[postId].map(comment =>
                    comment.id === commentId
                        ? { ...comment, likes: (comment.likes || 0) + 1 }
                        : comment
                )
            }));
            await axiosInstance.post(`/comment/like-comment/${commentId}`, {
                userId: parseInt(userId)
            });
            toast.success('Đã thích bình luận');
        } catch (err) {
            setLikedCommentsMap(prev => ({
                ...prev,
                [commentId]: false
            }));
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
            toast.error('Vui lòng đăng nhập để thao tác');
            return;
        }

        try {
            setLikedCommentsMap(prev => ({
                ...prev,
                [commentId]: false
            }));
            setCommentsMap(prev => ({
                ...prev,
                [postId]: prev[postId].map(comment =>
                    comment.id === commentId
                        ? { ...comment, likes: Math.max((comment.likes || 1) - 1, 0) }
                        : comment
                )
            }));
            await axiosInstance.post(`/comment/unlike-comment/${commentId}`, {
                userId: parseInt(userId)
            });
            toast.success('Đã bỏ thích bình luận');
        } catch (err) {
            setLikedCommentsMap(prev => ({
                ...prev,
                [commentId]: true
            }));
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

    // Filtered posts based on filter and search
    const filteredPosts = posts.filter(post => {
        const searchMatch =
            post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.question?.toLowerCase().includes(searchTerm.toLowerCase());

        if (filter === 'liked') {
            return likedPostsMap[post.id] && searchMatch;
        }
        if (filter === 'mine') {
            return post.user?.id === userId && searchMatch;
        }
        return searchMatch;
    });

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
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-10">
                            <Loader2 className="h-8 w-8 text-green-500 animate-spin mb-2" />
                            <p>Đang tải bài đăng...</p>
                        </div>
                    )}
                    {error && <div className="text-center text-red-500 py-10">{error}</div>}

                    {/* Forum posts */}
                    {!loading && !error && filteredPosts.length === 0 && (
                        <div className="text-center py-10">Không có bài đăng nào. Hãy là người đầu tiên đăng bài!</div>
                    )}

                    {!loading && !error && filteredPosts.map((post) => (
                        <div key={post.id} className="mb-8">
                            <CommunityPost
                                avatar={post.user?.avatar_url || "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"}
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
                                onLike={() =>
                                    likedPostsMap[post.id]
                                        ? handleUnlikePost(post.id)
                                        : handleLikePost(post.id)
                                }
                                isLoading={likeLoadingMap[post.id] || false}
                            />

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
                                        avatar={comment.user?.avatar_url || "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"}
                                        author={comment.user?.full_name || "Người dùng ẩn danh"}
                                        content={comment.content}
                                        likes={comment.likes || 0}
                                        isLiked={!!likedCommentsMap[comment.id]} // <-- Fix here
                                        onLike={() =>
                                            likedCommentsMap[comment.id]
                                                ? handleUnlikeComment(post.id, comment.id)
                                                : handleLikeComment(post.id, comment.id)
                                        }
                                        replies={comment.replies || []}
                                    />
                                ))}

                                {/* Add comment form */}
                                <div className="mt-4 flex items-start gap-3">
                                    <img
                                        src={user?.avatar_url || "/placeholder.svg"}
                                        alt={user?.full_name || "Người dùng ẩn danh"}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
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
                    {!loading && !error && filteredPosts.length > 0 && (
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