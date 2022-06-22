import { useEffect, useState } from 'react';
import { Tree } from './DocTree';
import { isEmpty } from '@chakra-ui/utils';
import { ChakraNextLink } from '@/components/common/ChakraNextLink';
import { BranchType, TreeNode } from '@/types/DocsTypes';
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

    return (
        <>
            <Flex
                w='full'
                align='center'
                fontSize='sm'
                rounded='md'
                bg={useColorModeValue(
                    active ? 'thia.purple.50' : 'transparent',
                    active ? 'thia.purple.900' : 'transparent'
                )}
                _hover={{
                    bg: useColorModeValue(
                        active ? 'thia.purple.50' : 'thia.gray.100',
                        active ? 'thia.purple.900' : 'thia.gray.950'
                    ),
                }}
            >
                <ChakraNextLink
                    href={branch.slug}
                    styleProps={{
                        w: 'full',
                        fontWeight: depth ? 400 : 600,
                        _hover: { textDecoration: 'none' },
                        color: useColorModeValue(
                            active ? 'thia.gray.700' : depth ? 'thia.gray.700' : 'thia.gray.800',
                            active ? 'thia.text-dark' : depth ? 'thia.gray.300' : 'thia.gray.200'
                        ),
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
