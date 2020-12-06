# TechnicalCompetencyEval

NLP tool for generating an embedding of technical competency based on open ended questions.

This project is a fun prototype and by no means production ready.

Evaluating technical competency through current questionnaires has many issues.

- The questions are shallow and easily Googleable, such as "How do you split a string in JavaScript?"
- The questions do not allow nuance or different perspectives. You are either "right" or "wrong".
- The questions offer low signal and test for the wrong thing.

This project does not attempt to be a perfect test, merely to improve on the current questionnaires by creating a language embedding via NLP models. These embeddings can then be used to train a logit classifier based on embeddings of past top candidates or hires.

Sample open ended questions may be,

- When do you prefer fail-fast over robust error handling?
- Should assertions be left in production code? Why or why not?
- What's the difference between absraction versus anticipating abstraction?
- When is it appropriate to use a 3rd party library versus writing it yourself?
- What are your favorite books on Software Development, if any? Why?
- What are your thoughts on inheritance for code reuse?
- When is it appropriate to use dependency injection?
- Do you in general prefer top down, bottom up, or some other design methodology?
- What are the advantages and/or disadvantages of white-box testing over black-box testing?
- Why is consistency important? When is it appropriate to be inconsistent?
- Is `null` always an anti-pattern? When is it appropriate to use `null`?
- Are comments always an anti-pattern? When is it appropriate to use comments?
- What do you like or dislike about this pseudo-code class?

```
public class UserQueue {
    int noOfItemsInQ, frontOfTheQueue, queueCapacity;
    public int noOfUsersInQueue() { ... }
}
```

Although experienced Software Engineers will have widely varying answers, they will be closer together (in general) in the semantic embedding space, versus a new computer science graduate.

# Issues

These questions do not cover other engineering skills, such as

- Are you solving the right problem?
- Do you measure twice and cut once?
- Do you know how to unblock yourself?
- Do you understand the requirements and what questions to ask to gather additional ones?

And various other communication and standard engineering skills. The goal of this questionnaire is for extracting technical competency signal. There are of course many other issues that should be solved for with other types of interview techniques.

# Future work

While this questionnaire should supply some signal, it would be interesting to experiment with stacking multiple embedding inputs into a single logit classifier. Including:

- This questionnaire embedding.
- Some code sample embeddings using [CodeBERT](https://github.com/microsoft/CodeBERT) of the candidates github.
- An embedding of the candidates résumé.

# Frontend

The frontend has been quickly prototyped with `TypeScript` using `create-typescript-app` and [Ant](https://ant.design/) (for learning purposes) for UI/UX.

# Backend

The backend is a django web app (for learning purposes) with [PyTorch](https://github.com/pytorch/pytorch) and [HuggingFace](https://github.com/huggingface) for NLP.

Both frontend and backend are bare-bones, as this is a prototype.
