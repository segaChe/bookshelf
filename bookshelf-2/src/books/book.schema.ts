import { Prop, Schema, SchemaFactory }   from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
    @Prop({ required: true })
    title : string;
    @Prop()
    description : string;
    @Prop()
    year : number;
    @Prop({ required: true })
    authors : string;
    @Prop()
    favorite? : boolean;
    @Prop()
    fileCover? : string;
    @Prop()
    fileName? : string;
    @Prop()
    fileBook? : string;
    @Prop()
    createdAt? : string;
    @Prop()
    updatedAt? : string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
