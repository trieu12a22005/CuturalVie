import React from "react";
import Header from "../../components/Header/Header";
import Section from "./Section";

const Contact = () => {
  const sections = [
    {
      title: 'Theo vùng miền',
      items: [
        { name: 'Đồng bằng Bắc Bộ', image: 'https://files.migo.travel/20210922/quan-ho-1.jpg' },
        { name: 'Tây Bắc', image: 'https://th.bing.com/th/id/R.6f98d7f993615b6a62e86f7a7b6c14db?rik=c0kY5WZVrVWYXA&pid=ImgRaw&r=0' },
        { name: 'Trường Sơn - Tây Nguyên', image: 'https://nghiencuulichsudotcom.files.wordpress.com/2023/06/taynguyen-1-1.jpg' },
        { name: 'Nam Bộ', image: 'https://static.vinwonders.com/production/du-lich-mien-dong-nam-bo-thumb-1.jpg' },
        { name: 'Việt Bắc', image: 'https://cdn.luatminhkhue.vn/lmk/articles/96/482814/vung-tay-bac-viet-nam-gom-nhung-tinh-nao-482814.jpg'},
        { name: 'Bắc Trung Bộ và duyên hải Bắc Trung Bộ', image: 'https://thiennhienmoitruong.vn/upload/images/noi-bat-3/000060.png'}
      ],
    },
    {
      title: 'Theo tỉnh thành',
      items: [
        { name: 'Quảng Ninh', image: 'https://photo.znews.vn/w960/Uploaded/lerl/2020_08_28/Tuan_Chau_1.jpg' },
        { name: 'Thái Bình', image: 'https://photo.znews.vn/w960/Uploaded/lerl/2020_08_28/dong_chau_zing_5.jpeg' },
        { name: 'Thừa Thiên Huế', image: 'https://photo.znews.vn/w960/Uploaded/lerl/2020_08_28/Cho_noi_dam_CHuon_zing.jpg' },
        { name: 'Đà Nẵng', image: 'https://photo.znews.vn/w960/Uploaded/lerl/2020_08_28/TP_DN_zing.jpg' },
        { name: 'Quảng Nam', image: 'https://photo.znews.vn/w960/Uploaded/lerl/2020_08_28/hoi_an_zing.jpg'}
      ],
    },
    {
      title: 'Theo hành trình',
      items: [
        { name: '', image: 'https://via.placeholder.com/300x200' },
        { name: '', image: 'https://via.placeholder.com/300x200' },
        { name: '', image: 'https://via.placeholder.com/300x200' },
        { name: '', image: 'https://via.placeholder.com/300x200' },
      ],
    },

    {
      title: 'Theo thể loại',
      items: [
        { name: '', image: 'https://via.placeholder.com/300x200' },
        { name: '', image: 'https://via.placeholder.com/300x200' },
        { name: '', image: 'https://via.placeholder.com/300x200' },
        { name: '', image: 'https://via.placeholder.com/300x200' },
      ],
    }
  ];
  return (
    <div className="bg-cover bg-center bg-[url('/bg/bgHome.jpg')] text-white">
      <Header />
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">KHƠI NGUỒN TRI THỨC</h1>
        <p className="text-lg">
          Nơi cung cấp cho bạn những thông tin bổ ích về văn hóa, lịch sử và
          truyền thống của Việt Nam.
        </p>
        {sections.map((section, index) => (
          <Section key={index} title={section.title} items={section.items}/>
        ))}
      </section>
    </div>
  );
};

export default Contact;