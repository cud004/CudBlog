import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { input, setInput } = useAppContext();
  const inputRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };
  const onClear = () =>{
    setInput("");
    inputRef.current.value = "";
  }

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className=" text-center mt-20 mb-8">
        {/* <div className =' inline-flex items-center justify-center gap-4 px-6 py-1.5
        mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
          <p>ádadadasdasda</p>
          <img src={assets.star_icon} alt="star" className="w-2.5" />
        </div> */}
        <h1
          className="text-2.5xl sm:text-6xl font-semibold sm:leading-16
        text-grey-700"
        >
          {" "}
          Blog về <span className="text-blue-800">mọi thứ</span> <br /> trong
          cuộc sống.{" "}
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-sm text-primary">
          Đây là nơi tôi sẽ viết tất cả những gì tôi đã làm được, học tập và mọi
          thứ trong cuộc sống của tôi.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12 mx-auto"
        >
          <input
            ref={inputRef}
            className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
            type="text"
            placeholder="Tìm kiếm bài viết"
            required
          />
          <button
            type="submit"
            className="md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none whitespace-nowrap"
          >
            Tìm kiếm
          </button>
        </form>
      </div>
      <div className="text-center">
        {
        input && <button  className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer" onClick={onClear}>Xóa tìm kiếm</button>
        }
      </div>
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};

export default Header;
