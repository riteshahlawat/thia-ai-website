import React from 'react';
import { Card } from './Card';
import { Details } from './Details';
import { Flex } from '@chakra-ui/react';
import { ProductWithPrice } from '@/types/PricingTypes';

export const Summary = ({ plans }: { plans: ProductWithPrice[] }) => {
    return (
        <Flex gap={12} px={{ base: 0, lg: 0 }} flexDirection={{ base: 'column', lg: 'row' }}>
            {plans.map((plan: ProductWithPrice, i: number) => (
                <Card key={i} plan={plan}>
                    <Details plan={plan} prevName={i ? plans[i - 1].name : ''} />
                </Card>
            ))}
        </Flex>
    );
};
