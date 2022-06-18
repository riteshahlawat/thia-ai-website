import { useColorModeValue, VStack } from '@chakra-ui/react';
import { TreeNode, TreeType } from 'src/types/DocsTypes';
import { Branch } from './DocBranch';

export const Tree = ({ tree, depth, activePath }: TreeType) => {
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
