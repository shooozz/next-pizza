"use client";

import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ProductDrawer } from "..";
import { ProductWithRelations } from "@/@types/prisma";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChoooseProductModal: React.FC<Props> = ({
    product,
    className,
}) => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
                    className
                )}
            >
                <DialogTitle />
                <ProductDrawer
                    product={product}
                    onSubmit={() => router.back()}
                />
            </DialogContent>
        </Dialog>
    );
};
