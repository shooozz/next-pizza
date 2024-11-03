"use client";

import React from "react";
import { FilterCheckBox, FilterCheckBoxProps } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";

type Item = FilterCheckBoxProps;

interface Props {
    name?: string;
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckBox?: (value: string) => void;
    defaultValue?: string[];
    className?: string;
    selectedValues?: Set<string>;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
    name,
    title,
    items,
    defaultItems,
    limit = 5,
    loading = false,
    searchInputPlaceholder = "Поиск...",
    className,
    onClickCheckBox,
    defaultValue,
    selectedValues,
}) => {
    const [showAll, setShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");

    const list = showAll
        ? items.filter((item) =>
              item.text.toLowerCase().includes(searchValue.toLowerCase())
          )
        : (defaultItems || items).slice(0, limit);

    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold mb-3">{title}</p>
                {...Array(limit)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-6 mb-4 rounded-[8px]"
                        />
                    ))}

                <Skeleton className="w-28 mb-4 rounded-[8px]" />
            </div>
        );
    }

    const onChangeSearchInput = (value: string) => {
        setSearchValue(value);
    };

    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input
                        placeholder={searchInputPlaceholder}
                        className="bg=gray=50 border-none"
                        onChange={(e) => onChangeSearchInput(e.target.value)}
                    />
                </div>
            )}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list.map((item, index) => (
                    <FilterCheckBox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={selectedValues?.has(item.value)}
                        // @ts-ignore
                        onCheckedChange={() => onClickCheckBox?.(item.value)}
                        name={name}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div
                    className={
                        showAll ? "border-t border-t-neutral-100 mt-4" : ""
                    }
                >
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-primary mt-3"
                    >
                        {showAll ? "Скрыть" : "+ Показать все"}
                    </button>
                </div>
            )}
        </div>
    );
};
