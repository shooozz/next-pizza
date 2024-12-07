"use client";

import React, { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Suspense>
            <SessionProvider>{children}</SessionProvider>
            <Toaster />
            <NextTopLoader />
        </Suspense>
    );
};
