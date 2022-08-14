import {
    Text,
    Heading,
    ModalBody,
    ModalHeader,
    ModalCloseButton,
    useColorModeValue,
    ModalContent as DefaultModalContent,
} from '@chakra-ui/react';

interface ModalContentProps {
    title: string;
    text?: string;
    children?: React.ReactNode;
}

export const ModalContent = ({ title, text, children }: ModalContentProps) => {
    const bgColor = useColorModeValue('white', 'thia.gray.990');
    return (
        <DefaultModalContent py={5} rounded='xl' bg={bgColor} overflow='none'>
            <ModalCloseButton />
            <ModalHeader bg={bgColor}>
                <Heading mb={1}>{title}</Heading>
                {text && (
                    <Text fontSize='md' color='thia.gray.500' fontWeight='medium'>
                        {text}
                    </Text>
                )}
            </ModalHeader>
            <ModalBody px={0}>{children}</ModalBody>
        </DefaultModalContent>
    );
};
