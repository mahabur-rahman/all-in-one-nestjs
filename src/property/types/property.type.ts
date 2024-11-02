import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
class LandmarkType {
  @Field()
  name: string;

  @Field(() => Float)
  distance: number;
}

@ObjectType()
class FacilityType {
  @Field()
  facilityName: string;

  @Field()
  facilityImage: string;
}

@ObjectType()
class ParkingFacilityType {
  @Field()
  bedrooms: string;

  @Field()
  propertyType: string;

  @Field(() => Float)
  parkingSpaces: number;
}

@ObjectType()
class UnitType {
  @Field(() => Float)
  minPrice: number;

  @Field(() => Float)
  maxPrice: number;

  @Field(() => Float)
  minSize: number;

  @Field(() => Float)
  maxSize: number;

  @Field()
  unitPropertyType: string;

  @Field()
  unitBedrooms: string;

  @Field(() => [String])
  unitPlanImages: string[];
}

@ObjectType()
class PaymentScheduleType {
  @Field(() => Float)
  onBooking: number;

  @Field(() => Float)
  duringConstruction: number;

  @Field(() => Float)
  uponHandOver: number;

  @Field(() => Float)
  twelveMonthsAfterBooking: number;

  @Field(() => Float)
  eightMonthsAfterBooking: number;
}

@ObjectType()
class PaymentPlanType {
  @Field()
  title: string;

  @Field(() => PaymentScheduleType)
  schedule: PaymentScheduleType;
}

@ObjectType()
class InventoryUnitDetailsType {
  @Field()
  bedrooms: string;

  @Field(() => Float)
  minSize: number;

  @Field(() => Float)
  maxSize: number;

  @Field(() => Float)
  quantity: number;
}

@ObjectType()
class VideosType {
  @Field({ nullable: true })
  propertyShowcaseVideo?: string;

  @Field({ nullable: true })
  projectVideo?: string;
}

@ObjectType()
class CompanyDetailsType {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  email: string;

  @Field()
  website: string;

  @Field()
  address: string;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  logo?: string;
}

@ObjectType()
export class PropertyType {
  @Field(() => ID)
  id: string;

  @Field()
  projectName: string;

  @Field()
  projectTag: string;

  @Field()
  projectStatus: string;

  @Field(() => [String])
  unitType: string[];

  @Field(() => Float, { nullable: true })
  floors?: number;

  @Field({ nullable: true })
  furnishing?: string;

  @Field(() => Float, { nullable: true })
  serviceCharge?: number;

  @Field({ nullable: true })
  readinessProgress?: string;

  @Field()
  currency: string;

  @Field()
  sizeUnit: string;

  @Field(() => Float, { nullable: true })
  commission?: number;

  @Field()
  country: string;

  @Field({ nullable: true })
  district?: string;

  @Field({ nullable: true })
  city?: string;

  @Field(() => [String], { nullable: true })
  projectImageOne?: string[];

  @Field(() => [String], { nullable: true })
  projectImageTwo?: string[];

  @Field(() => [String], { nullable: true })
  projectImageThree?: string[];

  @Field()
  generalFacts: string;

  @Field()
  finishingAndMaterials: string;

  @Field()
  kitchenAndAppliances: string;

  @Field()
  furnishingDetails: string;

  @Field()
  locationDescription: string;

  @Field(() => [String], { nullable: true })
  exteriorImages?: string[];

  @Field(() => [String], { nullable: true })
  interiorImages?: string[];

  @Field({ nullable: true })
  projectLocationLink?: string;

  @Field(() => [LandmarkType], { nullable: true })
  landmarks?: LandmarkType[];

  @Field({ nullable: true })
  masterPlanImage?: string;

  @Field({ nullable: true })
  buildingsImage?: string;

  @Field(() => [FacilityType], { nullable: true })
  facilities?: FacilityType[];

  @Field(() => [String], { nullable: true })
  parkingFacilityImage?: string[];

  @Field(() => [ParkingFacilityType], { nullable: true })
  parkingDetails?: ParkingFacilityType[];

  @Field(() => [UnitType], { nullable: true })
  typicalUnitAndPrices?: UnitType[];

  @Field(() => [PaymentPlanType], { nullable: true })
  paymentPlans?: PaymentPlanType[];

  @Field(() => [String], { nullable: true })
  inventoryImages?: string[];

  @Field(() => [InventoryUnitDetailsType], { nullable: true })
  inventoryUnitDetails?: InventoryUnitDetailsType[];

  @Field(() => VideosType, { nullable: true })
  videos?: VideosType;

  @Field(() => CompanyDetailsType, { nullable: true })
  companyDetails?: CompanyDetailsType;
}
