import { mapPizzaType, PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { calcTotalPizzaPrices } from ".";
import { ProductItem, Ingredient } from "@prisma/client";

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const textDetaills = `${size} см, ${mapPizzaType[type]} пицца (${selectedIngredients.size})`;

    const totalPrice = calcTotalPizzaPrices(
        type,
        size,
        items,
        ingredients,
        selectedIngredients
    );

    return { totalPrice, textDetaills };
};
