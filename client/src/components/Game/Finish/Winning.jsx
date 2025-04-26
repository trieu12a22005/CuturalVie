import React from "react";

function Winning({desc}) {
  return (
    <div className="bg-green-100 p-4 pb-10 rounded-2xl shadow-lg text-center w-[50%] mx-auto mt-10 relative ">
      <p className="bg-yellow-100 text-lg font-semibold py-2 mb-3 w-[60%] mx-auto rounded-3xl">
        Ngôi sao này thuộc về bạn!
      </p>

      <img className="block mx-auto" src="/star/win.png" alt="Winning Star" />

      <button className="bg-green-300 font-bold px-7 py-1 rounded-full mt-3 ">
        Kết quả
      </button>
      <p className="mt-2 font-bold text-gray-700">{desc}</p>
      <img className=" absolute bottom-[-10%] right-[100%] translate-x-1/2" src="/character/Character10.png" alt="" />
    </div>
  );
}

export default Winning;
