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
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
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

const socials = [
  { label: 'Twitter', path: '#', icon: <FaTwitter /> },
  { label: 'LinkedIn', path: '#', icon: <FaLinkedin /> },
  { label: 'Github', path: '#', icon: <FaGithub /> },
];

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('brand.bg.light', 'brand.bg.dark')}
      color={useColorModeValue('brand.color.light', 'brand.color.dark')}
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
                {socials.map(({ label, path, icon }) => (
                  <IconButton
                    key={label}
                    as='a'
                    href={path}
                    rounded='full'
                    aria-label={label}
                    icon={icon}
                  ></IconButton>
                ))}
              </Stack>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack align={'flex-start'}>
              <ListHeader>Product</ListHeader>
              <Link href='/docs'>Documentation</Link>
              <Link href='/pricing'>Pricing</Link>
              <Link href='/download'>Download</Link>
              <Link href={'#'}>Features</Link>
              <Link href={'#'}>Tutorials</Link>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack align={'flex-start'}>
              <ListHeader>Company</ListHeader>
              <Link href={'#'}>About us</Link>
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
                <Input placeholder={'Your email address'} variant='filled' />
                <IconButton
                  aria-label='Subscribe'
                  bg={useColorModeValue('brand.primary.light', 'brand.primary.dark')}
                  _hover={{
                    bg: useColorModeValue('brand.primaryHover.light', 'brand.primaryHover.dark'),
                  }}
                  _active={{
                    bg: useColorModeValue('brand.primaryHover.light', 'brand.primaryHover.dark'),
                  }}
                  icon={<BiMailSend />}
                />
              </HStack>
            </VStack>
          </GridItem>
        </Grid>
        <Divider />
        <Flex justify='space-between' py='8' fontSize='sm' gap={4}>
          <Text>© 2021 Thia CA, inc. All rights reserved</Text>
          <HStack spacing={{ base: 4, md: 8 }} align='start'>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>License</Link>
          </HStack>
        </Flex>
      </ContentContainer>
    </Box>
  );
}
