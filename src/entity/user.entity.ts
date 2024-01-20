// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => PostEntity, post => post.user)
  posts: PostEntity; 

  /*@Column({ default: 0 })
  posts: number;*/

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor() {
    this.email = ''; // Inicialización en el constructor
    this.password = '';
    this.fullName = '';
    this.posts = new PostEntity()
    //this.posts = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = new Date();
    this.age = 0;
    this.id = 0;
    // Resto del código del constructor
  }
}
