import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertyType, UnitType } from './types/property.type';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async createProperty(
    createPropertyDto: CreatePropertyDto,
  ): Promise<PropertyType> {
    // Use the create method of the repository to create a new property
    const newProperty = this.propertyRepository.create(createPropertyDto);

    // Save the new property to the database
    const savedProperty = await this.propertyRepository.save(newProperty);

    // Transform the savedProperty to match PropertyType
    const propertyResponse: PropertyType = {
      id: savedProperty.id.toString(), // Convert to string
      projectName: savedProperty.projectName,
      projectTag: savedProperty.projectTag,
      projectStatus: savedProperty.projectStatus,
      unitType: savedProperty.unitType,
      floors: savedProperty.floors,
      furnishing: savedProperty.furnishing,
      serviceCharge: savedProperty.serviceCharge,
      readinessProgress: savedProperty.readinessProgress,
      currency: savedProperty.currency,
      sizeUnit: savedProperty.sizeUnit,
      commission: savedProperty.commission,
      country: savedProperty.country,
      district: savedProperty.district,
      city: savedProperty.city,
      projectImageOne: savedProperty.projectImageOne,
      projectImageTwo: savedProperty.projectImageTwo,
      projectImageThree: savedProperty.projectImageThree,
      generalFacts: savedProperty.generalFacts,
      finishingAndMaterials: savedProperty.finishingAndMaterials,
      kitchenAndAppliances: savedProperty.kitchenAndAppliances,
      furnishingDetails: savedProperty.furnishingDetails,
      locationDescription: savedProperty.locationDescription,
      exteriorImages: savedProperty.exteriorImages,
      interiorImages: savedProperty.interiorImages,
      projectLocationLink: savedProperty.projectLocationLink,
      landmarks: savedProperty.landmarks,
      masterPlanImage: savedProperty.masterPlanImage,
      buildingsImage: savedProperty.buildingsImage,
      facilities: savedProperty.facilities,
      parkingFacilityImage: savedProperty.parkingFacilityImage,
      parkingDetails: savedProperty.parkingDetails,
      typicalUnitAndPrices: savedProperty.typicalUnitAndPrices.map((unit) => ({
        unitPriceRange: {
          minPrice: unit.unitPriceRange.minPrice,
          maxPrice: unit.unitPriceRange.maxPrice,
        },
        unitSizeRange: {
          minSize: unit.unitSizeRange.minSize,
          maxSize: unit.unitSizeRange.maxSize,
        },
        unitPropertyType: unit.unitPropertyType,
        unitBedrooms: unit.unitBedrooms,
        unitPlanImages: unit.unitPlanImages,
      })) as UnitType[], // Assert type to UnitType[]
      paymentPlans: savedProperty.paymentPlans,
      inventoryImages: savedProperty.inventoryImages,
      inventoryUnitDetails: savedProperty.inventoryUnitDetails,
      videos: savedProperty.videos,
      companyDetails: savedProperty.companyDetails,
    };

    return propertyResponse;
  }
}
