import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui/button";

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    onClickAdd?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
    name,
    imageUrl,
    onClickAdd,
    className,
}) => {
    const textDetaills = "lorem lorem 30 sm";
    const totalPrice = 12345;

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

                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
