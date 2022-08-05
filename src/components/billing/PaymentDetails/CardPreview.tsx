import Stripe from 'stripe';
import { motion } from 'framer-motion';
import { MdEdit } from 'react-icons/md';
import { Box, Flex, HStack, IconButton, Skeleton as ChakraSkeleton, Tag, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';

type Props = {
    paymentMethod: Stripe.PaymentMethod;
    onEditClick?: (arg0: string) => void;
    isDefault: boolean;
    [key: string]: any;
};

type SkeletonType = {
    isLoaded: boolean;
    children?: React.ReactNode;
    [key: string]: any;
};

const Skeleton = ({ isLoaded, children, ...rest }: SkeletonType) => {
    return (
        <ChakraSkeleton
            isLoaded={isLoaded}
            rounded='md'
            startColor={useColorModeValue('thia.gray.50', '#1a1a1a')}
            endColor={useColorModeValue('thia.gray.50', '#2d2d2d')}
            {...rest}
        >
            {children}
        </ChakraSkeleton>
    );
};

export const CardPreview = ({ paymentMethod, isDefault, onEditClick, ...rest }: Props) => {
    const card = paymentMethod.card;
    const brand = card?.brand ?? '----';
    const exp_month = card?.exp_month ?? '--';
    const exp_year = card?.exp_year ?? '----';
    const last4 = card?.last4 ?? '----';
    const expiryDate = `${String(exp_month).padStart(2, '0')}/${exp_year}`;
    const cardBGColor = useColorModeValue('white', 'thia.gray.950');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');
    const borderColor = useColorModeValue('thia.gray.100', 'transparent');

    const cardIconsUrls: { [key: string]: string } = {
        visa: useColorModeValue('/cards/visa-blue.svg', '/cards/visa-white.svg'),
        mastercard: '/cards/mastercard.svg',
        discover: '/cards/discover.png',
        jcb: '/cards/jcb.svg',
        unionpay: '/cards/unionpay.svg',
        diners: '/cards/diners.svg',
        amex: '/cards/amex.svg',
    };

    return (
        <motion.div style={{ width: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box w='full' py={5} px={5} rounded='xl' bg={cardBGColor} shadow='sm' border='1px' borderColor={borderColor} {...rest}>
                <HStack gap={2} flexWrap='nowrap'>
                    <Skeleton isLoaded={!!card} h='45px' w='60px'>
                        <Box
                            h='full'
                            position='relative'
                            border='1px'
                            rounded='lg'
                            borderColor={useColorModeValue('thia.gray.100', 'thia.gray.900')}
                        >
                            {cardIconsUrls.hasOwnProperty(brand) && <Image layout='fill' objectFit='contain' src={cardIconsUrls[brand]} />}
                        </Box>
                    </Skeleton>
                    <Flex flexDir='column' flexGrow={1} gap={1}>
                        <Flex gap={2}>
                            <Skeleton isLoaded={!!card}>
                                <Text fontSize='sm' fontWeight='semibold' letterSpacing='wide'>
                                    {`${brand} •••• ${last4}`}
                                </Text>
                            </Skeleton>
                            {!!card && isDefault && (
                                <Box h='full'>
                                    <Tag colorScheme='purple' size='sm' pt={0.5}>
                                        Default
                                    </Tag>
                                </Box>
                            )}
                        </Flex>
                        <Skeleton isLoaded={!!card}>
                            <Text fontSize='sm' color={secondaryTextColor}>{`Expires ${expiryDate}`}</Text>
                        </Skeleton>
                    </Flex>
                    {onEditClick && (
                        <IconButton aria-label='edit' icon={<MdEdit />} variant='secondary' onClick={() => onEditClick(paymentMethod.id)} />
                    )}
                </HStack>
            </Box>
        </motion.div>
    );
};
