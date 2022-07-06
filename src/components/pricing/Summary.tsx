import React from 'react';
import { Card } from './Card';
import { Details } from './Details';
import { Grid, GridItem } from '@chakra-ui/react';
import { ProductWithPrice } from '@/types/PricingTypes';

export const Summary = ({ plans }: { plans: ProductWithPrice[] }) => {
    return (
        <Grid templateColumns='repeat(3, 1fr)' gap={10} px={10}>
            {plans.map((plan: ProductWithPrice, i: number) => (
                <GridItem key={i}>
                    <Card plan={plan} numPlans={plans.length}>
                        <Details plan={plan} prevName={i ? plans[i - 1].name : ''} />
                    </Card>
                </GridItem>
            ))}
        </Grid>
    );
};
