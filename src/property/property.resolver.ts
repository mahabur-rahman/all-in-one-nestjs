import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertyType } from './types/property.type';

@Resolver(() => PropertyType)
export class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Mutation(() => PropertyType)
  async createProperty(
    @Args('createPropertyInput') createPropertyDto: CreatePropertyDto,
  ): Promise<PropertyType> {
    return this.propertyService.createProperty(createPropertyDto);
  }
}
