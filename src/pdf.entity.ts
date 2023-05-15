import { Entity, Column, PrimaryGeneratedColumn,  } from "typeorm";

@Entity()
export class PDF{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  

  @Column('bytea')
  data:Buffer;
}

