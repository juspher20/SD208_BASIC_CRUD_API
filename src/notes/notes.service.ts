/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException} from "@nestjs/common";
import { CreateNotesDto } from "./dto/createnotes.dto";
import {v4 as uuidv4} from 'uuid';
import { Note } from './notes.model';

@Injectable()
export class NotesService {
    private notes: Note[] = [];
    // addNote(title: string, ) {
    //     const noteId = Math.random().toString();
    //     const newNotes = new Note(noteId, title, desc);
    //     this.notes.push(newNotes);
    //     return noteId;
    // }
    addNote(note: CreateNotesDto): Note {
        const {note_title,description} = note;
        const newNotes: Note = {
            id: uuidv4(),
            note_title,
            description,
        }
        this.notes.push(newNotes);
        return newNotes 
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