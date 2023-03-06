// Define a type that needs a first and last name
export type FirstLastName = {
  first_name: string;
  last_name: string;
};

// Extend the T generic with the fullName attribute
export type WithFullName<T> = T & {
  full_name: string;
};
