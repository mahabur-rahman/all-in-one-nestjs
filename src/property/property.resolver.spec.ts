import { Test, TestingModule } from '@nestjs/testing';
import { PropertyResolver } from './property.resolver';
import { PropertyService } from './property.service';

describe('PropertyResolver', () => {
  let resolver: PropertyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyResolver, PropertyService],
    }).compile();

    resolver = module.get<PropertyResolver>(PropertyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
