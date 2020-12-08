import './App.css';
import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Alert } from 'antd';
import { Center, Box, Spacer, Header } from 'layout';
import { submitTechnicalForm } from 'api';
import { question } from 'formQuestions';

enum FormState {
	Initial,
	Submitting,
	Success,
	Failure
}

interface FormValues {
	experienceYearCount: number;
	['question 1']: string;
	['question 2']: string;
	['question 3']: string;
	['question 4']: string;
	['question 5']: string;
}

const experienceYearCountMin = 0;
const experienceYearCountMax = 30;
const questionRules = [{ required: true, validator: validateWordBounds }];

// TODO: Save user's response into local storage.
// This is to mitigate accidentally closing the tab, and allowing them to go back and change answers.
const App = () => {
	const [form] = Form.useForm();
	const [formState, setFormState] = useState(FormState.Initial);
	const [systemBanner, setSystemBanner] = useState<React.ReactNode | undefined>();

	const onValuesChange = (changedValues: Partial<FormValues>) => {
		const hasChangedExperience = changedValues.experienceYearCount !== undefined;
		if (hasChangedExperience) {
			if (typeof changedValues.experienceYearCount !== 'number') {
				form.setFieldsValue({ experienceYearCount: experienceYearCountMin });
			} else if (changedValues.experienceYearCount < experienceYearCountMin) {
				form.setFieldsValue({ experienceYearCount: experienceYearCountMin });
			} else if (changedValues.experienceYearCount > experienceYearCountMax) {
				form.setFieldsValue({ experienceYearCount: experienceYearCountMax });
			}
		}
	};

	const onFinish = async (values: FormValues) => {
		setFormState(FormState.Submitting);

		const result = await submitTechnicalForm({
			experienceYearCount: values.experienceYearCount,
			technicalQuestionAnswers: [
				values['question 1'],
				values['question 2'],
				values['question 3'],
				values['question 4'],
				values['question 5']
			]
		});

		if (result === 'success') {
			setFormState(FormState.Success);
			setSystemBanner(
				<Alert message={'Your response has been recorded. Thanks!'} type={'success'} />
			);
		} else if (result === 'failure') {
			setFormState(FormState.Failure);
			setSystemBanner(
				<Alert
					message={'Failed to submit the form. Please try again in a bit!'}
					type={'error'}
				/>
			);
		} else {
			throw new Error(`Unknown result: ${result}`);
		}
	};

	return (
		<Center
			background="linear-gradient(180deg, #cec5fa 36%, #fef1d2 36%);"
			height="100%"
			width="100%"
			position="fixed"
		>
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
					<Form
						layout={'vertical'}
						form={form}
						onFinish={onFinish}
						onValuesChange={onValuesChange}
						requiredMark={false}
						initialValues={{ experienceYearCount: 2 }}
					>
						<Form.Item
							label={'years of professional experience:'}
							name={'experienceYearCount'}
						>
							<InputNumber
								min={experienceYearCountMin}
								max={experienceYearCountMax}
							/>
						</Form.Item>
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
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								loading={formState === FormState.Submitting}
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
					{systemBanner}
				</Box>
			</Box>
		</Center>
	);
};

function validateWordBounds(_: any, input: string) {
	if (!input) {
		return Promise.reject('Answer is required.');
	}

	const wordCount = input?.split(' ').length;
	const wordCountMax = 500;
	return wordCount > wordCountMax
		? Promise.reject(`Word count must not exceed ${wordCountMax}.`)
		: Promise.resolve();
}

export default App;
