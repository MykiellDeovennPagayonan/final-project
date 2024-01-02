type QuizItem = {
  question: string,
  answer: string
}

type HeaderBlock = {
  data: {
    level: number,
    text: string
  }
  id: string
  type: "header"
}

type ParagraphBlock = {
  data: {
    text: string
  }
  id: string
  type: "paragraph"
}

type TextBlock = HeaderBlock | ParagraphBlock

type Topic = {
  name: string,
  id: number
}

type UserInfo = {
  email: string,
  id: number,
  iat: number
}