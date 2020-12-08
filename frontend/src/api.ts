/*
 * Glue layer providing a simpler interface and encapsulation for interacting with the backend.
 * Do not let web implementation details leak through.
 * Do, async function createUser(user: User): Promise<"success" | "failure">
 * Avoid, async function createUser(user: User): Promise<StatusCode>
 */
enum StatusCode {
	Ok = 200
}

export interface TechnicalForm {
	experienceYearCount: number; // Number of professional years of experience.
	technicalQuestionAnswers: string[];
}

type Result = 'success' | 'failure';

export async function submitTechnicalForm(form: TechnicalForm): Promise<Result> {
	let request: Response | undefined;
	try {
		// Can throw if server is unreachable, internet is down, etc.
		request = await fetch('http://localhost:8000/api/v1/technical-form', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form)
		});
	} finally {
		return request?.status === StatusCode.Ok ? 'success' : 'failure';
	}
}
