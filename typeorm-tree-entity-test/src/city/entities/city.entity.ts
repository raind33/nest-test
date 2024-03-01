import {
  Entity,
  Tree,
  PrimaryGeneratedColumn,
  Column,
  TreeChildren,
  TreeParent,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @TreeChildren()
  children: City[];

  @TreeParent()
  parent: City;
}
