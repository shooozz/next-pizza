"use server";

import { Resend } from "resend";
import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { createPayment, sendEmail } from "@/shared/lib";
import { PayOrderTemplate } from "@/shared/components";
import { getUserSession } from "@/shared/lib/get-user-session";
import { hashSync } from "bcrypt";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = cookies();
        const cartToken = cookieStore.get("cartToken")?.value;

        if (!cartToken) {
            throw new Error("Cart token not found");
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            where: {
                tokenId: cartToken,
            },
        });

        if (!userCart) {
            throw new Error("Cart not found");
        }

        if (userCart?.totalAmount === 0) {
            throw new Error("Cart not found");
        }
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
                fullName: data.firstName + " " + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
            },
        });

        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });

        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: "Оплата заказа №" + order.id,
        });

        if (!paymentData) {
            throw new Error("Payment data not found");
        }

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id,
            },
        });

        const paymentUrl = paymentData.confirmation.confirmation_url;

        await sendEmail(
            data.email,
            "Next Pizza / Оплатите заказ #" + order.id,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl,
            })
        );

        return paymentUrl;
    } catch (err) {
        console.log("[CreateOrder] Server error", err);
    }
}

export async function updateUserInfo(body: Prisma.UserCreateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error("Пользователь не найден");
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            },
        });

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password
                    ? hashSync(body.password, 10)
                    : findUser?.password,
            },
        });
    } catch (error) {
        console.log("Error [UPDATE_USER", error);
        throw error;
    }
}
