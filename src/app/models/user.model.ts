import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, SchemaTypes, Types } from 'mongoose';


@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at ' } })
export class User extends Document {
    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    lastname: string;

    @Prop({ type: String })
    email: string;

    @Prop({ type: String })
    password: string;

    @Prop({ type: String, enum: ['administrator', 'regular'] })
    role: string;

    @Prop({ type: String, default: null })
    refresh_token: string;
}

const UserSchema = SchemaFactory.createForClass(User);


export { UserSchema };
