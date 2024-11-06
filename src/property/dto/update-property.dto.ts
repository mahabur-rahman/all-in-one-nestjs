import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import {
  IsString,
  IsEnum,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Currency, ProjectStatus } from '../entities/property.entity';
import { CompletionDateUpdateInput } from './completion-date.input'; // Import the renamed class

// Register enums for GraphQL
registerEnumType(ProjectStatus, {
  name: 'ProjectStatus',
});

registerEnumType(Currency, {
  name: 'Currency',
});

@InputType()
export class UpdatePropertyDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  projectName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  projectTag?: string;

  @Field(() => CompletionDateUpdateInput, { nullable: true }) // Update this to use the renamed class
  @ValidateNested()
  @Type(() => CompletionDateUpdateInput)
  @IsOptional()
  completionDate?: CompletionDateUpdateInput;

  @Field(() => ProjectStatus, { nullable: true })
  @IsEnum(ProjectStatus)
  @IsOptional()
  projectStatus?: ProjectStatus;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  unitType?: string[];

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  floors?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  furnishing?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  serviceCharge?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readinessProgress?: string;

  @Field(() => Currency, { nullable: true })
  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  sizeUnit?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  country?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  district?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  city?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  projectImages?: string[];

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  projectGeneralFacts?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  projectFinishingAndMaterials?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  projectKitchenAndAppliances?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  projectFurnishingDetails?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  exteriorImages?: string[];

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interiorImages?: string[];
}
