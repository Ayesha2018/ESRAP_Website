import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useTheme,
} from '@chakra-ui/core';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { handleLocationToCoords } from '../../api/geocode';
import PrimaryButton from '../Buttons/PrimaryButton';
import { Button } from '../../components';

const businessTypes = [
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'food', label: 'Food and Beverage' },
  { id: 'health', label: 'Health and Wellness' },
  { id: 'professional', label: 'Professional Services' },
  { id: 'retail', label: 'Retail' },
  { id: 'other', label: 'Other' },
];

function BusinessFilter({ isSearching, onSearch, selectedFilters, variant }) {
  const [location, setLocation] = useState(selectedFilters.location || '');
  const typeRef = useRef();
  const theme = useTheme();

  const typeToLabel = selectedFilters.type.replace(/-/g, ' ');

  const rbbWhite = theme.colors['rbb-white'];
  const rbbBlack = theme.colors['rbb-black-000'];
  const ctaButtonStyle = {
    backgroundColor: theme.colors['rbb-orange'],
    borderColor: '#C34D2B',
    textDecoration: 'none',
  };

  const variants = {
    onDark: {
      labelColors: [rbbBlack, rbbBlack, rbbWhite],

    },
    onLight: {
      labelColors: [rbbBlack, rbbBlack, rbbBlack],
      buttonComponent: () => (
        <Button
          style={ctaButtonStyle}
          fontSize="button"
          lineHeight="button"
          padding={theme.buttons.primary.padding}
          onClick={handleSearchClick}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleSearchKeyPress(event);
            }
          }}
          isLoading={isSearching}
        >
        
        </Button>
      ),
    },
  };

  const handleSearchClick = async event => {
    event.preventDefault();
    const coordinates = await handleLocationToCoords(location);
    onSearch({
      type: typeRef.current.value,
      location: location,
      coordinates,
    });
  };

  const handleSearchKeyPress = async event => {
    event.preventDefault();
    const coordinates = await handleLocationToCoords(location);
    onSearch({
      type: typeRef.current.value,
      location,
      coordinates,
    });
  };

  const selectedVariant = variants[variant];

  let SubmitButton = selectedVariant.buttonComponent;
//himanshu changes done to remove search box on the main page
  return (
    <FormControl
      bg={[rbbWhite, rbbWhite, 'rgba(0,0,0,0)']}
      maxWidth="1000px"
      padding={['24px', '24px', '0 24px']}
      fontFamily="Arvo"
      margin="0 auto"
    >

    </FormControl>
  );
}

BusinessFilter.propTypes = {
  isSearching: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['onLight', 'onDark']).isRequired,
};

BusinessFilter.defaultProps = {
  variant: 'onDark',
};

export default BusinessFilter;
