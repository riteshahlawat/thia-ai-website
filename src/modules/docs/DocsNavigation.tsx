import { Box, Flex, IconButton, useColorModeValue, VStack } from '@chakra-ui/react';
import { MdChevronRight, MdExpandMore } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { isEmpty } from '@chakra-ui/utils';
import { ChakraNextLink } from '../common/ChakraNextLink';
import { useRouter } from 'next/router';
import { BranchType, TreeNode, TreeType } from 'src/types/DocsTypes';

const Branch = ({ branch, depth, activePath }: BranchType) => {
    const [expanded, setExpanded] = useState(false);
    const [active, setActive] = useState(false);

    const toggleExpanded = () => setExpanded(!expanded);

    useEffect(() => {
        const activePathWithoutId = activePath.split('#')[0];
        const activeStatus = branch.path === activePathWithoutId;
        setActive(activeStatus);
        setExpanded(activeStatus || branch.children.map(_ => _.path).includes(activePathWithoutId));
    }, [branch, activePath]);

    const textColor = () =>
        active
            ? useColorModeValue('thia.text-base', 'thia.text-dark')
            : depth
            ? useColorModeValue('thia.gray.700', 'thia.gray.300')
            : useColorModeValue('thia.gray.800', 'thia.gray.200');

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
            >
                <ChakraNextLink
                    href={branch.slug}
                    styleProps={{
                        w: 'full',
                        fontWeight: depth ? 400 : 600,
                        _hover: { textDecoration: 'none' },
                        color: textColor,
                        py: 1.5,
                        pl: 3,
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
            <Box pl={5} w='full' display={!isEmpty(branch.children) && expanded ? 'block' : 'none'}>
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
            borderLeft={depth ? '4px' : 'none'}
            borderColor={useColorModeValue('thia.gray.100', 'thia.gray.950')}
        >
            {tree.map((branch: TreeNode, i: number) => (
                <Branch key={i} branch={branch} depth={depth} activePath={activePath} />
            ))}
        </VStack>
    );
};

export const DocsNavigation = ({ tree }: { tree: TreeNode[] }) => {
    const router = useRouter();

    return (
        <>
            <ChakraNextLink
                href={'/docs'}
                styleProps={{
                    w: 'full',
                    _hover: { textDecoration: 'none' },
                    py: 1.5,
                    pl: 3,
                    fontSize: 'sm',
                }}
            >
                Documentation
            </ChakraNextLink>
            <Tree tree={tree} depth={0} activePath={router.asPath} />
        </>
    );
};
