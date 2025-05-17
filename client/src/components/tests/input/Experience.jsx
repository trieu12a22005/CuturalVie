import React, { useEffect, useState } from "react";



export default function Experience({index,options,setAns,ans}) {
  const [selected, setSelected] = useState([]);
  let text=index==2 ? "Bạn từng nghe hoặc trải nghiệm những gì sau đây?" : "Bạn thích tìm hiểu văn hóa theo cách nào?" 
  const handleToggle = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };
  useEffect(()=>{
    if (!ans[index])  setSelected([]);
  },[index])
  useEffect(()=>{
    console.log(selected);
    setAns(prev=>({...prev,[index]: selected}));
      },[selected])
  return (
    <>
      <p className="text-lg font-semibold text-green-700 mb-2">
        Câu {index}: {text+" "} 
        <span className="text-gray-500 text-sm">(Có thể chọn nhiều lựa chọn)</span>
      </p>

      <div className="grid grid-cols-2 gap-x-10 gap-y-4 my-6">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => handleToggle(option)}
              className="w-5 h-5 border-2 border-black accent-green-600"
            />
            <span className="text-black font-medium">{option}</span>
          </label>
        ))}
      </div>
    </>
  );
}
