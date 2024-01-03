const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function generateQuiz(content : string) : Promise<QuizItem> {
  let quiz : QuizItem = {
    question: "",
    answer: "",
    id: null
  }

  let repetitions = 0

  while (quiz.question.length === 0 || quiz.answer.length === 0) {
    if (repetitions > 2) {
      break
    }

    let quizText = await generateQuizText(content)
    quiz = assembleQuiz(quizText)

    repetitions++
  }

  return quiz
}

async function generateQuizText(content : string) {
  let response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: `make a quiz question from the text I will provide \n
        make sure the format is: \n \n
        Q:
        A: 
      `},
      { role: "user", content: content}
    ]
  }).catch(err => console.log(err))

  const quizText = response.data.choices[0].message.content as string
  return quizText
}

function assembleQuiz(quizText : string) {
  let question = ""
  let answer = ""

  for (let i = 2; i < quizText.length; i++) {

    if (quizText[i - 2] === "Q" && quizText[i - 1] === ":") {
      while (quizText[i] !== "\n") {
        question += quizText[i]
        i++
      }
      question = question.trim()
    }

    if (quizText[i - 2] === "A" && quizText[i - 1] === ":") {
      while (i < quizText.length) {
        answer += quizText[i]
        i++
      }
      answer = answer.trim()
    }
  }

  return({ question, answer, id: null })
}