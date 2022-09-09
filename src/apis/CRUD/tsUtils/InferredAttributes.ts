
export type InferredParams<T> = T extends { params: infer U } ? U : never;
export type InferredBody<T> = T extends { body: infer U } ? U : never
export type InferredReturns<T> = T extends { returns: infer U } ? U : never