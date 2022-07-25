import { Box, Button, Flex, HStack, IconButton, Skeleton, Tag, Text, useColorModeValue } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import Stripe from 'stripe';

type Props = {
    id: string;
    card: Stripe.PaymentMethod.Card | undefined;
    onEditClick: (arg0: string) => void;
    isDefautlt: boolean;
};

export const CardPreview = ({ id, card, isDefautlt, onEditClick }: Props) => {
    const brand = card?.brand ?? '----';
    const exp_month = card?.exp_month ?? '--';
    const exp_year = card?.exp_year ?? '----';
    const last4 = card?.last4 ?? '----';
    const expiryDate = `${String(exp_month).padStart(2, '0')}/${exp_year}`;
    const cardBGColor = useColorModeValue('white', 'thia.gray.990');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');

    return (
        <Box w='full' p={5} rounded='xl' bg={cardBGColor} shadow='sm'>
            <HStack gap={5} flexWrap='nowrap'>
                <Box>Card</Box>
                <Flex flexDir='column' flexGrow={1}>
                    <Text fontSize='sm' fontWeight='semibold' letterSpacing='wide' whiteSpace='nowrap'>
                        {last4 ? `**** **** **** ${last4}` : <Skeleton height='20px' />}
                    </Text>

                    <Text fontSize='sm' color={secondaryTextColor}>{`Expires ${expiryDate}`}</Text>
                    <Text></Text>
                </Flex>
                {isDefautlt && (
                    <Box h='full'>
                        <Tag mb={4} colorScheme='purple'>
                            Default
                        </Tag>
                    </Box>
                )}
                <IconButton aria-label='edit' icon={<MdEdit />} variant='secondary' onClick={() => onEditClick(id)} />
            </HStack>
        </Box>
    );
};
