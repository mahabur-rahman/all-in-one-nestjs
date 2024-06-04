import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Tag {
  @Prop()
  tagName: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
