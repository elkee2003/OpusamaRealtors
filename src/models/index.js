// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { RealtorReview, PostReview, User, Realtor, Post } = initSchema(schema);

export {
  RealtorReview,
  PostReview,
  User,
  Realtor,
  Post
};