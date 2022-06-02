import React from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import Google from '../../public/btn_google_light_normal_ios.svg';

type Props = {
    children?: string;
    isActive?: boolean;
    isLoading?: boolean;
    isDiabled?: boolean;
    onCLick?: () => void;
};

export const GoogleButton = (props: Props) => {
    return (
        <Button
            w='full'
            bg='white'
            pr={3}
            pl={0}
            overflow='hidden'
            leftIcon={<Google />}
            _hover={{ bg: 'white', borderRadius: 'lg' }}
            _active={{ bg: 'white' }}
            color='black'
            border='1px'
            borderColor={useColorModeValue('thia.gray.100', 'thia.gray.950')}
            onClick={props.onCLick}
            isLoading={props.isLoading}
            isActive={props.isActive}
            isDisabled={props.isDiabled}
        >
            {props.children}
        </Button>
    );
};
