import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
// import { excludeKeys, computeFullName } from '@lib/common/utils';

@Injectable()
export class UserService {
  constructor(
    // Import Microservice client to connect to the Microservices via NATS
    @Inject('MICRO_SERVICE_CLIENT')
    private readonly micro_svc_client: ClientProxy,
  ) {}

  /**
   * Attempts to get the user with the desired id from the data service
   * @param id ID of the user we want to retrieve
   * @returns The desired user object or blank
   */
  async getUserById(id: number) {
    let user = await firstValueFrom(
      this.micro_svc_client.send({ cmd: 'getUserById' }, id),
    );

    // Add computed properties
    // user = computeFullName(user);
    return user;

    // return user; ? excludeKeys(user, ['password']) : [];
  }
}
