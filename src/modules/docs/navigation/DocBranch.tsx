import { useEffect, useState } from 'react';
import { Tree } from './DocTree';
import { isEmpty } from '@chakra-ui/utils';
import { ChakraNextLink } from '../../common/ChakraNextLink';
import { BranchType, TreeNode } from 'src/types/DocsTypes';
import { MdChevronRight, MdExpandMore } from 'react-icons/md';
import { Box, Flex, IconButton, useColorModeValue } from '@chakra-ui/react';

export const Branch = ({ branch, depth, activePath }: BranchType) => {
    const [expanded, setExpanded] = useState(false);
    const [active, setActive] = useState(false);

    const toggleExpanded = () => setExpanded(!expanded);

    useEffect(() => {
        const activePathWithoutId = activePath.split('#')[0];
        const activeStatus = branch.path === activePathWithoutId;
        setActive(activeStatus);
        setExpanded(
            activeStatus ||
                branch.children.map((_: TreeNode) => _.path).includes(activePathWithoutId)
        );
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
                w='full'
                align='center'
                fontSize='sm'
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
                        fontWeight: active ? 600 : 400,
                        _hover: { textDecoration: 'none', color: 'white'},
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
