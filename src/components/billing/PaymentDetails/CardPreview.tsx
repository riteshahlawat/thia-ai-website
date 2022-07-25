import { Box, Button, Flex, Skeleton, Text, useColorModeValue } from '@chakra-ui/react';
import Stripe from 'stripe';

type Props = {
    id: string;
    card: Stripe.PaymentMethod.Card | undefined;
    onEditClick: (arg0: string) => void;
};

export const CardPreview = ({ id, card, onEditClick }: Props) => {
    const brand = card?.brand ?? '----';
    const exp_month = card?.exp_month ?? '--';
    const exp_year = card?.exp_year ?? '----';
    const last4 = card?.last4 ?? '----';
    const expiryDate = `${String(exp_month).padStart(2, '0')}/${exp_year}`;
    const cardBGColor = useColorModeValue('white', 'thia.gray.990');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');

    return (
        <Box w='full' p={5} rounded='xl' bg={cardBGColor} shadow='sm'>
            <Flex gap={5}>
                <Box>{brand}</Box>
                <Box flexGrow={1}>
                    <Text fontSize='sm' fontWeight='semibold' letterSpacing='wide'>
                        {last4 ? ` **** **** **** ${last4}` : <Skeleton height='20px' />}
                    </Text>
                    <Text fontSize='sm' color={secondaryTextColor}>{`Expiry ${expiryDate}`}</Text>
                    <Text></Text>
                </Box>
                <Button variant='secondary' onClick={() => onEditClick(id)}>
                    Edit
                </Button>
            </Flex>
        </Box>
    );
};
