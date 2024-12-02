import { Package, Percent, Truck, ArrowRight } from "lucide-react";
import { Button, Skeleton } from "../ui";
import { CheckoutItemDetails } from "./checkout-item-details";
import { WhiteBlock } from "./white-block";

interface Props {
    totalAmount: number;
    loading?: boolean;
    className?: string;
}
const VAT = 15;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar: React.FC<Props> = ({
    totalAmount,
    loading,
    className,
}) => {
    const vatPrice = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;
    return (
        <WhiteBlock className="p-6 sticky font-extrabold">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого</span>
                {loading ? (
                    <Skeleton className="w-48 h-11" />
                ) : (
                    <span className="h-11 text-[34px] font-extrabold">
                        {totalPrice} ₽
                    </span>
                )}
            </div>
            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Package size={18} className="mr-2 text-gray-300" />
                        Стоимость корзины
                    </div>
                }
                value={
                    loading ? (
                        <Skeleton className="h-6 w-16 rounded-[6px]" />
                    ) : (
                        `${totalAmount} ₽`
                    )
                }
            />
            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Percent size={18} className="mr-2 text-gray-300" />
                        Налоги
                    </div>
                }
                value={
                    loading ? (
                        <Skeleton className="h-6 w-16 rounded-[6px]" />
                    ) : (
                        `${vatPrice} ₽`
                    )
                }
            />
            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Truck size={18} className="mr-2 text-gray-300" />
                        Доставка
                    </div>
                }
                value={
                    loading ? (
                        <Skeleton className="h-6 w-16 rounded-[6px]" />
                    ) : (
                        `${DELIVERY_PRICE} ₽`
                    )
                }
            />

            <Button
                loading={loading}
                type="submit"
                className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
                Перейти к оплате
                <ArrowRight className="w-5 ml-2" />
            </Button>
        </WhiteBlock>
    );
};
