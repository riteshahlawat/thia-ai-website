import { Box, Flex, IconButton, useColorModeValue, VStack } from '@chakra-ui/react';
import { MdChevronRight, MdExpandMore } from 'react-icons/md';
import { useState } from 'react';
import { ChakraNextLink } from '../../common/ChakraNextLink';
import { useRouter } from 'next/router';
import { Tree } from './DocTree';
import { TreeNode } from 'src/types/DocsTypes';

export const DocsNavigation = ({ tree }: { tree: TreeNode[] }) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);
    const router = useRouter();

    return (
        <Box
            pos='sticky'
            flexShrink={0}
            overflowY='auto'
            top='var(--header-height)'
            pt={{ base: 0, sm: 7 }}
            pl={{ base: 5, sm: 0 }}
            pr={5}
            w={{ base: 'full', sm: '350px' }}
            h={{ base: 'full', sm: 'var(--fullHeightWithoutNav)' }}
            maxH='var(--fullHeightWithoutNav)'
            bg={{ base: useColorModeValue('white', 'black'), sm: 'transparent' }}
            borderBottom={{ base: '1px', sm: 'none' }}
            borderTop={{ base: '1px', sm: 'none' }}
            borderColor={useColorModeValue('thia.gray.100', 'thia.gray.950')}
        >
            <VStack align='start' fontSize='md'>
                <Flex align='center' py={1} w='full'>
                    <ChakraNextLink
                        href={'/docs'}
                        styleProps={{
                            w: 'full',
                            _hover: { textDecoration: 'none' },
                            py: 1.5,
                            fontSize: 'md',
                        }}
                    >
                        Documentation
                    </ChakraNextLink>
                    <IconButton
                        visibility={{ base: 'visible', sm: 'hidden' }}
                        h='100%'
                        rounded='none'
                        aria-label='chevron'
                        bg='transparent'
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                        onClick={toggleExpanded}
                        icon={expanded ? <MdExpandMore /> : <MdChevronRight />}
                    />
                </Flex>
                <Box w='full' pb={5} display={{ base: expanded ? 'block' : 'none', sm: 'block' }}>
                    <Tree tree={tree} depth={0} activePath={router.asPath} />
                </Box>
            </VStack>
        </Box>
    );
};
