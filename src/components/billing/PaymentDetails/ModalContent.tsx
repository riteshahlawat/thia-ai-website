import {
    Text,
    Heading,
    ModalBody,
    ModalHeader,
    ModalCloseButton,
    useColorModeValue,
    ModalContent as DefaultModalContent,
} from '@chakra-ui/react';

export const ModalContent = ({ title, text, children }: { title: string; text: string; children?: React.ReactNode }) => {
    const bgColor = useColorModeValue('white', 'thia.gray.990');
    return (
        <DefaultModalContent py={5} rounded='xl' bg={bgColor}>
            <ModalCloseButton />
            <ModalHeader bg={bgColor}>
                <Heading mb={1}>{title}</Heading>
                <Text fontSize='md' color='thia.gray.500' fontWeight='medium'>
                    {text}
                </Text>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
        </DefaultModalContent>
    );
};
