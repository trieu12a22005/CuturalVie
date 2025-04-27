import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import Header from "../../components/Header/Header";

export default function PostDetail() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/post/get-post`,
                    { params: { postId } }
                );
                setPost(response.data);
            } catch (err) {
                setError("Không thể tải bài viết. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 text-green-500 animate-spin mb-2" />
                <p>Đang tải bài viết...</p>
            </div>
        );
    }
    if (error) {
        return <div className="text-center text-red-500 py-10">{error}</div>;
    }
    if (!post) {
        return <div className="text-center py-10">Không tìm thấy bài viết.</div>;
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[url('/bg/bg3.png')] bg-cover bg-center">
                <div className="max-w-2xl mx-auto py-8 px-4">
                    <div className="bg-green-500 text-white p-4 rounded-t-lg flex items-center">
                        <button
                            onClick={() => navigate("/community")}
                            className="flex items-center"
                        >
                            <ArrowLeft className="h-6 w-6 mr-2" />
                            <h1 className="text-xl font-medium">Chi tiết bài đăng</h1>
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-b-lg shadow-sm">
                        <div className="flex items-center mb-4">
                            <img
                                src={post.user?.avatar_url || "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"}
                                alt={post.user?.full_name || "Người dùng ẩn danh"}
                                className="w-12 h-12 rounded-full mr-3"
                            />
                            <div>
                                <div className="font-semibold text-lg">{post.title}</div>
                                <div className="text-gray-600 text-sm">Viết bởi: <span className="text-green-600">{post.user?.full_name || "Người dùng ẩn danh"}</span></div>
                            </div>
                        </div>
                        {post.imageUrl && (
                            <div className="mb-4">
                                <img src={post.imageUrl} alt="Post" className="max-w-full rounded-md" />
                            </div>
                        )}
                        <div className="mb-4 text-gray-800 whitespace-pre-line">{post.question}</div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags && post.tags.map((tag) => (
                                <span key={tag.id} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">{tag.name}</span>
                            ))}
                        </div>
                        <div className="flex items-center gap-6 text-gray-600 text-sm mb-2">
                            <span>❤️ {post.likeCount || 0} yêu thích</span>
                            <span>💬 {post.comments?.length || 0} bình luận</span>
                            <span>🕒 {new Date(post.created_at).toLocaleString('vi-VN')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
