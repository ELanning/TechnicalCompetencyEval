import json
import uuid
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from http import HTTPStatus


@csrf_exempt  # HACK: For fast prototyping. Do NOT use this decorator on production.
def submit_form(request: HttpRequest):
    # TODO: Setup with rest_framework to avoid this clunky boilerplate.
    if request.method != "POST":
        return JsonResponse(
            {"message": "Must be a POST request.`"}, status=HTTPStatus.BAD_REQUEST
        )

    # TODO: add a middleware to convert JavaScript camelCase to Python snake_case.
    form_response = json.loads(request.body.decode("utf-8"))
    if "experienceYearCount" not in form_response:
        return JsonResponse(
            {"message": "request must set experienceYearCount number."},
            status=HTTPStatus.BAD_REQUEST,
        )

    if (
        type(form_response["experienceYearCount"]) != int
        and type(form_response["experienceYearCount"]) != float
    ):
        return JsonResponse(
            {"message": "experienceYearCount must be a number."},
            status=HTTPStatus.BAD_REQUEST,
        )

    if "technicalQuestionAnswers" not in form_response:
        return JsonResponse(
            {"message": "request must set technicalQuestionAnswers array."},
            status=HTTPStatus.BAD_REQUEST,
        )

    expected_answer_count = 5
    if len(form_response["technicalQuestionAnswers"]) != expected_answer_count:
        return JsonResponse(
            {
                "message": f"technicalQuestionAnswers must contain exactly {expected_answer_count} answers."
            },
            status=HTTPStatus.BAD_REQUEST,
        )

    for answer in form_response["technicalQuestionAnswers"]:
        if type(answer) != str:
            return JsonResponse(
                {"message": "all technicalQuestionAnswers must be strings."},
                status=HTTPStatus.BAD_REQUEST,
            )

    # TODO: Possible sanitization of answers might be required.
    # Eg to truncate length, strip HTML in case answers are used elsewhere, etc.
    # Expects the cwd to be the project root. Could be made more robust if need be.
    with open(f"./dataset/{uuid.uuid4()}.json", "w+") as fp:
        json.dump(form_response, fp)

    return JsonResponse(
        {"message": "Form successfully submitted."}, status=HTTPStatus.OK
    )
