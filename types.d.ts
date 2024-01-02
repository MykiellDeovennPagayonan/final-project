type QuizItem = {
  question: string,
  answer: string,
  embedding?: Array<number>
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

type StudyNoteRawData = {
  title: string,
  topicName: string,
  studyNoteId: number,
}

type StudyNote = {
  id: number,
  title: string,
  topics: Array<string>
}

type Sentence = {
  id: string,
  text: string,
  type: "paragraph" | "header",
  embedding?: Array<number>,
  studyNoteId: number
}

