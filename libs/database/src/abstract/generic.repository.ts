/**
 * A Generic repository pattern that will serve as the repository for all common entities
 * - We are following Clean Code Architecture: https://betterprogramming.pub/clean-node-js-architecture-with-nestjs-and-typescript-34b9398d790f
 */
export abstract class IGenericRepository<T> {
  abstract find(item: Partial<T>): Promise<T[]>;

  abstract findOne(id: number | Partial<T>): Promise<T>;

  abstract create(item: Omit<T, 'id'>): Promise<T>;

  abstract createMany(items: Omit<T, 'id'>[]): Promise<T[]>;

  abstract update(id: number, item: Partial<T>): Promise<T>;

  abstract delete(id: number): Promise<boolean>;

  abstract existById(id: number | Partial<T>): Promise<boolean>;

  abstract exist(item: Partial<T>): Promise<boolean>;
}
