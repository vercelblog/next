"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Header = ({ categories, blogs, onCategorySelect, selectedCategory }) => {
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(blogs);
  const [hamburger, sethamburger] = useState(false);
  const router = useRouter()

  const getTitle = (blog) => {
    const titleBlock = blog.blocks.find((b) => b.type === "title");
    return titleBlock ? titleBlock.content : "Untitled";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        setFiltered(
          blogs.filter((b) => {
            const title = getTitle(b).toLowerCase();
            return (
              title.includes(query.toLowerCase()) ||
              b.category.toLowerCase().includes(query.toLowerCase()) ||
              b.author.toLowerCase().includes(query.toLowerCase())
            );
          })
        );
      } else {
        setFiltered([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, blogs]);

  return (
    <>
      <div className="header flex justify-between p-4 items-center bg-white">
        <div>
          <Image src="/logoes.png"alt="Logo" width={100} height={100} className="w-full " priority />
        </div>

        { search && <div className="h-screen w-screen fixed top-0 left-0 backdrop-blur-xl p-6"> <div> <div className="w-full border relative border-gray-200 rounded-lg bg-white "> <div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search blogs" className="p-3 px-12 w-full rounded-lg " type="text" /></div> <div className="absolute top-3 -left-1 translate-x-1/2 pr-1 border-r-1 border-gray-300"> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#303030"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg></div> <div className="h-0.5 w-full bg-gray-100"></div> {filtered.length > 0 ? ( filtered.map((b) => { const title = getTitle(b); const imageBlock = b.blocks.find((bl) => bl.type === "image"); return ( <div key={b._id} onClick={()=>router.push(`/${b.slug}`)}  className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"  > {imageBlock && ( <img src={b.blocks.find((item)=>item.type==="coverImage").content} alt={title} className="w-16 h-16 object-cover rounded" /> )} <div> <h3 className="font-semibold">{title}</h3> <p className="text-sm text-gray-600"> {b.category} • {b.author} •{" "} {new Date(b.createdAt).toDateString()} </p> </div> </div> ); }) ) : ( <div className="w-full p-4 border-gray-300 text-center"> <div className="text-gray-600 ">Nothing found</div> </div> )} <div className="flex items-center justify-center pb-4"> <div onClick={()=>{setSearch((prev)=> !prev) ;setQuery('') }} className="bg-gray-600 text-white p-2 px-4 rounded-lg pointer">Close search</div> </div> </div> </div> </div> }

        <div className="md:flex gap-3 capitalize hidden ">
          {categories.map((c) => (
            <div
              key={c}
              onClick={() => onCategorySelect(c)}
              className={`cursor-pointer p-2 px-4 ${
                selectedCategory === c
                  ? "text-violet-700 border-t-2 bg-gradient-to-b from-violet-100 "
                  : "text-gray-900"
              }`}
            >
              {c}
            </div>
          ))}
        </div>

        {/* Icons */}
        <div className="flex gap-4">
          <div onClick={() => setSearch((prev) => !prev)} className="">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#303030"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
          </div>
          <div onClick={() => sethamburger(!hamburger)} className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#303030"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {hamburger && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white p-4 md:hidden">
          <div className="flex justify-end p-4">
            <div
              className="border border-dashed border-gray-400"
              onClick={() => sethamburger(!hamburger)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#303030"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </div>
          </div>
          <div className="flex gap-3 flex-col capitalize ">
            {categories.map((c) => (
              <div
                key={c}
                onClick={() => {
                  onCategorySelect(c);
                  sethamburger(false); // close menu on click
                }}
                className={`cursor-pointer p-2 hover:border-l-3 
                  hover:text-gray-600 hover:border-gray-500 hover:bg-gradient-to-r hover:from-gray-100 ${
                  selectedCategory === c
                    ? "text-violet-700 border-l-3 border-violet-500 bg-gradient-to-r from-violet-100"
                    : "text-black"
                }`}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
