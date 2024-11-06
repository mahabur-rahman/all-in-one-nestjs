import { Injectable, NotFoundException } from '@nestjs/common';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

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

  // get single property
  async findOne(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: { id: parseInt(id) }, // convert string to number
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return property;
  }

  // Update property
  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    // Convert the id to a number
    const property = await this.propertyRepository.findOne({
      where: { id: Number(id) }, // Convert id to number
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    // Merge the existing property with the new data from the DTO
    const updatedProperty = this.propertyRepository.merge(
      property,
      updatePropertyDto,
    );

    // Save and return the updated property
    return this.propertyRepository.save(updatedProperty);
  }
}
