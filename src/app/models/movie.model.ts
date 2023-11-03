import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at ' } })
export class Movie extends Document {
    @Prop({ type: SchemaTypes.ObjectId })
    publisher_user: Types.ObjectId;

    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    director: string;

    @Prop({ type: String })
    producer: string;

    @Prop({ type: Date })
    release_date: Date;

    @Prop({ type: Number })
    duration: number

    @Prop({ type: Number, default: 0})
    seasons: number

    @Prop({ type: Number, default: 0 })
    chapters: number

    @Prop({ type: String })
    url: string;

    @Prop({ type: Boolean, default: false })
    deleted: boolean;
}

const MovieSchema = SchemaFactory.createForClass(Movie);


export { MovieSchema };
