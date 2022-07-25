import { Heading, ModalBody, ModalCloseButton, ModalContent as DefaultModalContent, ModalHeader, Text } from '@chakra-ui/react';

export const ModalContent = ({ title, text, children }: { title: string; text: string; children?: React.ReactNode }) => {
    return (
        <DefaultModalContent py={5} rounded='xl'>
            <ModalCloseButton />
            <ModalHeader>
                <Heading mb={1}>{title}</Heading>
                <Text fontSize='md' color='thia.gray.500'>
                    {text}
                </Text>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
        </DefaultModalContent>
    );
};
