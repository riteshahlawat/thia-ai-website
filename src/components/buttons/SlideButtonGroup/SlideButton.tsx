import React from 'react';
import { ButtonType } from '@/types/SlideButtonTypes';
import { Button, useColorModeValue } from '@chakra-ui/react';

export const SlideButton = ({ label, callback, onClick, active }: ButtonType) => {
    return (
        <Button
            rounded='md'
            flex={1}
            bg='transparent'
            color={useColorModeValue(
                active ? 'black' : 'thia.gray.800',
                active ? 'white' : 'thia.gray.400'
            )}
            _hover={{
                bg: 'transparent',
            }}
            _active={{ bg: 'transparent' }}
            onClick={() => {
                onClick && onClick();
                callback();
            }}
        >
            {label}
        </Button>
    );
};
