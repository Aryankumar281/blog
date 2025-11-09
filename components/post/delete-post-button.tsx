'use client'

import { DeletePostButtonProps } from "@/lib/types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";


function DeletePostButton({postId}:DeletePostButtonProps) {
    return (
        <div>
            <Button variant={'destructive'} size='sm'>
                <Trash2 className="h-4 w-4 mr-2"/>
                Delete
            </Button>
        </div>
    );
}

export default DeletePostButton;