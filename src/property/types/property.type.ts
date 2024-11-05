import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProjectStatus, Currency } from '../entities/property.entity';

@ObjectType()
class CompletionDateType {
  @Field()
  quarter: string;

  @Field()
  year: string;
}

@ObjectType()
export class PropertyType {
  @Field(() => ID)
  id: number; // Change from string to number

  @Field()
  projectName: string;

  @Field()
  projectTag: string;

  @Field(() => CompletionDateType)
  completionDate: CompletionDateType;

  @Field(() => ProjectStatus)
  projectStatus: ProjectStatus;

  @Field(() => [String])
  unitType: string[];

  @Field()
  floors: string;

  @Field()
  furnishing: string;

  @Field()
  serviceCharge: string;

  @Field()
  readinessProgress: string;

  @Field(() => Currency)
  currency: Currency;

  @Field()
  sizeUnit: string;

  @Field()
  country: string;

  @Field()
  district: string;

  @Field()
  city: string;

  @Field(() => [String], { nullable: true })
  projectImages: string[];

  @Field()
  projectGeneralFacts: string;

  @Field()
  projectFinishingAndMaterials: string;

  @Field()
  projectKitchenAndAppliances: string;

  @Field()
  projectFurnishingDetails: string;

  @Field(() => [String], { nullable: true })
  exteriorImages: string[];

  @Field(() => [String], { nullable: true })
  interiorImages: string[];
}
