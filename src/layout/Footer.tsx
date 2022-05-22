import {
  Box,
  Stack,
  Text,
  Input,
  IconButton,
  useColorModeValue,
  Flex,
  VStack,
  HStack,
  Divider,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { links, socials } from '../constants';
import { BiMailSend } from 'react-icons/bi';
import ContentContainer from './ContentContainer';
import Link from '../common/Link';

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      as='footer'
      bg={useColorModeValue('thia.bg-base', 'thia.bg-dark')}
      color={useColorModeValue('thia.text-base', 'thia.text-dark')}
    >
      <ContentContainer>
        <Grid
          templateColumns={{
            base: '1fr 1fr 1fr',
            md: '2fr 1fr 1fr 1fr',
            lg: '2fr 1fr 1fr 1fr 2fr',
          }}
          fontSize='sm'
          gap={8}
          py={12}
        >
          <GridItem colSpan={{ base: 3, md: 1 }}>
            <VStack spacing={6} align='flex-start'>
              <Box fontSize='3xl'>Thia</Box>
              <Text fontSize={16}>Making AutoML Simple.</Text>
              <Stack direction={'row'} spacing={6}>
                {Object.values(socials).map(({ label, path, icon }) => (
                  <Link href={path} key={label} passHref>
                    <IconButton
                      key={label}
                      rounded='full'
                      aria-label={label}
                      variant='secondary'
                      _hover={{
                        borderRadius: '3xl',
                        bg: useColorModeValue('thia.gray.200', 'thia.gray.900'),
                      }}
                    >
                      {icon}
                    </IconButton>
                  </Link>
                ))}
              </Stack>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack align={'flex-start'}>
              <ListHeader>Product</ListHeader>
              <Link href={links.docs.index.path}>{links.docs.index.label}</Link>
              <Link href={links.pricing.index.path}>{links.pricing.index.label}</Link>
              <Link href={links.download.index.path}>{links.download.index.label}</Link>
              <Link href={'#'}>Features</Link>
              <Link href={'#'}>Tutorials</Link>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack align={'flex-start'}>
              <ListHeader>Company</ListHeader>
              <Link href={'/about'}>About us</Link>
              <Link href={'#'}>Blog</Link>
              <Link href={'#'}>Contact us</Link>
              <Link href={'#'}>Careers</Link>
              <Link href={'#'}>Partners</Link>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack align={'flex-start'}>
              <ListHeader>Support</ListHeader>
              <Link href={'#'}>Help Center</Link>
              <Link href={'#'}>Fourms</Link>
              <Link href={'#'}>Guides</Link>
              <Link href={'#'}>FAQ</Link>
            </VStack>
          </GridItem>
          <GridItem colSpan={{ base: 3, sm: 2, md: 1 }}>
            <VStack align={'flex-start'}>
              <ListHeader>Subscribe to our newsletter</ListHeader>
              <HStack w='full'>
                <Input
                  placeholder={'Your email address'}
                  variant='filled'
                  colorScheme='thia.gray'
                  bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                  _hover={{ bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200') }}
                />
                <IconButton aria-label='Subscribe' variant='primary' icon={<BiMailSend />} />
              </HStack>
            </VStack>
          </GridItem>
        </Grid>
        <Divider />
        <Flex justify='space-between' py='8' fontSize='sm' gap={4}>
          <Text>© 2021 Thia CA, inc. All rights reserved</Text>
          <HStack spacing={{ base: 4, md: 8 }} align='start'>
            <Link href={'#'}>
              Terms
              <Box as='span' display={{ base: 'none', md: 'inline' }}>
                {' of Service'}
              </Box>
            </Link>
            <Link href={'#'}>
              Privacy
              <Box as='span' display={{ base: 'none', md: 'inline' }}>
                {' Policy'}
              </Box>
            </Link>
            <Link href={'#'}>License</Link>
          </HStack>
        </Flex>
      </ContentContainer>
    </Box>
  );
}
