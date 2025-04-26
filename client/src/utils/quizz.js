import { store } from "../store/store"; // ✅ Đúng
export const questions = [
  {
    id: 4,
    question: "Động Phong Nha thuộc tỉnh nào của Việt Nam?",
    options: {
      A: "Quảng Bình",
      B: "Quảng Trị",
      C: "Huế",
      D: "Đà Nẵng",
    },
    correctAnswer: "A",
  },
  {
    id: 5,
    question: "Thành phố nào được mệnh danh là ‘thành phố ngàn hoa’?",
    options: {
      A: "Hà Nội",
      B: "Đà Lạt",
      C: "Huế",
      D: "Cần Thơ",
    },
    correctAnswer: "B",
  },
];

export function getTotalists() {
   const state = store.getState();
   let arr=[null,state.count.progress.length,state.puzzle.puzzles.length,null,state.count.progress.length];
   console.log(arr);
   return arr;
}
//format time
export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
const calculateTextDuration = (text) => text.length * 0.03;
const firstParagraphText =
  "Chào mừng bạn đến với 'Vượt Đỉnh Tri Thức'! Đây là hành trình khám phá những nét văn hóa đặc sắc! Bạn sẽ trải qua 10 câu hỏi với 4 lựa chọn A, B, C, D, mỗi câu hỏi đều liên quan đến lịch sử và các di tích lịch sử. Sau mỗi câu hỏi, bạn sẽ được cung cấp thêm thông tin bổ ích để mở rộng kiến thức.";
const secondParagraphText = "Cách Chơi:";
const lastParagraphText =
  "Chúc bạn may mắn và thành công trên hành trình chinh phục tri thức này!";

const firstParaDuration = calculateTextDuration(firstParagraphText);
const secondParaDuration = calculateTextDuration(secondParagraphText);

// List items
const listItems = [
  "Mỗi câu hỏi có 30 giây để trả lời. Hãy nhanh chóng và chính xác!",
  "Sau khi trả lời, bạn sẽ nhận thêm thông tin về câu hỏi để hiểu rõ hơn về kiến thức.",
  "Bạn có thể hỏi AI về bất kỳ nội dung nào còn thắc mắc từ phần cung cấp kiến thức.",
  "Để giành được 1 sao đầu tiên trong hành trình, bạn cần trả lời đúng ít nhất 6/10 câu.",
];
export {
  firstParagraphText,
  secondParaDuration,
  secondParagraphText,
  listItems,
  firstParaDuration,
  lastParagraphText,
  calculateTextDuration,
};
