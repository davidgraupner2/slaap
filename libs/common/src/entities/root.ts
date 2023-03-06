/*
Defines a root entity with fields that other entities can inherit.
*/
export class Root {
  id: number;
  isActive: boolean;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: number;
}
