import { IsNotEmpty } from 'class-validator';

export class CreateOrganisationRequest {
  @IsNotEmpty()
  name: string;
}
