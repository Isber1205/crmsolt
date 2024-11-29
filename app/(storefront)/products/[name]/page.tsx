import ProductCard from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(productCategory: string) {
    switch (productCategory) {
        case "all": {
            const data = await prisma.product.findMany({
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
                where: {
                    status: "published",
                },
            });

            return {
                title: "All Products",
                data: data,
            };
        }
        case "men": {
            const data = await prisma.product.findMany({
                where: {
                    status: "published",
                    category: "men",
                },
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
            });

            return {
                title: "Products for Men",
                data: data,
            };
        }
        case "women": {
            const data = await prisma.product.findMany({
                where: {
                    status: "published",
                    category: "women",
                },
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
            });

            return {
                title: "Products for Woman",
                data: data,
            };
        }
        case "kids": {
            const data = await prisma.product.findMany({
                where: {
                    status: "published",
                    category: "kids",
                },
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
            });

            return {
                title: "Products for Kids",
                data: data,
            };
        }
        default: {
            return notFound();
        }
    }
}

export default async function CategoriesPage({
    params,
}: {
    params: { name: string };
}) {
    const { data, title } = await getData(params.name);
    return (
        <section>
            <h1 className="font-semibold text-3xl my-5"> {title} </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    )
}