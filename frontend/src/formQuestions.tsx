import React from 'react';
import { Box } from 'layout';

export const question = {
	number1: {
		label: 'When is it appropriate to use a 3rd party library versus writing it yourself?',
		name: 'question 1'
	},
	number2: {
		label: 'What are your favorite books on Software Development, if any? Why?',
		name: 'question 2'
	},
	number3: {
		label: (
			<Box display="inline-block">
				What are your thoughts on{' '}
				<a
					href="https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)"
					target="_blank"
					rel="noreferrer"
				>
					inheritance
				</a>{' '}
				for code reuse?
			</Box>
		),
		name: 'question 3'
	},
	number4: {
		label: (
			<Box display="inline-block">
				What are the advantages and/or disadvantages of{' '}
				<a
					href="https://en.wikipedia.org/wiki/White-box_testing"
					target="_blank"
					rel="noreferrer"
				>
					white-box testing
				</a>{' '}
				over{' '}
				<a
					href="https://en.wikipedia.org/wiki/Black-box_testing"
					target="_blank"
					rel="noreferrer"
				>
					black-box testing
				</a>
				?
			</Box>
		),
		name: 'question 4'
	},
	number5: {
		label: 'Why is consistency important? When is it appropriate to be inconsistent?',
		name: 'question 5'
	}
};
