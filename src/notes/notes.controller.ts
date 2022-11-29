import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';

import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    @Post()
    addNote(
        @Body('note_title') noteTitle: string,
        @Body('description') noteDesc: string,
    ) {
        const generatedId = this.notesService.addNote(
            noteTitle,
            noteDesc,
        );
        return { id: generatedId };
    }

    @Get()
    getAllNotes() {
        return this.notesService.getNotes();
    }

    @Get(':id')
    getProduct(@Param('id') noteId: string) {
        return this.notesService.getSingleNote(noteId);
    }

    @Patch(':id')
    updateNote(
        @Param('id') noteId: string,
        @Body('note_title') noteTitle: string,
        @Body('description') noteDesc: string,
    ) {
        this.notesService.updateNote(noteId, noteTitle, noteDesc);
        return null;
    }

    @Delete(':id')
    removeNote(@Param('id') noteId: string) {
        this.notesService.deleteNote(noteId);
        return null;
    }
}