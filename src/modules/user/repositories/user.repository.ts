import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async createUser(entity: Partial<User>): Promise<User> {
    return this.create(entity);
  }

  public async saveUser(entity: User): Promise<User> {
    return this.save(entity);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email }, relations: ['roles'] });
  }

  public async findById(id: string): Promise<User | null> {
    return this.findOne({ where: { id }, relations: ['roles'] });
  }
}
