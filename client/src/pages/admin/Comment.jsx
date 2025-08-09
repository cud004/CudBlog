import React, { useEffect, useState } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { comments_data } from "../../assets/assets";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Không được duyệt");

  const fetchComments = async () => {
    setComments(comments_data);
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="flex-1 p-4 md:p-10 bg-gray-50/50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Bình luận</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setFilter("Approved")}
            className={`border rounded-full px-4 py-2 cursor-pointer text-sm font-medium transition-colors ${
              filter === "Approved" 
                ? "bg-blue-500 text-white border-blue-500" 
                : "text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Đã duyệt
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`border rounded-full px-4 py-2 cursor-pointer text-sm font-medium transition-colors ${
              filter === "Not Approved" 
                ? "bg-blue-500 text-white border-blue-500" 
                : "text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Không được duyệt
          </button>
        </div>
      </div>
      <div className="relative w-full overflow-x-auto bg-white rounded-lg shadow-lg scrollbar-hide">
        <table className="w-full min-w-[800px] text-sm text-gray-700">
          <thead className="text-xs text-gray-700 text-left uppercase bg-gray-50 border-b">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold min-w-[400px]"> Tên bài viết & Bình luận </th>
              <th scope="col" className="px-6 py-4 font-semibold w-32 max-sm:hidden text-center"> Thời gian </th>
              <th scope="col" className="px-6 py-4 font-semibold text-center w-40"> Hành động </th>
            </tr>  
          </thead>
          <tbody>
            {comments.filter((comment) =>{
              if(filter === 'Approved') return comment.isApproved === true;
              return comment.isApproved === false;
            }).map((comment, index)=> <CommentTableItem key={comment._id} comment={comment} fetchComments={fetchComments} index={index + 1} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comment;
