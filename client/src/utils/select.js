export const images = [
    "/map/img1.png",
    "/map/img2.png",
    "/map/img3.png",
    "/map/img5.png",
    "/map/img4.png",
    "/map/img6.png",
    "/map/img.png",
    "/map/img8.png",
    "/map/img9.png"
];
export function getClassname(src) {
    return src.slice(src.lastIndexOf("/") + 1,src.lastIndexOf('.'));
}
export let text="Để bắt đầu cuộc hành trình khám phá dọc Việt Nam thân yêu, trước tiên bạn hãy chọn vùng miền bạn mong muốn. Chúc bạn có một cuộc phiêu lưu đáng nhớ cùng VietCutural nhé!"