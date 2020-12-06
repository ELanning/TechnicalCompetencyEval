import React from 'react';
import styled from 'styled-components';
import styledTs from 'styled-components-ts';
import {
	background,
	BackgroundProps,
	border,
	BorderProps,
	color,
	ColorProps,
	compose,
	flexbox,
	FlexboxProps,
	grid,
	GridProps,
	layout,
	LayoutProps,
	position,
	PositionProps,
	shadow,
	ShadowProps,
	space,
	SpaceProps,
	typography,
	TypographyProps
} from 'styled-system';

type Props = BackgroundProps &
	BorderProps &
	ColorProps &
	FlexboxProps &
	GridProps &
	LayoutProps &
	PositionProps &
	ShadowProps &
	SpaceProps &
	TypographyProps & { children: React.ReactNode };

// See https://styled-system.com/api/ for detailed usage.
// eg <Box flex="1 1 auto" borderBottom="1px solid">Hello world</Box>
export const Box = styledTs<Props>(styled.div)(
	compose(typography, space, color, layout, flexbox, grid, background, border, position, shadow)
);

export function Flex({ children, ...rest }: Props) {
	return (
		<Box {...rest} display="flex">
			{children}
		</Box>
	);
}

export function Grid({ children, ...rest }: Props) {
	return (
		<Box {...rest} display="grid">
			{children}
		</Box>
	);
}

export function Center({ children, ...rest }: Props) {
	return (
		<Box {...rest} display="flex" alignItems="center" justifyContent="center">
			{children}
		</Box>
	);
}

export function Header({ children, ...rest }: Props) {
	return (
		<Box {...rest} fontSize="30px" fontWeight="600px">
			{children}
		</Box>
	);
}

export function Spacer({ height }: { height: string }) {
	return <Box height={height} />;
}
