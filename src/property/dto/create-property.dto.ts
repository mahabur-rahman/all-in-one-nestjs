import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Currency, ProjectStatus } from '../entities/property.entity';

// Register enums for GraphQL
registerEnumType(ProjectStatus, {
  name: 'ProjectStatus',
});

registerEnumType(Currency, {
  name: 'Currency',
});

@InputType()
class CompletionDateInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  quarter: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  year: string;
}

@InputType()
export class CreatePropertyDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  projectTag: string;

  @Field(() => CompletionDateInput)
  @ValidateNested()
  @Type(() => CompletionDateInput)
  completionDate: CompletionDateInput;

  @Field(() => ProjectStatus)
  @IsEnum(ProjectStatus)
  projectStatus: ProjectStatus;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  unitType: string[];

  @Field()
  @IsString()
  @IsNotEmpty()
  floors: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  furnishing: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  serviceCharge: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readinessProgress: string;

  @Field(() => Currency)
  @IsEnum(Currency)
  currency: Currency;

  @Field()
  @IsString()
  @IsNotEmpty()
  sizeUnit: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  country: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  district: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  projectImages?: string[];

  @Field()
  @IsString()
  @IsNotEmpty()
  projectGeneralFacts: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  projectFinishingAndMaterials: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  projectKitchenAndAppliances: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  projectFurnishingDetails: string;

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
