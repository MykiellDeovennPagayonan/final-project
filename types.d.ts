type QuizItem = {
  id: number,
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
  userName?: string
}

type StudyNote = {
  id: number,
  title: string,
  topics: Array<string>
  userName?: string
}

type Sentence = {
  id: string,
  text: string,
  type: "paragraph" | "header",
  embedding?: Array<number>,
  studyNoteId: number
}

type StudyGroup = {
  id: number,
  name: string,
  description: string
}

type SharedNote = {
  id: number
  studyNoteId: number
  userId: number
}

type Members = {
  userID: number
  username: string
}


type StudyNoteChanges = {
  addedBlocks: Array<TextBlock>,
  editedBlocks: Array<TextBlock>,
  deletedBlocks: Array<TextBlock>
}