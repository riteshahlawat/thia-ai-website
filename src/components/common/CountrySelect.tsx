import { Countries } from '@/utils/isoCountries';
import { Select } from '@chakra-ui/react';
import React from 'react';

type Props = {};

export const CountrySelect = ({ ...rest }) => {
    return (
        <Select placeholder='Country' {...rest}>
            {Countries.map(({ name, a2code }) => (
                <option key={a2code} value={a2code}>
                    {name}
                </option>
            ))}
        </Select>
    );
};
