import {
  ConsoleLogger,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import fetch from 'node-fetch';

interface Auth0TokenResponse {
  access_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  private token: string;
  private timeoutId: number;

  constructor(private readonly loggerService: ConsoleLogger) {}

  async getUserName(userId: string) {
    const response = await fetch(
      `https://dev-qmx75p4q.us.auth0.com/api/v2/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    ).then((x) => x.json());

    return response.name;
  }

  private async refreshToken() {
    clearInterval(this.timeoutId);

    this.loggerService.log('Requesting Auth0 Management API token');

    const { access_token, expires_in } = await fetch(
      'https://dev-qmx75p4q.us.auth0.com/oauth/token',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
          client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
          audience: process.env.AUTH0_MANAGEMENT_AUDIENCE,
          grant_type: 'client_credentials',
        }),
      },
    ).then<Auth0TokenResponse>((x) => x.json());

    this.token = access_token;

    const refetchMs = Math.floor((expires_in * 3) / 4);

    this.loggerService.log(
      `Got an Auth0 Management API token. Going to refetch in ${refetchMs}ms`,
    );

    setTimeout(() => this.refreshToken(), refetchMs);
  }

  async onModuleInit() {
    await this.refreshToken();
  }

  onModuleDestroy() {
    clearInterval(this.timeoutId);
  }
}
