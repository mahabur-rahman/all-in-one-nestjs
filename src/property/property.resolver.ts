import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { PropertyType } from './types/property.type';
import { CreatePropertyDto } from './dto/create-property.dto';

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
}
