"""
Small python app for training the Technical Competency Classifier model.
Should be used as a standalone app, and not as part of the library.
TODO: Move it to a "tools" folder outside of the project.
"""
from transformers import (
    Trainer,
    TrainingArguments,
)
from nlp_model.dataset import TechnicalQuestionDataset
from nlp_model.labels import TechnicalCompetencyLabels
from nlp_model.classifier import (
    technical_competency_classifier,
    tokenizer,
)


def noop():
    return


technical_competency_classifier.train()  # Doesn't do actual training. Sets training mode to on.

# Only train the top layer. This is for speed reasons.
# Future work could explore entire model training,
# as well as unsupervised pre-training on software engineering documents.
for param in technical_competency_classifier.base_model.parameters():
    param.requires_grad = False

# HACK: Prevent trainer from changing train state. This is because we only want to train the top layer.
technical_competency_classifier.train = noop

train_dataset = TechnicalQuestionDataset(
    tokenizer,
    (
        TechnicalCompetencyLabels.entry,
        "Inheritance can be used to model is-A vs has-A relationships.",
    ),
    (
        TechnicalCompetencyLabels.senior,
        "Deep inheritance hierarchies should generally be avoided and other patterns used instead.",
    ),
)

eval_dataset = TechnicalQuestionDataset(
    tokenizer,
    (
        TechnicalCompetencyLabels.entry,
        "Code should be as reusable as possible to save time.",
    ),
    (
        TechnicalCompetencyLabels.senior,
        "Code should be as reusable as necessary.",
    ),
)

training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=1,  # TODO: Change to realistic size, eg 32-64, once we have more data.
    per_device_eval_batch_size=1,  # TODO: Change to realistic size, eg 32-64, once we have more data.
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir="./logs",
)

trainer = Trainer(
    model=technical_competency_classifier,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
)
trainer.train()
trainer.save_model()
