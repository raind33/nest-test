import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { City } from './entities/city.entity';
@Injectable()
export class CityService {
  @InjectEntityManager()
  entityManage: EntityManager;

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  findAll() {
    return `This action returns all city`;
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
  async init() {
    // const cityP = new City();
    // cityP.name = '父级';
    // await this.entityManage.save(City, cityP);

    // const cityChild = new City();
    // cityChild.name = '子级';
    // const p = await this.entityManage.findOne(City, {
    //   where: {
    //     name: '父级',
    //   },
    // });
    // if (p) {
    //   cityChild.parent = p;
    // }
    // await this.entityManage.save(City, cityChild);

    // const cityChild2 = new City();
    // cityChild2.name = '孙子';
    // const p2 = await this.entityManage.findOne(City, {
    //   where: {
    //     name: '子级',
    //   },
    // });
    // if (p2) {
    //   cityChild2.parent = p2;
    // }
    // await this.entityManage.save(City, cityChild2);
    // return this.entityManage.getTreeRepository(City).findTrees();

    // 查询所有根节点
    // return this.entityManage.getTreeRepository(City).findRoots();

    // 查询parent下所有子节点
    // const parent = await this.entityManage.findOne(City, {
    //   where: {
    //     name: '父级',
    //   },
    // });
    // return this.entityManage
    //   .getTreeRepository(City)
    //   .findDescendantsTree(parent);

    // 查询parent下所有祖先节点
    // const parent = await this.entityManage.findOne(City, {
    //   where: {
    //     name: '孙子',
    //   },
    // });
    // return this.entityManage.getTreeRepository(City).findAncestorsTree(parent);

    // 查询parent下所有祖先节点 扁平结构返回
    // const parent = await this.entityManage.findOne(City, {
    //   where: {
    //     name: '孙子',
    //   },
    // });
    // return this.entityManage.getTreeRepository(City).findAncestors(parent);

    // 查询parent下所有祖先节点 计数
    const parent = await this.entityManage.findOne(City, {
      where: {
        name: '孙子',
      },
    });
    return this.entityManage.getTreeRepository(City).countAncestors(parent);
  }
}
