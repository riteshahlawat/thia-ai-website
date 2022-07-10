import { Box, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getValidChildren } from '@/utils/common';

type ButtonType = { label: string; callback: () => void; onClick?: () => void; active?: boolean };

export const SlideButton = ({ label, callback, onClick, active }: ButtonType) => {
    return (
        <Button
            rounded='md'
            flex={1}
            bg='transparent'
            color={useColorModeValue(
                active ? 'black' : 'thia.gray.700',
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

type SlideButtonGroupType = {
    children: React.ReactElement<ButtonType> | React.ReactElement<ButtonType>[];
};

export const SlideButtonGroup = ({ children }: SlideButtonGroupType) => {
    const [active, setActive] = useState(0);
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    const childrenArr = getValidChildren(children);
    const num = childrenArr.length;
    const widthPercent = (1 / num) * 100;

    const setSize = () => {
        ref.current && setWidth((ref.current.clientWidth - 12) / num); // the 12 is for the 12 pxs of padding,
    };

    useEffect(() => {
        addEventListener('resize', handleResize);
        return () => removeEventListener('resize', handleResize);
    });

    useEffect(setSize, [ref, num]);

    let resizeTimer: any;
    const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setSize, 100);
    };

    return (
        <>
            <Flex
                p={1.5}
                w='full'
                bg={useColorModeValue('thia.gray.50', 'thia.gray.990')}
                rounded='lg'
                pos='relative'
                ref={ref}
            >
                <motion.div
                    style={{
                        top: 0,
                        position: 'absolute',
                        width: `calc(${widthPercent}% - 6px )`,
                        height: '100%',
                        padding: '8px 0',
                        flex: 1,
                    }}
                    animate={{ x: width * active }}
                    transition={{ type: 'spring', bounce: 0.1, stiffness: 700, damping: 50 }}
                >
                    <Box
                        bg={useColorModeValue('thia.gray.100', 'thia.gray.950')}
                        h='full'
                        rounded='md'
                    />
                </motion.div>
                {React.Children.map(children, (child, i) =>
                    React.cloneElement(child, { onClick: () => setActive(i), active: active === i })
                )}
            </Flex>
        </>
    );
};
