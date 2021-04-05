import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useTheme,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import { useNavigate } from '@reach/router';

import { Button, ContentBlock, Layout } from '../components';

import { VOLUNTEER_URL } from '../constants/about';
import AllySignUpForm from '../components/Forms/AllySignUpForm';
import BusinessSignUpForm from '../components/Forms/BusinessSignUpForm';
import BusinessFilter from '../components/Filters/BusinessFilter';
import { generateURL } from '../templates/businesses';

const InfoModal = ({ isOpen, onClose, modalType }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        {modalType === 'ally' && <AllySignUpForm />}
        {modalType === 'business' && <BusinessSignUpForm />}
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default () => {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();

  // TODO: Re-enable this lint rule once handleType() is used!
  // eslint-disable-next-line no-unused-vars
  const handleType = newType => {
    setModalType(newType);
    onOpen();
  };

  const ctaButtonStyle = {
    backgroundColor: theme.colors['rbb-orange'],
    borderColor: '#C34D2B',
    textDecoration: 'none',
  };

  const secondaryButtonStyle = {
    backgroundColor: theme.colors['rbb-white'],
    color: theme.colors['rbb-black-200'],
    textDecoration: 'none',
  };

  return (
    <Layout>
      <Flex direction="column" align="center" justify="center">
        <Box p={8}>
          <BusinessFilter
            onSearch={filters => {
              const url = generateURL(filters);
              console.log({ url });
              navigate(
                `/businesses/${filters.type}?location=${filters.location}#results`
              );
            }}
            selectedFilters={{ location: '', type: '' }}
            isSearching={false}
            variant="onLight"
            padding="3rem 0 0"
          />
        </Box>
        <ContentBlock
          layout="left"
          imageSource="https://res.cloudinary.com/dharhim/image/upload/v1617605611/samples/landscapes/nature-mountains.jpg" // @TODO :: Pass this to cloudinary
          backgroundColor="#5e56f6"
          backgroundMode="fade"
        >
          <Box pt={16} pb={[72, 72, 145]} ml={[0, 0, 10]} color="white">
            <Heading mb={theme.spacing.lg} as="h1">
              <Text
                lineHeight="0.5"
                fontWeight="900"
                fontSize={['50px', '50px', '50px', '72px']}
                fontFamily={theme.fonts['heading-slab']}
                textTransform="uppercase"
              >
                Forearm
              </Text>
              <Text
                fontSize={['90px', '90px', '90px', '140px']}
                fontWeight="900"
                lineHeight="1"
                fontFamily={theme.fonts['heading-slab']}
                textTransform="uppercase"
                ml={[0, 0, -1]}
              >
                World
              </Text>
              <Text
                lineHeight="0.5"
                fontWeight="900"
                fontSize={['50px', '50px', '50px', '72px']}
                fontFamily={theme.fonts['heading-slab']}
                textTransform="uppercase"
              >
                Business
              </Text>
            </Heading>
            <Text
              fontSize={theme.fontSizes.lg}
              fontFamily={theme.fonts.heading}
              lineHeight="1.25"
              py={8}
              maxW="540px"
            >
              add some description here!{' '}
            </Text>
            <ButtonGroup spacing={4} mt={theme.spacing.base}>
              <Button
                as={Link}
                href={'/him'}
                style={ctaButtonStyle}
                variant="cta"
                m={3}
                h="auto"
                px="30px"
              >
                Lets Get Started
              </Button>
            </ButtonGroup>
          </Box>
        </ContentBlock>

        <ContentBlock
          layout="full"
          imageSource="https://res.cloudinary.com/dharhim/image/upload/v1617605591/sample.jpg"
          backgroundColor={theme.colors['rbb-white']}
        >
          <Box py={[140, 140, 200]} maxW="574px">
            <Heading
              mb={theme.spacing.lg}
              fontFamily={theme.fonts['heading-slab']}
              fontWeight="900"
              fontSize="40px"
              lineHeight="1.2"
              textTransform="uppercase"
            >
              Already have an account!
            </Heading>
            <Text
              fontFamily={theme.fonts.heading}
              lineHeight="1.25"
              pb={theme.spacing.base}
            >
            </Text>
            <Button
              variant="cta"
              style={ctaButtonStyle}
              as={Link}
              href={VOLUNTEER_URL}
              mt={theme.spacing.base}
            >
              Sign In
            </Button>
          </Box>
        </ContentBlock>
      </Flex>
      <InfoModal isOpen={isOpen} modalType={modalType} onClose={onClose} />
    </Layout>
  );
};
