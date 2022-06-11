import { Box, Flex, IconButton, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { MdChevronRight, MdExpandMore } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { isEmpty } from 'src/utils/docs/common';
import { ChakraNextLink } from '../common/ChakraNextLink';
import { useRouter } from 'next/router';

type BranchType = {
    branch: any;
    depth: number;
    activePath: string;
};

type TreeType = {
    tree: any;
    depth: number;
    activePath: string;
};

const Branch = ({ branch, depth, activePath }: BranchType) => {
    const [expanded, setExpanded] = useState(false);
    const [active, setActive] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);

    useEffect(() => {
        if (activePath && branch.slug === activePath.split('/docs/')[1]) {
            setActive(true);

            if (!isEmpty(branch.children)) setExpanded(true);
        } else {
            setActive(false);
        }
    }, [activePath]);

    const textColor = () => {
        if (active) return useColorModeValue('thia.text-base', 'thia.text-dark');
        else
            return depth
                ? useColorModeValue('thia.gray.700', 'thia.gray.300')
                : useColorModeValue('thia.gray.800', 'thia.gray.200');
    };
    return (
        <>
            <Flex
                align='center'
                fontSize='sm'
                w='full'
                rounded='md'
                bg={active ? useColorModeValue('thia.purple.50', 'thia.purple.900') : 'transparent'}
                _hover={{
                    bg: active
                        ? useColorModeValue('thia.purple.50', 'thia.purple.900')
                        : useColorModeValue('thia.gray.100', 'thia.gray.950'),
                }}
                py={1.5}
                pl={3}
            >
                <ChakraNextLink
                    href={branch.slug}
                    styleProps={{
                        w: 'full',
                        fontWeight: depth ? 400 : 600,
                        _hover: { textDecoration: 'none' },
                        color: textColor,
                    }}
                >
                    {branch.title}
                </ChakraNextLink>

                {!isEmpty(branch.children) && (
                    <IconButton
                        h='100%'
                        rounded='none'
                        aria-label='chevron'
                        bg='transparent'
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                        onClick={toggleExpanded}
                        icon={expanded ? <MdExpandMore /> : <MdChevronRight />}
                    />
                )}
            </Flex>
            <Box pl={5} w='full' display={branch.children && expanded ? 'block' : 'none'}>
                <Tree tree={branch.children} depth={depth + 1} activePath={activePath} />
            </Box>
        </>
    );
};

const Tree = ({ tree, depth, activePath }: TreeType) => {
    return (
        <VStack
            w='full'
            pl={3}
            spacing={2}
            borderLeft={depth ? '1px' : 'none'}
            borderColor={useColorModeValue('thia.gray.400', 'thia.gray.950')}
        >
            {tree.map((branch: any, i: number) => (
                <Branch key={i} branch={branch} depth={depth} activePath={activePath} />
            ))}
        </VStack>
    );
};

export const DocsNavigation = ({ tree }: any) => {
    const router = useRouter();
    return <Tree tree={tree} depth={0} activePath={router.asPath} />;
};
