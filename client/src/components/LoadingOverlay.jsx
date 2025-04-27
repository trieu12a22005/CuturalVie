import React from "react";
import { Spin } from "antd";

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <Spin size="large" tip="Đang tải..." />
    </div>
  );
};

export default LoadingOverlay;
