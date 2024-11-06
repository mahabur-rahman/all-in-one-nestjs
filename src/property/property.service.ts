import { Injectable, NotFoundException } from '@nestjs/common';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const newProperty = this.propertyRepository.create(createPropertyDto);
    return this.propertyRepository.save(newProperty);
  }

  // get all properties
  async finAll(): Promise<Property[]> {
    return this.propertyRepository.find();
  }

  // delete property
  async delete(id: string): Promise<string> {
    const result = await this.propertyRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return `Property with ID ${id} deleted successfully.`;
  }
}
