import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Currency } from '../entities/property.entity';

export class CreatePropertyDto {
  @IsString()
  projectName: string;

  @IsString()
  projectTag: string;

  @IsString()
  projectStatus: string;

  @IsArray()
  unitType: string[];

  @IsOptional()
  @IsNumber()
  floors?: number;

  @IsOptional()
  @IsString()
  furnishing?: string;

  @IsOptional()
  @IsNumber()
  serviceCharge?: number;

  @IsOptional()
  @IsString()
  readinessProgress?: string;

  @IsEnum(Currency)
  currency: Currency;

  @IsString()
  sizeUnit: string;

  @IsOptional()
  @IsNumber()
  commission?: number;

  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsArray()
  projectImageOne?: string[];

  @IsOptional()
  @IsArray()
  projectImageTwo?: string[];

  @IsOptional()
  @IsArray()
  projectImageThree?: string[];

  @IsString()
  generalFacts: string;

  @IsString()
  finishingAndMaterials: string;

  @IsString()
  kitchenAndAppliances: string;

  @IsString()
  furnishingDetails: string;

  @IsString()
  locationDescription: string;

  @IsOptional()
  @IsArray()
  exteriorImages?: string[];

  @IsOptional()
  @IsArray()
  interiorImages?: string[];

  @IsOptional()
  @IsString()
  projectLocationLink?: string;

  @IsOptional()
  @IsArray()
  landmarks?: {
    name: string;
    distance: number;
  }[];

  @IsOptional()
  @IsString()
  masterPlanImage?: string;

  @IsOptional()
  @IsString()
  buildingsImage?: string;

  @IsOptional()
  @IsArray()
  facilities?: {
    facilityName: string;
    facilityImage: string;
  }[];

  @IsOptional()
  @IsArray()
  parkingFacilityImage?: string[];

  @IsOptional()
  @IsArray()
  parkingDetails?: {
    bedrooms: string;
    propertyType: string;
    parkingSpaces: number;
  }[];

  @IsOptional()
  @IsArray()
  typicalUnitAndPrices?: {
    unitPriceRange: { minPrice: number; maxPrice: number };
    unitSizeRange: { minSize: number; maxSize: number };
    unitPropertyType: string;
    unitBedrooms: string;
    unitPlanImages: string[];
  }[];

  @IsOptional()
  @IsArray()
  paymentPlans?: {
    title: string;
    schedule: {
      onBooking: number;
      duringConstruction: number;
      uponHandOver: number;
      twelveMonthsAfterBooking: number;
      eightMonthsAfterBooking: number;
    };
  }[];

  @IsOptional()
  @IsArray()
  inventoryImages?: string[];

  @IsOptional()
  @IsArray()
  inventoryUnitDetails?: {
    bedrooms: string;
    minSize: number;
    maxSize: number;
    quantity: number;
  }[];

  @IsOptional()
  videos?: {
    propertyShowcaseVideo?: string;
    projectVideo?: string;
  };

  @IsOptional()
  companyDetails?: {
    name: string;
    description?: string;
    email: string;
    website: string;
    address: string;
    country: string;
    city: string;
    logo?: string;
  };
}
