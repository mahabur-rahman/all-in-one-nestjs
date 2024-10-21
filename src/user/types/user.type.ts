import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '../entities/user.entity'; // Importing UserRole enum

// Registering UserRole enum for GraphQL
registerEnumType(UserRole, {
  name: 'UserRole', // The name under which the enum will be exposed in the GraphQL schema
});

@ObjectType() // Marking User as a GraphQL ObjectType
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  // Omit password in the GraphQL type for security
  // No @Field for password

  @Field({ defaultValue: false })
  isActive: boolean;

  @Field(() => UserRole) // Defining the role as an enum in GraphQL
  role: UserRole;
}
