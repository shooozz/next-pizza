import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui/button";

interface Props {
    imageUrl: string;
    name: string;
    price: number;
    className?: string;
    onSubmit?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
    name,
    imageUrl,
    price,
    onSubmit,
    className,
}) => {
    return (
        <div className={cn(className, "flex flex-1")}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <img
                    src={imageUrl}
                    alt={name}
                    className="relative left-2 top-2 transition-all z-10 duration-300 w-[400px] h-[400px]"
                />
            </div>

            <div className="w-[490px] bg-[#FCFCFC] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <Button
                    onClick={onSubmit}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5"
                >
                    Добавить в корзину за {price} ₽
                </Button>
            </div>
        </div>
    );
};
