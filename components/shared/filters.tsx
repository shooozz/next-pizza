import React from "react";
import { CheckboxFiltersGroup, FilterCheckBox, RangeSlider, Title } from ".";
import { Input } from "../ui";
interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

            {/* Верхние чекбоксы */}
            <div className="flex flex-col gap-4">
                <FilterCheckBox text="Можно собирать" value="1" />
                <FilterCheckBox text="Новинки" value="2" />
            </div>

            {/* Фильтр цен */}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold md-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        defaultValue={0}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={1000}
                        placeholder="1000"
                    />
                </div>

                <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
            </div>

            {/* Фильтр ингредиентов */}
            <div>
                <CheckboxFiltersGroup
                    title="Ингридиенты"
                    className="mt-5"
                    limit={4}
                    defaultItems={[
                        {
                            text: "Сырный соус",
                            value: "1",
                        },
                        {
                            text: "Моццарелла",
                            value: "2",
                        },
                        {
                            text: "Сырный соус",
                            value: "1",
                        },
                        {
                            text: "Моццарелла",
                            value: "2",
                        },
                        {
                            text: "Сырный соус",
                            value: "1",
                        },
                        {
                            text: "Моццарелла",
                            value: "2",
                        },
                    ]}
                    items={[
                        {
                            text: "Сырный соус",
                            value: "1",
                        },
                        {
                            text: "Моццарелла",
                            value: "2",
                        },
                        {
                            text: "Сырный соус",
                            value: "1",
                        },
                        {
                            text: "Моццарелла",
                            value: "2",
                        },
                        {
                            text: "Сырный соус",
                            value: "1",
                        },
                        {
                            text: "Моццарелла",
                            value: "2",
                        },
                    ]}
                />
            </div>
        </div>
    );
};
