import { Box } from '@chakra-ui/react';
import ContentContainer from '../../layout/ContentContainer';

interface Props extends React.ComponentPropsWithoutRef<typeof Box> {
  children?: React.ReactNode;
}

const Section = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Box as='section' {...rest}>
      <ContentContainer>{children}</ContentContainer>
    </Box>
  );
};

export default Section;
