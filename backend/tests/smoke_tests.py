import unittest
from nlp_model import classify_technical_competency, technical_competency_labels


# Simple sanity check tests. Avoid putting complex requirement testing cases here.
class SmokeTests(unittest.TestCase):
    def test_cpt_match(self):
        sample_text = "Hello world"

        label = classify_technical_competency(sample_text)
        self.assertIn(label, technical_competency_labels)
