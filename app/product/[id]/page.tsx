import { Container, ProductImage, Title } from "@/components/shared";
import { GroupVariants } from "@/components/shared/group-variants";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
    params: { id },
}: {
    params: { id: string };
}) {
    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
    });

    if (!product) {
        return notFound();
    }

    return (
        <Container className="flex flex-col my-10">
            <div className="flex flex-1">
                <ProductImage
                    imageUrl={product.imageUrl}
                    size={40}
                    className=""
                />

                <div className="w-[490px] bg-[#FCFCFC] P-7">
                    <Title
                        text={product.name}
                        size="md"
                        className="font-extrabold mb-1"
                    />

                    <p className="text-gray-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sequi error quam rem obcaecati a quas unde accusamus hic
                        consectetur autem? Ratione nesciunt neque aliquid
                        beatae, saepe reiciendis ea rerum facere.
                    </p>

                    <GroupVariants
                        selectedValue="2"
                        items={[
                            {
                                name: "Маленькая",
                                value: "1",
                            },
                            {
                                name: "Среднияя",
                                value: "2",
                            },
                            {
                                name: "Большая",
                                value: "3",
                            },
                        ]}
                    />
                </div>
            </div>
        </Container>
    );
}
