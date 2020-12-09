from typing import Tuple
from torch import tensor, squeeze
from torch.utils.data import Dataset
from transformers import PreTrainedTokenizer
from nlp_model.labels import TechnicalCompetencyLabels


DatasetItem = Tuple[
    TechnicalCompetencyLabels, str
]  # Eg: (TechnicalCompetencyLabels.senior, "Designing a large system requires covering ...")
LABEL_INDEX = 0
TEXT_INDEX = 1


class TechnicalQuestionDataset(Dataset):
    """Dataset for the TechnicalCompetencyClassifier model."""

    # TODO: load this from a directory or file with 10k+ samples.
    # For now, this is just example stub code.
    def __init__(self, tokenizer: PreTrainedTokenizer, *args: DatasetItem):
        self.technical_question_dataset = []

        # Encode each item.
        for arg in args:
            label_value = arg[LABEL_INDEX].value
            label = tensor([label_value])
            encoding = tokenizer(
                arg[TEXT_INDEX], return_tensors="pt", padding=True, truncation=True
            )
            input_ids: tensor = squeeze(encoding["input_ids"])
            attention_mask: tensor = squeeze(encoding["attention_mask"])

            self.technical_question_dataset.append(
                {
                    "input_ids": input_ids,
                    "attention_mask": attention_mask,
                    "labels": label,
                }
            )

    def __len__(self):
        return len(self.technical_question_dataset)

    def __getitem__(self, index):
        return self.technical_question_dataset[index]
