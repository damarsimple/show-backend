/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  PLAN: "ECONOMY" | "FREE" | "PREMIUM"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Auth: { // root type
    message: string; // String!
    status: boolean; // Boolean!
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Genre: { // root type
    id: number; // Int!
    name: string; // String!
  }
  Mutation: {};
  Query: {};
  Show: { // root type
    description: string; // String!
    id: number; // Int!
    image_potrait: string; // String!
    image_wide: string; // String!
    name: string; // String!
    rating: string; // String!
    year: number; // Int!
  }
  User: { // root type
    email: string; // String!
    id: number; // Int!
    plan: NexusGenEnums['PLAN']; // PLAN!
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Auth: { // field return type
    message: string; // String!
    status: boolean; // Boolean!
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Genre: { // field return type
    id: number; // Int!
    name: string; // String!
    shows: NexusGenRootTypes['Show'][]; // [Show!]!
  }
  Mutation: { // field return type
    genreCreate: NexusGenRootTypes['Genre'] | null; // Genre
    genreDelete: NexusGenRootTypes['Genre'] | null; // Genre
    genreUpdate: NexusGenRootTypes['Genre'] | null; // Genre
    login: NexusGenRootTypes['Auth'] | null; // Auth
    register: NexusGenRootTypes['Auth'] | null; // Auth
    showCreate: NexusGenRootTypes['Show'] | null; // Show
    showDelete: NexusGenRootTypes['Show'] | null; // Show
    showUpdate: NexusGenRootTypes['Show'] | null; // Show
  }
  Query: { // field return type
    genre: NexusGenRootTypes['Genre'] | null; // Genre
    genres: Array<NexusGenRootTypes['Genre'] | null> | null; // [Genre]
    me: NexusGenRootTypes['User'] | null; // User
    recomendations: Array<NexusGenRootTypes['Show'] | null> | null; // [Show]
    show: NexusGenRootTypes['Show'] | null; // Show
    shows: Array<NexusGenRootTypes['Show'] | null> | null; // [Show]
    trending: Array<NexusGenRootTypes['Show'] | null> | null; // [Show]
  }
  Show: { // field return type
    description: string; // String!
    genres: NexusGenRootTypes['Genre'][]; // [Genre!]!
    id: number; // Int!
    image_potrait: string; // String!
    image_wide: string; // String!
    name: string; // String!
    rating: string; // String!
    year: number; // Int!
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    plan: NexusGenEnums['PLAN']; // PLAN!
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Auth: { // field return type name
    message: 'String'
    status: 'Boolean'
    token: 'String'
    user: 'User'
  }
  Genre: { // field return type name
    id: 'Int'
    name: 'String'
    shows: 'Show'
  }
  Mutation: { // field return type name
    genreCreate: 'Genre'
    genreDelete: 'Genre'
    genreUpdate: 'Genre'
    login: 'Auth'
    register: 'Auth'
    showCreate: 'Show'
    showDelete: 'Show'
    showUpdate: 'Show'
  }
  Query: { // field return type name
    genre: 'Genre'
    genres: 'Genre'
    me: 'User'
    recomendations: 'Show'
    show: 'Show'
    shows: 'Show'
    trending: 'Show'
  }
  Show: { // field return type name
    description: 'String'
    genres: 'Genre'
    id: 'Int'
    image_potrait: 'String'
    image_wide: 'String'
    name: 'String'
    rating: 'String'
    year: 'Int'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    plan: 'PLAN'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    genreCreate: { // args
      name: string; // String!
    }
    genreDelete: { // args
      id: number; // Int!
    }
    genreUpdate: { // args
      id: number; // Int!
      name: string; // String!
    }
    login: { // args
      password: string; // String!
      username: string; // String!
    }
    register: { // args
      email: string; // String!
      genres: Array<number | null>; // [Int]!
      password: string; // String!
      plan: NexusGenEnums['PLAN']; // PLAN!
      username: string; // String!
    }
    showCreate: { // args
      description: string; // String!
      director: string; // String!
      image_potrait: string; // String!
      image_wide: string; // String!
      name: string; // String!
      rating: string; // String!
      year: number; // Int!
    }
    showDelete: { // args
      id: number; // Int!
    }
    showUpdate: { // args
      id: number; // Int!
      name: string; // String!
    }
  }
  Query: {
    genre: { // args
      id: number; // Int!
    }
    show: { // args
      id: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}