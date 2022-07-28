import Stripe from 'stripe';
import { motion } from 'framer-motion';
import { MdEdit } from 'react-icons/md';
import { Box, Flex, HStack, IconButton, Skeleton, Tag, Text, useColorModeValue } from '@chakra-ui/react';

type Props = {
    id: string;
    card: Stripe.PaymentMethod.Card | undefined;
    onEditClick?: (arg0: string) => void;
    isDefautlt: boolean;
    [key: string]: any;
};

export const CardPreview = ({ id, card, isDefautlt, onEditClick, ...rest }: Props) => {
    const brand = card?.brand ?? '----';
    const exp_month = card?.exp_month ?? '--';
    const exp_year = card?.exp_year ?? '----';
    const last4 = card?.last4 ?? '----';
    const expiryDate = `${String(exp_month).padStart(2, '0')}/${exp_year}`;
    const cardBGColor = useColorModeValue('thia.gray.50', 'thia.gray.950');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');
    const borderColor = useColorModeValue('thia.gray.100', 'transparent');

    return (
        <motion.div style={{ width: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box w='full' p={5} rounded='xl' bg={cardBGColor} shadow='sm' border='2px' borderColor={borderColor} {...rest}>
                <HStack gap={3} flexWrap='nowrap'>
                    <Box>Card</Box>
                    <Flex flexDir='column' flexGrow={1}>
                        <Flex gap={2}>
                            <Text fontSize='sm' fontWeight='semibold' letterSpacing='wide'>
                                {last4 ? `${brand} **** ${last4}` : <Skeleton height='20px' />}{' '}
                            </Text>
                            {isDefautlt && (
                                <Box h='full'>
                                    <Tag colorScheme='purple' size='sm' pt={0.5}>
                                        Default
                                    </Tag>
                                </Box>
                            )}
                        </Flex>
                        <Text fontSize='sm' color={secondaryTextColor}>{`Expires ${expiryDate}`}</Text>
                        <Text></Text>
                    </Flex>

                    {onEditClick && (
                        <IconButton aria-label='edit' icon={<MdEdit />} variant='secondary' onClick={() => onEditClick(id ?? '')} />
                    )}
                </HStack>
            </Box>
        </motion.div>
    );
};
