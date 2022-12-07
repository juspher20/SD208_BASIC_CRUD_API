/* eslint-disable prettier/prettier */
import { IsNotEmpty,  } from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreateNotesDto {

    @IsNotEmpty({message:"The notes should have the title"})
    // @Length(3,100)
    note_title: string;

    @IsNotEmpty({message:"The notes should have the description"})
    description: string;
}