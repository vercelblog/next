"use client";

import { useRouter } from "next/navigation";

const Back = () => {
  const router = useRouter();

  return (
    <div className="flex">
      <div
        onClick={() => router.push("/")}
        className="border border-gray-200 bg-gray-50 p-1.5 rounded-full cursor-pointer hover:bg-gray-100 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#6a7282"
        >
          <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z" />
        </svg>
      </div>
    </div>
  );
};

export default Back;
