import { notFound } from "next/navigation";
import { ChoooseProductModal } from "../../../../../shared/components/shared";
import { prisma } from "@/prisma/prisma-client";

export default async function ProductModalPage({
    params: { id },
}: {
    params: { id: string };
}) {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            ingredients: true,
            items: true,
        },
    });

    if (!product) {
        return notFound();
    }

    return <ChoooseProductModal product={product} />;
}
