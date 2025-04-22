import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ImageIcon, X, Check } from "lucide-react";
import axiosInstance from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [allTags, setAllTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [showTagDropdown, setShowTagDropdown] = useState(false);
    const [tagSearchTerm, setTagSearchTerm] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingTags, setLoadingTags] = useState(true);
    const [userId, setUserId] = useState(null);
    const fileInputRef = useRef(null);
    const tagInputRef = useRef(null);
    const navigate = useNavigate();

    // Fetch user profile to get userId
    useEffect(() => {
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
                    } else {
                        toast.error("Không thể xác định người dùng. Vui lòng đăng nhập lại.");
                    }
                }
            } catch (err) {
                console.error("Lỗi khi fetch profile:", err);
                toast.error("Có lỗi xảy ra khi lấy thông tin người dùng");
            }
        };

        fetchUserProfile();
    }, []);

    // Fetch all available tags from the database
    useEffect(() => {
        const fetchTags = async () => {
            try {
                setLoadingTags(true);
                const response = await axiosInstance.get('/tags');
                setAllTags(response.data || []);
            } catch (error) {
                console.error("Error fetching tags:", error);
                toast.error("Không thể tải danh sách thẻ từ máy chủ");
            } finally {
                setLoadingTags(false);
            }
        };

        fetchTags();
    }, []);

    const handleTagSelection = (tag) => {
        if (!selectedTags.some(t => t.id === tag.id)) {
            setSelectedTags([...selectedTags, tag]);
        }
        setTagSearchTerm("");
        setShowTagDropdown(false);
    };

    const handleRemoveTag = (tagToRemove) => {
        setSelectedTags(selectedTags.filter(tag => tag.id !== tagToRemove.id));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleTagInputFocus = () => {
        setShowTagDropdown(true);
    };

    const handleTagInputBlur = (e) => {
        // Delay hiding dropdown to allow for click on dropdown items
        setTimeout(() => {
            setShowTagDropdown(false);
        }, 200);
    };

    const filteredTags = allTags.filter(tag => 
        tag.name.toLowerCase().includes(tagSearchTerm.toLowerCase()) &&
        !selectedTags.some(selected => selected.id === tag.id)
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim()) {
            toast.error("Vui lòng nhập tiêu đề bài viết");
            return;
        }

        if (!question.trim()) {
            toast.error("Vui lòng nhập nội dung bài viết");
            return;
        }

        if (!userId) {
            toast.error("Vui lòng đăng nhập để đăng bài");
            return;
        }

        if (selectedTags.length === 0) {
            toast.error("Vui lòng chọn ít nhất một thẻ");
            return;
        }

        try {
            setLoading(true);

            // Extract tag IDs
            const tagIds = selectedTags.map(tag => tag.id);

            // Create post data object
            const postData = {
                title,
                question,
                userId: parseInt(userId),  // Will be mapped to user_id_id by the server
                tags: tagIds              // Array of tag IDs as expected by the server
            };

            // If we have an image, add it using FormData
            if (image) {
                const formData = new FormData();
                
                // Add the image file
                formData.append('media', image);
                
                // Add post data as JSON string in a field
                formData.append('postData', JSON.stringify(postData));
                
                // Call API to upload media first
                await axiosInstance.post("/post/create-post", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
            } else {
                // If no image, just send the post data directly
                await axiosInstance.post("/post/create-post", postData);
            }

            toast.success("Đăng bài thành công!");
            navigate("/community");
        } catch (err) {
            console.error("Error creating post:", err);
            toast.error("Không thể đăng bài. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[url('/bg/bg3.png')] bg-cover bg-center">
            <div className="max-w-3xl mx-auto py-8 px-4">
                <div className="bg-green-500 text-white p-4 rounded-t-lg flex items-center">
                    <button onClick={() => navigate("/community")} className="flex items-center">
                        <ArrowLeft className="h-6 w-6 mr-2" />
                        <h1 className="text-xl font-medium">Tạo bài đăng trên trang cộng đồng</h1>
                    </button>
                </div>

                <form className="bg-white p-6 rounded-b-lg shadow-sm" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-green-700 font-medium mb-2">
                            Tiêu đề
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Bài đăng của bạn về chủ đề gì?"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="question" className="block text-green-700 font-medium mb-2">
                            Nội dung
                        </label>
                        <textarea
                            id="question"
                            placeholder="Bạn muốn chia sẻ điều gì?"
                            rows={6}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-6">
                        <label className="block text-green-700 font-medium mb-2">Chọn thẻ</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {selectedTags.map((tag) => (
                                <span 
                                    key={tag.id} 
                                    className="bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
                                >
                                    {tag.name}
                                    <button 
                                        type="button"
                                        className="ml-1 text-white focus:outline-none" 
                                        onClick={() => handleRemoveTag(tag)}
                                    >
                                        <X size={16} />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm và chọn thẻ..."
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                value={tagSearchTerm}
                                onChange={(e) => setTagSearchTerm(e.target.value)}
                                onFocus={handleTagInputFocus}
                                onBlur={handleTagInputBlur}
                                ref={tagInputRef}
                            />
                            {showTagDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {loadingTags ? (
                                        <div className="p-3 text-center text-gray-500">Đang tải thẻ...</div>
                                    ) : filteredTags.length > 0 ? (
                                        filteredTags.map(tag => (
                                            <div 
                                                key={tag.id} 
                                                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                                onClick={() => handleTagSelection(tag)}
                                            >
                                                <span className="flex-grow">{tag.name}</span>
                                                <Check size={16} className="text-green-500" />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-3 text-center text-gray-500">
                                            {tagSearchTerm ? "Không tìm thấy thẻ phù hợp" : "Không có thẻ khả dụng"}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Nhấp vào thẻ để chọn</p>
                    </div>

                    <div className="mb-8">
                        <label className="block text-green-700 font-medium mb-2">Thêm hình ảnh (tùy chọn)</label>
                        {imagePreview && (
                            <div className="mb-4 relative">
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="max-w-full max-h-64 rounded-md" 
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImage(null);
                                        setImagePreview(null);
                                    }}
                                    className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                        <div 
                            className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="flex flex-col items-center justify-center">
                                <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                                <p className="text-gray-500 mb-4">Kéo và thả hình ảnh ở đây hoặc nhấp để duyệt</p>
                                <button 
                                    type="button" 
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        fileInputRef.current?.click();
                                    }}
                                >
                                    Chọn file
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            className="border border-gray-300 text-gray-700 px-4 py-2 rounded"
                            onClick={() => navigate("/community")}
                        >
                            Hủy bỏ
                        </button>
                        <button 
                            type="submit" 
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={loading || !userId || selectedTags.length === 0}
                        >
                            {loading ? "Đang đăng..." : "Đăng bài"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
