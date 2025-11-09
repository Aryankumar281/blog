"use client";

import z from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { createPost, updatePost } from "@/actions/post-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PostFormProps } from "@/lib/types";

//post form schema
const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be atleast 3 character long")
    .max(255, "Tile must be less than 255 characters"),
  description: z
    .string()
    .min(5, "Description must be atleast 5 character long")
    .max(255, "Description must be less than 255 characters"),
  content: z.string().min(10, "Content must be at least 10 character long"),
});

type PostFormValues = z.infer<typeof postSchema>;

function PostForm({ isEditing, post }: PostFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues:
      isEditing && post
        ? {
            title: post.title,
            description: post.description,
            content: post.content,
          }
        : {
            title: "",
            description: "",
            content: "",
          },
  });

  const onFormSubmit = async (data: PostFormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("content", data.content);

        let res ;

        if(isEditing && post){
          res = await updatePost(post.id,formData);
        }
        else{
          res = await createPost(formData);
        }
        console.log(res, "res");
        if (res.success) {
          toast(isEditing?"Post Updated Successfully":"Post created successfully");
          router.refresh();
          router.push("/");
        } else {
          toast(res.message);
        }
      } catch (e) {
        toast("Failed to create post");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter Post title"
          {...register("title")}
          disabled={isPending}
        />
        {errors?.title && (
          <p className="text-sm text-red-700">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter short post description"
          className="resize-none"
          {...register("description")}
          disabled={isPending}
        />
        {errors?.description && (
          <p className="text-sm text-red-700">{errors.description?.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Enter post content"
          className="min-h-[200px] resize-none"
          {...register("content")}
          disabled={isPending}
        />
        {errors?.content && (
          <p className="text-sm text-red-700">{errors.content?.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="mt-5 w-full">
        {isPending
          ? "Saving Post.."
          : isEditing
            ? "Update Post"
            : "Create Post"}
      </Button>
    </form>
  );
}

export default PostForm;
