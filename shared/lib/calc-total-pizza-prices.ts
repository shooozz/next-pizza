import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";

/**
 * Функция для подсчета общей стоимости
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns number общую стоимость
 */
export const calcTotalPizzaPrices = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const pizzaPrice =
        items.find((item) => item.pizzaType === type && item.size === size)
            ?.price || 0;
    const totalIngredientsPrice = ingredients
        .filter((ingredients) => selectedIngredients.has(ingredients.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);

    return pizzaPrice + totalIngredientsPrice;
};
