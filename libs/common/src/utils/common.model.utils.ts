/**
 * This file contains commom Prisma mode utilities that can be used to enhance the models
 */
import { WithFullName, FirstLastName } from './common.model.types';
import { Prisma } from '@prisma/client';
/**
 * Removes certain keys from a model object - such as passwords
 * @param modelObject The mode object we want to remove keys from
 * @param keys The list of keys we want to remove
 * @returns The adjusted object
 */
export function excludeKeys<T, Key extends keyof T>(
  modelObject: T,
  keys: Key[],
): Omit<T, Key> {
  for (const key of keys) {
    delete modelObject[key];
  }
  return modelObject;
}

// Take objects that satisfy FirstLastName and computes a full name
export function computeFullName<T extends FirstLastName>(
  modelObject: T,
): WithFullName<T> {
  return {
    ...modelObject,
    fullName: modelObject.first_name + ' ' + modelObject.last_name,
  };
}

export const xprisma = prisma.$extends({
  result: {
    user: {
      fullName: {
        // the dependencies
        needs: { first_name: true, last_name: true },
        compute(user) {
          // the computation logic
          return `${user.first_name} ${user.last_name}`;
        },
      },
    },
  },
});
