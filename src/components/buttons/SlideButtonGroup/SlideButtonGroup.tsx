import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { getValidChildren } from '@/utils/common';
import { SlideButtonGroupType } from '@/types/SlideButtonTypes';

export const SlideButtonGroup = ({ children }: SlideButtonGroupType) => {
    const [active, setActive] = useState(0);
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    const num = getValidChildren(children).length;
    const widthPercent = (1 / num) * 100;

    const setSize = () => {
        ref.current && setWidth((ref.current.clientWidth - 8) / num); // the 12 is for the 12 pxs of padding,
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
                p={1}
                w='full'
                bg={useColorModeValue('thia.gray.100', 'thia.gray.990')}
                rounded='lg'
                pos='relative'
                ref={ref}
            >
                <motion.div
                    style={{
                        top: 0,
                        position: 'absolute',
                        width: `calc(${widthPercent}% - 4px )`,
                        height: '100%',
                        padding: '4px 0',
                        flex: 1,
                    }}
                    animate={{ x: width * active }}
                    transition={{ type: 'spring', bounce: 0.1, stiffness: 700, damping: 50 }}
                >
                    <Box bg={useColorModeValue('white', 'thia.gray.950')} h='full' rounded='md' />
                </motion.div>
                {React.Children.map(children, (child, i) =>
                    React.cloneElement(child, { onClick: () => setActive(i), active: active === i })
                )}
            </Flex>
        </>
    );
};
