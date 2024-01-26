import { genSalt, hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptService {
  public generateSalt(salt: number): Promise<string> {
    return genSalt(salt);
  }

  public encrypt(str: string, salt: string): Promise<string> {
    return hash(str, salt);
  }

  public async compare({
    data,
    salt,
    strHash,
  }: {
    data: string;
    salt: string;
    strHash: string;
  }): Promise<boolean> {
    const hash = await this.encrypt(data, salt);

    return hash === strHash;
  }
}
