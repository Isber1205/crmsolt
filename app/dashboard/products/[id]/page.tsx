import { EditForm } from "@/app/components/dashboard/EditForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(productId: string) {
    const data = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export default async function EditRoute(
    props: {
        params: Promise<{ id: string }>;
    }
) {
    const params = await props.params;
    const data = await getData(params.id);
    return <EditForm data={data} />;
}  