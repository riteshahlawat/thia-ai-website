import React from 'react';
import { motion } from 'framer-motion';
import { Flex, FormControl, Input, Text, useColorModeValue, VStack } from '@chakra-ui/react';

export const PaymentForm = () => {
    const inputBG = useColorModeValue('thia.gray.50', 'thia.gray.950');
    const borderColor = useColorModeValue('thia.gray.100', 'transparent');
    const color = 'thia.gray.600';

    return (
        <>
            <Text>Billing information</Text>
            <motion.div style={{ width: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <VStack spacing={3} pb={2}>
                    <Flex gap={3}>
                        <FormControl>
                            <Input
                                type='email'
                                bg={inputBG}
                                _placeholder={{ color }}
                                borderColor={borderColor}
                                border='2px'
                                placeholder='First name'
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                type='email'
                                bg={inputBG}
                                _placeholder={{ color }}
                                color={color}
                                borderColor={borderColor}
                                border='2px'
                                placeholder='Last name'
                            />
                        </FormControl>
                    </Flex>
                    <FormControl>
                        <Input
                            type='email'
                            bg={inputBG}
                            _placeholder={{ color }}
                            borderColor={borderColor}
                            border='2px'
                            placeholder='Address'
                        />
                    </FormControl>
                    <Flex gap={3}>
                        <FormControl>
                            <Input
                                type='email'
                                bg={inputBG}
                                _placeholder={{ color }}
                                borderColor={borderColor}
                                border='2px'
                                placeholder='City'
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                type='email'
                                bg={inputBG}
                                _placeholder={{ color }}
                                borderColor={borderColor}
                                border='2px'
                                placeholder='Zip code'
                            />
                        </FormControl>
                    </Flex>
                </VStack>
            </motion.div>
        </>
    );
};
