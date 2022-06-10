import { Box, Button, Flex, IconButton, VStack } from '@chakra-ui/react';
import { MdChevronRight, MdExpandMore } from 'react-icons/md';
import { useState } from 'react';
import { isEmpty } from 'src/utils/docs/common';
import Link from 'next/link';

const Branch = ({ branch, i }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Flex
                align='center'
                fontSize='sm'
                w='full'
                rounded='md'
                _hover={{ bg: 'thia.gray.990' }}
                py={1}
                pl={3}
            >
                <Link href={branch.slug}>
                    <Box w='full' as='a'>
                        {branch.title}
                    </Box>
                </Link>

                {!isEmpty(branch.children) && (
                    <IconButton
                        h='100%'
                        rounded='none'
                        aria-label='chevron'
                        bg='transparent'
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                        onClick={() => setIsOpen(!isOpen)}
                        icon={isOpen ? <MdExpandMore /> : <MdChevronRight />}
                    />
                )}
            </Flex>
            <Box pl={5} w='full' display={branch.children && isOpen ? 'block' : 'none'}>
                <Tree tree={branch.children} />
            </Box>
        </>
    );
};

const Tree = ({ tree }: any) => {
    return (
        <VStack spacing={1} w='full'>
            {tree.map((branch: any, i: number) => (
                <Branch branch={branch} index={i} key={i} />
            ))}
        </VStack>
    );
};

export const DocsNavigation = ({ tree }: any) => {
    return <Tree tree={tree} />;
};

{
    /* <>
<Flex fontSize='sm' w='full'>
    <Link key={i} href={branch.slug}>
        <Box width='full'>{branch.title}</Box>
    </Link>
    {branch.children.length ? (
        <Button
            bg='transparent'
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
            onClick={() => setIsOpen(!isOpen)}
        ></Button>
    ) : null}
</Flex>


</> */
}
