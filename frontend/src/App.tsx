import './App.css';
import React from 'react';
import { Form, Input, Button } from 'antd';
import { Center, Box, Spacer, Header } from 'layout';

const question = {
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
	},
	number6: {
		label: 'Should assertions be left in production code? Why or why not?',
		name: 'question 6'
	}
};

function validateWordLimit(_: any, input: string) {
	const wordCount = input.split(' ').length;
	const wordCountMax = 500;
	return wordCount > wordCountMax
		? Promise.reject(`Word count must not exceed ${wordCountMax}.`)
		: Promise.resolve();
}

const questionRules = [{ required: true, validator: validateWordLimit }];

const App = () => {
	const [form] = Form.useForm();
	const onFinish = (values: any) => {
		console.log(JSON.stringify(values));
	};

	return (
		<Center background="linear-gradient(180deg, #cec5fa 36%, #fef1d2 36%);" height="100vh">
			<Box
				backgroundColor="white"
				borderTop="solid #feceea 8px"
				borderRadius="3px"
				padding="30px"
				width="70%"
				maxWidth="955px"
			>
				<Box maxWidth="454px">
					<Header fontSize="30px" fontWeight="600px">
						Technical Questions
					</Header>
					{/*TODO: Display the user's current word count next to each question.*/}
					<Box fontSize="15px" fontWeight="600px" color="#bfbfbf">
						Please limit responses to 500 words or less.
					</Box>
					<Spacer height="30px" />
					<Form layout={'vertical'} form={form} onFinish={onFinish} requiredMark={false}>
						<Form.Item
							label={question.number1.label}
							name={question.number1.name}
							rules={questionRules}
						>
							<Input.TextArea />
						</Form.Item>
						<Form.Item
							label={question.number2.label}
							name={question.number2.name}
							rules={questionRules}
						>
							<Input.TextArea />
						</Form.Item>
						<Form.Item
							label={question.number3.label}
							name={question.number3.name}
							rules={questionRules}
						>
							<Input.TextArea />
						</Form.Item>
						<Form.Item
							label={question.number4.label}
							name={question.number4.name}
							rules={questionRules}
						>
							<Input.TextArea />
						</Form.Item>
						<Form.Item
							label={question.number5.label}
							name={question.number5.name}
							rules={questionRules}
						>
							<Input.TextArea />
						</Form.Item>
						<Form.Item
							label={question.number6.label}
							name={question.number6.name}
							rules={questionRules}
						>
							<Input.TextArea />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Box>
			</Box>
		</Center>
	);
};

export default App;
