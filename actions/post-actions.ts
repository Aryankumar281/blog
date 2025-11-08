"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createPost(formData: FormData) {
  try {
    //get the current user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session?.user) {
      return {
        success: false,
        message: "you must be loggedin to create a post",
      };
    }

    //get the form data

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    //implement a validation check

    //create slug from post title
    const slug = slugify(title);
    //check if the slug already exist or not
    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (existingPost) {
      return {
        success: false,
        message: "Post with with the same title already exists",
      };
    }

    const [newpost] = await db
      .insert(posts)
      .values({
        title,
        description,
        content,
        slug,
        authorId: session.user.id,
      })
      .returning();

      //revalidating the homepage to get the latest posts

      revalidatePath('/')
      revalidatePath(`/post/${slug}`)
      revalidatePath(`/profile`)

      return {
        success:true,
        message:"Post created succesfully",
        slug
      }
  } catch (e) {
    return {
        success:false,
        message:"Failed to create Post"
      }
  }
}
