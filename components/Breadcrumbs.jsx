"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const Breadcrumbs = ({ category, title }) => {
  const params = useParams();
  const slug = params?.slug;

  return (
    <nav className="flex text-sm text-gray-600 my-2">
      <Link href="/" className="hover:text-violet-600">
        Home
      </Link>
      <span className="mx-2">/</span>

      <Link
        href="/"
        className="hover:text-violet-600 capitalize"
      >
        {category}
      </Link>
      <span className="mx-2">/</span>

      <span className="text-gray-900 font-medium truncate max-w-[200px]">
        {title || slug}
      </span>
    </nav>
  );
};

export default Breadcrumbs;
