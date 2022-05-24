import React from 'react';
import { Center, Heading } from '@chakra-ui/react';
import { ContentContainer } from '../src/modules/common/ContentContainer';

type Props = {};

const Careers = (props: Props) => {
  return (
    <ContentContainer>
      <Center className='fullHeightWithoutNav' pb='var(--header-height)'>
        <Heading>
          Sorry, we currently do not have any open positions, please check back later.
        </Heading>
      </Center>
    </ContentContainer>
  );
};

export default Careers;
