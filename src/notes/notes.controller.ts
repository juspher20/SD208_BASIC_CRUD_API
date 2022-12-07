/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

import { CreateNotesDto } from './dto/createnotes.dto';
import { Note } from './notes.model';

import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    @Post('create')

    @UsePipes(ValidationPipe)//for validation
    
    addNote(
        @Body()body: CreateNotesDto): Note{
        return this.notesService.addNote(body);
    }
        // @Body('note_title') noteTitle: string,
        // @Body('description') noteDesc: string,
    // ): { id: string; } {
    //     const generatedId = this.notesService.addNote(
    //         noteTitle,
    //         noteDesc,
    //     );
    //     return { id: generatedId};
    // }

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