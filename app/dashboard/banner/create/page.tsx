"use client";

import { CreateBanner } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { bannerSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useActionState, useState, useEffect } from "react";
import { toast } from 'react-toastify';

export default function BannerRoute() {
    const [image, setImages] = useState<string[]>([]);
    const [lastResult, action] = useActionState(CreateBanner, undefined);

    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: bannerSchema })
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    const handleDelete = (index: number) => {
        setImages(image.filter((_, i) => i !== index));
    }

    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <div className="flex items-center gap-x-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/banner">
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
            </div>

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Banner Details</CardTitle>
                    <CardDescription>Create your banner right here</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-y-6">
                        <div className="flex flex-col gap-3">
                            <Label>Name</Label>
                            <Input
                                name={fields.title.name}
                                key={fields.title.key}
                                defaultValue={fields.title.initialValue}
                                type="text"
                                placeholder="Create title for Banner"
                            />
                            <p className="text-red-500">{fields.title.errors}</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Images</Label>
                            <input
                                type="hidden"
                                value={image}
                                key={fields.imageString.key}
                                name={fields.imageString.name}
                                defaultValue={fields.imageString.initialValue as any}
                            />
                            {image.length > 0 ? (
                                <div className="flex gap-6">
                                    {image.map((image, index) => (
                                        <div key={index} className="relative w-[200px] h-[200px]">
                                            <Image
                                                src={image}
                                                alt="Product Image"
                                                height={200}
                                                width={200}
                                                className="w-[200px] h-[200px] object-cover border rounded-lg"
                                            />

                                            <button
                                                onClick={() => handleDelete(index)}
                                                type="button"
                                                className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                                            >
                                                <XIcon className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <UploadDropzone
                                    endpoint="bannerImageRoute"
                                    onClientUploadComplete={(res) => {
                                        setImages(res.map((r) => r.url));
                                    }}
                                    onUploadError={() => {
                                        alert("Something went wrong");
                                    }}
                                />
                            )}
                            <p className="text-red-500"> {fields.imageString.errors} </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Create Banner"></SubmitButton>
                </CardFooter>
            </Card>
        </form>
    )
}