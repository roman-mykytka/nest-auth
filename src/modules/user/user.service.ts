import { Transactional } from 'typeorm-transactional';
import { ConflictException, Injectable } from '@nestjs/common';
import { EncryptService, EnvironmentService } from '@shared/services/services';
import { RoleService } from '@modules/role/role.service';
import { Role } from '@modules/role/enums/role.enum';
import { UserExceptionsMessage } from '@modules/user/enums/enums';
import { UserSignUpRequestDto } from '@modules/auth/dto/dto';
import { User } from '@modules/user/entities/entities';
import { UserResponseDto } from '@modules/user/dto/dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly encryptService: EncryptService,
    private readonly roleService: RoleService,
    private readonly environmentService: EnvironmentService,
  ) {}

  @Transactional()
  public async create(createUserDto: UserSignUpRequestDto): Promise<User> {
    const { firstName, lastName, email, password } = createUserDto;
    const existedUser = await this.findByEmail(email);

    if (existedUser) {
      throw new ConflictException(UserExceptionsMessage.EMAIL_IS_ALREADY_TAKEN);
    }

    const passwordSalt = await this.encryptService.generateSalt(
      this.environmentService.userPasswordSaltRounds,
    );

    const passwordHash = await this.encryptService.encrypt(
      password,
      passwordSalt,
    );

    const createdUser = await this.usersRepository.createUser({
      firstName,
      lastName,
      email,
      passwordSalt,
      passwordHash,
      isActive: false,
    });

    const userRole = await this.roleService.findByName(Role.USER);
    createdUser.roles = [userRole];

    return await this.usersRepository.saveUser(createdUser);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findByEmail(email);
  }

  public async findById(id: string): Promise<User | null> {
    return await this.usersRepository.findById(id);
  }

  async getAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.getAll();

    return users.map(this.mapToUserResponseDto);
  }

  private mapToUserResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles.map((role) => role.name),
    };
  }
}
