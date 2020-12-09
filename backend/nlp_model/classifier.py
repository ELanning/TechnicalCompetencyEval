from pathlib import Path
from transformers import (
    DistilBertForSequenceClassification,
    AutoTokenizer,
)
from nlp_model.labels import technical_competency_labels

# TODO: Auto set these up if they don't already exist.
cache_dir = (str(Path(__file__).parent) + "/cache").replace("\\", "/")
saved_model_dir = (str(Path(__file__).parent) + "/results").replace("\\", "/")

max_tokens_count = 512

# DistilBert was chosen based on its speed and lightweight footprint.
# Future work could explore different models.
tokenizer = AutoTokenizer.from_pretrained(
    "distilbert-base-uncased",
    cache_dir=cache_dir,
    max_character_length=max_tokens_count,
)

# Change "distilbert-base-uncased" to save_model_dir after running the training script once.
# Unfortunately cannot upload the pre-trained model to git due to the file size.
# Will find a better workaround later.
# TODO: experiment with linear regression output (eg estimated years of experience) over ALL questions as input.
# Using SequenceClassification over ONE question as input for now because it's well supported out of box.
technical_competency_classifier = DistilBertForSequenceClassification.from_pretrained(
    "distilbert-base-uncased",
    num_labels=len(technical_competency_labels),
    cache_dir=cache_dir,
)
