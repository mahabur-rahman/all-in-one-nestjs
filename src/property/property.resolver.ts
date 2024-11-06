import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { PropertyType } from './types/property.type';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Resolver(() => PropertyType)
export class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Mutation(() => PropertyType)
  async createProperty(
    @Args('createPropertyInput', { type: () => CreatePropertyDto })
    createPropertyDto: CreatePropertyDto,
  ): Promise<PropertyType> {
    return this.propertyService.create(createPropertyDto);
  }

  // get all properties
  @Query(() => [PropertyType])
  async findAllProperties(): Promise<PropertyType[]> {
    return this.propertyService.finAll();
  }

  // delete property
  @Mutation(() => String)
  async deleteProperty(
    @Args('id', { type: () => String }) id: string,
  ): Promise<string> {
    return this.propertyService.delete(id);
  }

  // get single property
  // Query to get a single property by its ID
  @Query(() => PropertyType)
  async getProperty(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PropertyType> {
    return this.propertyService.findOne(id);
  }

  // Mutation to update an existing property
  @Mutation(() => PropertyType)
  async updateProperty(
    @Args('id', { type: () => String }) id: string, // ID of the property to update
    @Args('updatePropertyInput', { type: () => UpdatePropertyDto })
    updatePropertyDto: UpdatePropertyDto, // The new data
  ): Promise<PropertyType> {
    return this.propertyService.update(id, updatePropertyDto); // Call the service method to update
  }
}
