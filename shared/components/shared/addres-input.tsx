"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
    onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
    return (
        <AddressSuggestions
            token="bc950a6582a65efb6d064468745651d4a049fbe5"
            onChange={(data) => onChange?.(data?.value)}
        />
    );
};
