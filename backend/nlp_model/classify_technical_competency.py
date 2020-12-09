r"""
Module for evaluating technical competency based on open-ended questions.
"""
from torch import softmax
from nlp_model.labels import technical_competency_labels
from nlp_model.classifier import (
    technical_competency_classifier,
    tokenizer,
    max_tokens_count,
)


def classify_technical_competency(answer: str) -> str:
    # Fail-fast instead of silently truncating, which can hide bugs.
    # Ref: https://wiki.c2.com/?FailFast
    if len(answer.split()) > max_tokens_count:
        raise ValueError(
            f"answer must not exceed {max_tokens_count} tokens.\nanswer: {answer}"
        )

    encoded = tokenizer.encode(
        answer, return_tensors="pt", padding=True, truncation=True
    )
    logits = technical_competency_classifier(encoded)[0]
    technical_competency_probabilities = softmax(logits, dim=1).tolist()
    highest_probability = max(technical_competency_probabilities)
    highest_probability_index = technical_competency_probabilities.index(
        highest_probability
    )

    return technical_competency_labels[highest_probability_index]
