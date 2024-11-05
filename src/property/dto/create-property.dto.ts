import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Currency } from '../entities/property.entity';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
class RangeInput {
  @Field()
  @IsNumber()
  minPrice: number;

  @Field()
  @IsNumber()
  maxPrice: number;

  @Field()
  @IsNumber()
  minSize: number;

  @Field()
  @IsNumber()
  maxSize: number;
}

@InputType()
class VideosInput {
  @Field({ nullable: true })
  propertyShowcaseVideo?: string;

  @Field({ nullable: true })
  projectVideo?: string;
}

@InputType()
class LandmarkInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsNumber()
  distance: number; // distance in km
}

@InputType()
class FacilityInput {
  @Field()
  @IsString()
  facilityName: string;

  @Field()
  @IsString()
  facilityImage: string;
}

@InputType()
class ParkingDetailInput {
  @Field()
  @IsString()
  bedrooms: string;

  @Field()
  @IsString()
  propertyType: string;

  @Field()
  @IsNumber()
  parkingSpaces: number;
}

@InputType()
class ScheduleInput {
  @Field()
  @IsNumber()
  onBooking: number;

  @Field()
  @IsNumber()
  duringConstruction: number;

  @Field()
  @IsNumber()
  uponHandOver: number;

  @Field()
  @IsNumber()
  twelveMonthsAfterBooking: number;

  @Field()
  @IsNumber()
  eightMonthsAfterBooking: number;
}

@InputType()
class PaymentPlanInput {
  @Field()
  @IsString()
  title: string;

  @Field(() => ScheduleInput)
  schedule: ScheduleInput;
}

@InputType()
class UnitInput {
  @Field(() => RangeInput, { nullable: true })
  @IsOptional()
  unitPriceRange?: RangeInput;

  @Field(() => RangeInput, { nullable: true })
  @IsOptional()
  unitSizeRange?: RangeInput;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  unitPropertyType?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  unitBedrooms?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  unitPlanImages?: string[];
}

@InputType()
class InventoryUnitDetailInput {
  @Field()
  @IsString()
  bedrooms: string;

  @Field()
  @IsNumber()
  minSize: number;

  @Field()
  @IsNumber()
  maxSize: number;

  @Field()
  @IsNumber()
  quantity: number;
}

@InputType()
class CompanyDetailsInput {
  @Field()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @IsString()
  email: string;

  @Field()
  @IsString()
  website: string;

  @Field()
  @IsString()
  address: string;

  @Field()
  @IsString()
  country: string;

  @Field()
  @IsString()
  city: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  logo?: string;
}

@InputType()
export class CreatePropertyDto {
  @Field()
  @IsString()
  projectName: string;

  @Field()
  @IsString()
  projectTag: string;

  @Field()
  @IsString()
  projectStatus: string;

  @Field(() => [String])
  @IsArray()
  unitType: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  floors?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  furnishing?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  serviceCharge?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readinessProgress?: string;

  @Field(() => Currency)
  @IsEnum(Currency)
  currency: Currency;

  @Field()
  @IsString()
  sizeUnit: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  commission?: number;

  @Field()
  @IsString()
  country: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  district?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  city?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  projectImageOne?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  projectImageTwo?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  projectImageThree?: string[];

  @Field()
  @IsString()
  generalFacts: string;

  @Field()
  @IsString()
  finishingAndMaterials: string;

  @Field()
  @IsString()
  kitchenAndAppliances: string;

  @Field()
  @IsString()
  furnishingDetails: string;

  @Field()
  @IsString()
  locationDescription: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  exteriorImages?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  interiorImages?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  projectLocationLink?: string;

  @Field(() => [LandmarkInput], { nullable: true })
  @IsOptional()
  landmarks?: LandmarkInput[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  masterPlanImage?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  buildingsImage?: string;

  @Field(() => [FacilityInput], { nullable: true })
  @IsOptional()
  facilities?: FacilityInput[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  parkingFacilityImage?: string[];

  @Field(() => [ParkingDetailInput], { nullable: true })
  @IsOptional()
  parkingDetails?: ParkingDetailInput[];

  @Field(() => [UnitInput], { nullable: true })
  @IsOptional()
  typicalUnitAndPrices?: UnitInput[];

  @Field(() => [PaymentPlanInput], { nullable: true })
  @IsOptional()
  paymentPlans?: PaymentPlanInput[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  inventoryImages?: string[];

  @Field(() => [InventoryUnitDetailInput], { nullable: true })
  @IsOptional()
  inventoryUnitDetails?: InventoryUnitDetailInput[];

  @Field(() => VideosInput, { nullable: true })
  @IsOptional()
  videos?: VideosInput;

  @Field(() => CompanyDetailsInput, { nullable: true })
  @IsOptional()
  companyDetails?: CompanyDetailsInput;
}
