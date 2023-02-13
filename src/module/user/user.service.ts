import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../database/PrismaService';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Neo4jService } from '../neo4j/neo4j.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private neo4jService: Neo4jService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExists) {
      throw new Error('Já existe um usuário com esse email.');
    }

    const data = {
      ...createUserDto,
      createdAt: new Date(),
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    try {
      const node = await this.neo4jService.createNodeUser(
        createdUser.id
      );
    } catch (error) {
      console.log(error);
    }

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async update(updateUser: UpdateUserDto, user: User) {
    const data = {
      ...updateUser,
      updatedAt: new Date(),
      password: updateUser.password
        ? await bcrypt.hash(updateUser.password, 10)
        : undefined,
    };

    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data,
    });

    const res = {
      email: updateUser.email,
      imageUrl: updateUser.imageUrl,
      name: updateUser.name,
    };
    console.log(res);
    return res;
  }
}
