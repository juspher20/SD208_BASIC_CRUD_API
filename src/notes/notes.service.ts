/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException} from "@nestjs/common";

import { Note } from './notes.model';

@Injectable()
export class NotesService {
    private notes: Note[] = [
        
    ];
    addNote(title: string, desc: string) {
        const noteId = Math.random().toString();
        const newNotes = new Note(noteId, title, desc);
        this.notes.push(newNotes);
        return noteId;
    }

    getNotes() {
        return [...this.notes];
    }

    getSingleNote(noteId: string) {
        const note = this.findNote(noteId)[0];
        return { ...note };
    }

    updateNote(noteId: string, title: string, desc: string) {
        const [note, index] = this.findNote(noteId);
        const updatedNote = { ...note };
        if (title) {
            updatedNote.note_title = title;
        }
        if (desc) {
            updatedNote.description = desc;
        }
        this.notes[index] = updatedNote;
    }

    deleteNote(noteId: string) {
        const index = this.findNote(noteId)[1];
        this.notes.splice(index, 1);
    }

    private findNote(id: string): [Note, number] {
        const noteIndex = this.notes.findIndex(n => n.id === id);
        const note = this.notes[noteIndex];
        if (!note) {
            throw new NotFoundException('Could not find notes.');
        }
        return [note, noteIndex];
    }
}