import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/core';
import { graphql, StaticQuery } from 'gatsby';
import ErrorBoundary from './ErrorBoundary';
import ExternalLink from './ExternalLink';

const ContactModal = ({ isOpen, onClose, title }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader maxWidth="97%">{title}</ModalHeader>
      <ModalCloseButton />
      <ErrorBoundary>
        <StaticQuery
          query={ContactQuery}
          render={data => (
            <ModalBody>
              Please send an email to{' '}
              <ExternalLink
                variant="standard"
                href={`mailto:${data.site.siteMetadata.social.contact}`}
              >
                {data.site.siteMetadata.social.contact}
              </ExternalLink>{' '}
              to report or remove this listing.
            </ModalBody>
          )}
        />
      </ErrorBoundary>
    </ModalContent>
  </Modal>
);

ContactModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const ContactQuery = graphql`
  query ReportRemoveContactQuery {
    site {
      siteMetadata {
        social {
          contact
        }
      }
    }
  }
`;

export default ContactModal;
