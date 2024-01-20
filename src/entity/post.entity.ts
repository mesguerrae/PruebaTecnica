// post.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => UserEntity, user => user.id)
  user: UserEntity ;

  /*@Column({ default: 0 })
  user: number;*/

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor() {
    this.title = ''; // Inicialización en el constructor
    this.user = new UserEntity();
    //this.user = 0;
    this.content = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = new Date();
    this.likes = 0;
    this.id = 0;
    // Resto del código del constructor
  }
}
