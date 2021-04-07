import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useTheme,
} from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { AllyFeed, AllyFilter, Image, Layout, PageHero } from '../components';
import Button from '../components/Button';
import Link from '../components/Link';

export default function Allies() {
  const [allyFilters, setAllyFilters] = useState({
    skill: '',
    location: '',
  });
  const theme = useTheme();

  const [acceptedTAC, setAcceptedTAC] = useLocalStorage('acceptedTAC', false);

  const pageSubtitle = (
    <Text
      fontFamily={theme.fonts.heading}
      lineHeight="1.25"
      pb={theme.spacing.base}
      textAlign="center"
    >
      Himanshu NGO listing Here 
    </Text>
  );

  const heroBackgroundImageUrl =
    'https://res.cloudinary.com/dharhim/image/upload/v1617605591/sample.jpg';

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!acceptedTAC) onOpen();
  }, [acceptedTAC, onOpen]);

  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <PageHero
          title="Allies"
          subtitle={pageSubtitle}
          heroImageUrl={heroBackgroundImageUrl}
          hasFadedHeroImage
        />
        <AllyFilter onSearch={setAllyFilters} />
        {acceptedTAC ? (
          <AllyFeed filters={allyFilters} />
        ) : (
          <>
            <Modal
              isOpen={isOpen}
              onClose={onClose}
              closeOnEsc={false}
              size="lg"
              closeOnOverlayClick={false}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader padding={0} margin={0}>
                  <Image
                    alt="Person with a bandana over their mouth, holding one arm in the air"
                    publicId="assets/ally-sign-up"
                  />
                </ModalHeader>
                <ModalBody fontSize="lg" mt="8">
                  Please read and agree to our{' '}
                  <Link variant="cta" href="/legal#terms" target="_blank">
                    terms and conditions
                  </Link>{' '}
                  to access our Ally list and contacts.
                </ModalBody>
                <ModalFooter>
                  <Button
                    data-testid="toc-agree"
                    margin="0 auto"
                    variant="primary"
                    rightIcon="check"
                    onClick={() => {
                      setAcceptedTAC(true);
                      onClose();
                    }}
                  >
                    I agree
                  </Button>
                </ModalFooter>

                <Box textAlign="center" marginBottom="0.625rem">
                  or, {''}
                  <Link variant="cta" href="/">
                    back to the homepage
                  </Link>
                </Box>
              </ModalContent>
            </Modal>
          </>
        )}
      </Flex>
    </Layout>
  );
}
