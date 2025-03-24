import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { AiFillHeart } from "react-icons/ai";

//  fetchLikeCount, postLikeCount는 서버 API 호출 or 로컬스토리지
// 예시로 import했습니다.
let likeValue = 0;

// 실제 서버 API라면 axios 등으로 호출
export async function fetchLikeCount() {
  return likeValue;
}

export async function postLikeCount(newCount: number) {
  likeValue = newCount;
  return likeValue;
}

export default function LikeButton() {
  const queryClient = useQueryClient();

  const { data: likeCount = 0 } = useQuery("likeCount", fetchLikeCount);

  const mutation = useMutation(postLikeCount, {
    onSuccess: newCount => {
      queryClient.setQueryData("likeCount", newCount);
    },
  });

  const [animating, setAnimating] = useState(false);

  const handleLike = () => {
    mutation.mutate(likeCount + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <button
      onClick={handleLike}
      className={`relative px-3 py-2 bg-pink-500 text-white rounded text-sm transition-transform ${
        animating ? "pop-animation" : ""
      }`}
    >
      <div className="flex items-center gap-1">
        <span> {likeCount}</span>
        <AiFillHeart className="text-white w-4 h-4" />
      </div>
    </button>
  );
}
