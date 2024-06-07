import { IsOptional, IsString, IsArray, IsNumber } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly body?: string;

  @IsOptional()
  @IsArray()
  readonly tagList?: string[];

  @IsOptional()
  @IsNumber()
  readonly favoritesCount?: number;
}
