export default function toStudyNotes(studyNotes : Array<StudyNoteRawData>) {
  let studyNotesFinal : Array<StudyNote> = []

  for (let i = 0; i < studyNotes.length; i++) {
    const id = studyNotes[i].studyNoteId
    const topic = studyNotes[i].topicName
    const title = studyNotes[i].title
    const userName = studyNotes[i].userName 

    let existingStudyNote = studyNotesFinal.find(studyNote => studyNote.id === id)

    if (!existingStudyNote) {
      existingStudyNote = { id, title : title, topics : [topic], userName }
      studyNotesFinal.push(existingStudyNote)
    } else {
      existingStudyNote.topics.push(topic)
    }


  }

  return studyNotesFinal
}