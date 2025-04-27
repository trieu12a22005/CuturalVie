import React, { useEffect, useState } from "react";
import { Pagination, Tag, Spin } from "antd";
import { LikeOutlined, CommentOutlined } from "@ant-design/icons";
import Header from "../../components/Header/Header";

const UserProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (page) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://viet-cultural-be.vercel.app/api/v1/post/get-posts-by-user?page=${page}&limit=10&sortBy=created_at&sortOrder=desc`,
        { credentials: "include" }
      );
      const data = await res.json();
      setPosts(data.posts || []);
      if (data.posts.length > 0) {
        setUserInfo(data.posts[0].user);
      }
      setPagination({
        page: data.pagination.page,
        totalPages: data.pagination.totalPages,
      });
      setLoading(false);
    } catch (error) {
      console.error("Fetch posts failed:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const handlePageChange = (page) => {
    fetchPosts(page);
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center py-10 px-4"
        style={{
          backgroundImage: "url('/bg/bg3.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full max-w-4xl bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl p-8 font-[Lora]">
          {/* User Info */}
          {userInfo && (
            <div className="flex flex-col items-center mb-10">
              <img
                src={userInfo.avatar_url || "/avatar-default.png"}
                alt="avatar"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h2 className="text-3xl font-bold text-center">{userInfo.full_name}</h2>
              <p className="text-gray-500 text-center mt-2">
                Là thành viên kể từ tháng 4 năm 2025
              </p>
            </div>
          )}

          {/* Posts */}
          <h3 className="text-2xl font-semibold mb-6 text-center">Những bài bạn đã đăng</h3>

          {loading ? (
            <div className="flex justify-center py-10">
              <Spin size="large" />
            </div>
          ) : posts.length === 0 ? (
            <div className="flex justify-center py-10 text-gray-500 text-xl">
              Chưa có bài đăng nào.
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-5 relative bg-white bg-opacity-95">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-xl font-bold">{post.title}</h4>
                        <p className="text-gray-600 text-sm">
                          Viết bởi:{" "}
                          <span className="text-green-700 font-semibold">
                            {post.user.full_name}
                          </span>
                        </p>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {new Date(post.created_at).toLocaleString("vi-VN")}
                      </p>
                    </div>
                    <div className="flex">
                      <img
                        src={post.user.avatar_url || "/avatar-default.png"}
                        alt="avatar"
                        className="w-12 h-12 rounded-full mr-4 mt-1"
                      />
                      <div className="flex-1">
                        <p className="mb-4">{post.question}</p>
                        <div className="space-x-2 mb-2">
                          {post.tags.map((tag) => (
                            <Tag color="green" key={tag.id}>
                              {tag.name}
                            </Tag>
                          ))}
                        </div>
                        <div className="flex space-x-6 text-gray-600 text-sm items-center">
                          <div><LikeOutlined /> {post.likeCount} yêu thích</div>
                          <div><CommentOutlined /> {post.commentCount} bình luận</div>
                          <a href="#" className="text-green-700 hover:underline ml-auto">
                            Đọc thêm
                          </a>
                        </div>
                      </div>

                      {post.imageUrl && (
                        <img
                          src={post.imageUrl}
                          alt="post"
                          className="w-24 h-24 rounded-lg ml-4 object-cover"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Pagination
                  current={pagination.page}
                  total={pagination.totalPages * 10}
                  pageSize={10}
                  onChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
