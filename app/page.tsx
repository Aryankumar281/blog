import PostList from "@/components/post/post-list";
import { getAllPosts } from "@/lib/db/queries";
import { Metadata } from "next";

export const metadata:Metadata={
  title:'Next js blog website',
  description:'Next js blog website'
}
export default async function Home() {

  const posts = await getAllPosts();

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl text-center font-bold mb-2">Welcome to the Blog website</h1>

        {
          posts.length===0? <div className=" text-center py-10">
            <h2 className="text-xl font-medium"> No posts yet</h2>
          </div>:
          <PostList posts={posts}/>
        }
      </div>
    </main>
  );
}
