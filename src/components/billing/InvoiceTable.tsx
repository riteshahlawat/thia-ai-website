import { Flex, Icon, Link, Table, TableContainer, Tag, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { MdClose, MdDone } from 'react-icons/md';
import { VscFile } from 'react-icons/vsc';
import { BorderBox } from './BorderBox';

import Stripe from 'stripe';

export const InvoiceTable = ({ invoices }: { invoices: Stripe.Invoice[] | undefined }) => {
    const month = { month: 'short' };
    const monthAndDay = { month: 'short', day: 'numeric' };

    const timeToDate = (timestamp: number, options: any = { month: 'short', day: 'numeric', year: 'numeric' }) => {
        const date = new Date(timestamp);
        return date.toLocaleString('default', options);
    };

    const invoiceList = invoices?.sort((a, b) => a.created - b.created).reverse();
    const purpleText = useColorModeValue('thia.purple.500', 'thia.purple.200');
    const borderColor = useColorModeValue('thia.gray.100', 'thia.gray.950');
    return (
        <>
            <TableContainer as={BorderBox}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th borderColor={borderColor}>Invoice</Th>
                            <Th borderColor={borderColor}>Billing date</Th>
                            <Th borderColor={borderColor}>Payment Period</Th>
                            <Th borderColor={borderColor}>Status</Th>
                            <Th borderColor={borderColor}>Amount</Th>
                            <Th borderColor={borderColor}>Download</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {invoiceList?.map((invoice, i) => (
                            <Tr key={i}>
                                <Td borderColor={borderColor} fontWeight='semibold' color={purpleText}>
                                    <Flex align='center' gap={2}>
                                        <Tag rounded='full' colorScheme='purple' p={2}>
                                            <Icon fontSize={20} as={VscFile} />
                                        </Tag>
                                        <Text>{`Invoice #${invoice.number?.split('-')[1]} - ${timeToDate(invoice.created, month)} `}</Text>
                                    </Flex>
                                </Td>
                                <Td borderColor={borderColor}>{timeToDate(invoice.created)}</Td>
                                <Td borderColor={borderColor}>{`${timeToDate(invoice.period_start, monthAndDay)} - ${timeToDate(
                                    invoice.period_end,
                                    monthAndDay
                                )}`}</Td>
                                <Td borderColor={borderColor}>
                                    <Tag colorScheme={invoice.paid ? 'green' : 'red'} fontWeight='medium' rounded='full'>
                                        <Icon as={invoice.paid ? MdDone : MdClose} mr={1} fontSize='md' />
                                        {invoice.paid ? 'Paid' : 'Not paid'}
                                    </Tag>
                                </Td>
                                <Td borderColor={borderColor}>
                                    <Text as='span' casing='uppercase'>
                                        {invoice.currency}
                                    </Text>
                                    {` $${(invoice.amount_paid / 100).toFixed(2)}`}
                                </Td>
                                <Td borderColor={borderColor}>
                                    {invoice.invoice_pdf ? (
                                        <Link href={invoice.invoice_pdf} variant='purple'>
                                            Download
                                        </Link>
                                    ) : (
                                        '...pending'
                                    )}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};
