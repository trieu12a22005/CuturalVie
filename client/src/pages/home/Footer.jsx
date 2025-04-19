import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhoneCall, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-8 py-12 font-[lora] text-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 ">
        {/* Column 1 */}
        <div className="md:w-1/3">
          <img
            src="/logo/logo2.png"
            alt="VietCultural Logo"
            className="mb-4 w-40"
          />
          <p className=" leading-relaxed mb-2">
            VietCultural là một dự án tâm huyết dành riêng cho việc bảo tồn và
            phát huy di sản văn hóa phong phú của Việt Nam thông qua các trải
            nghiệm kỹ thuật số tương tác.
          </p>
          <p>@VietCultural</p>
        </div>

        {/* Column 2 */}
        <div className="md:w-1/3 flex flex-col gap-6">
          <div>
            <h3 className="font-semibold mb-2">Khám phá</h3>
            <ul className=" space-y-1">
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Game</a>
              </li>
              <li>
                <a href="#">Cộng đồng</a>
              </li>
              <li>
                <a href="#">Khơi nguồn tri thức</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Liên hệ:</h3>
            <p className="text-sm leading-relaxed mb-3">
              Bạn có thể gửi ý kiến đóng góp cho chúng tôi hoặc liên hệ chúng
              tôi qua các trang sau đây:
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-white text-black p-2 rounded-full hover:bg-gray-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="bg-white text-black p-2 rounded-full hover:bg-gray-300"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="bg-white text-black p-2 rounded-full hover:bg-gray-300"
              >
                <HiOutlineMail />
              </a>
              <a
                href="#"
                className="bg-white text-black p-2 rounded-full hover:bg-gray-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="md:w-1/3">
          <h3 className="font-semibold mb-4">Hotline:</h3>
          <div className="flex items-center gap-3 mb-3">
            <FiPhoneCall />
            <span className="text-sm">+(84)759 897 534</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <FiMapPin />
            <span className="text-sm">123 Đường Lê Duẩn, Hà Nội</span>
          </div>
          <div className="flex items-center gap-3">
            <HiOutlineMail />
            <span className="text-sm">info@vietcultural.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="mt-12  pt-4  border-t border-white">
        <div className=" text-sm flex items-center justify-between w-1/2">
          <span>Copyright © 2024 ALLROADSLEADTOUS</span>
          <div className="flex gap-4">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
