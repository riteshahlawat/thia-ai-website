/**
 * Copy from Chakra UI Skeleton theme source with default color modification.
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/skeleton.ts
 */

import { keyframes } from '@chakra-ui/system';
import type { SystemStyleFunction } from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';

const fade = (startColor: string, endColor: string) =>
    keyframes({
        from: { borderColor: startColor, background: startColor },
        to: { borderColor: endColor, background: endColor },
    });

const baseStyle: SystemStyleFunction = props => {
    const defaultStartColor = mode('var(--gray-100)', 'var(--gray-900)')(props);
    const defaultEndColor = mode('var(--gray-300)', 'var(--gray-700)')(props);

    const { startColor = defaultStartColor, endColor = defaultEndColor, speed } = props;

    return {
        animation: `${speed}s linear infinite alternate ${fade(startColor, endColor)}`,
    };
};

export const Skeleton = {
    baseStyle,
};
