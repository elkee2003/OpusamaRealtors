import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";





type EagerRealtorReview = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RealtorReview, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly rating?: number | null;
  readonly review?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRealtorReview = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RealtorReview, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly rating?: number | null;
  readonly review?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RealtorReview = LazyLoading extends LazyLoadingDisabled ? EagerRealtorReview : LazyRealtorReview

export declare const RealtorReview: (new (init: ModelInit<RealtorReview>) => RealtorReview) & {
  copyOf(source: RealtorReview, mutator: (draft: MutableModel<RealtorReview>) => MutableModel<RealtorReview> | void): RealtorReview;
}

type EagerPostReview = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PostReview, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly rating?: number | null;
  readonly review?: string | null;
  readonly postID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPostReview = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PostReview, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly rating?: number | null;
  readonly review?: string | null;
  readonly postID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PostReview = LazyLoading extends LazyLoadingDisabled ? EagerPostReview : LazyPostReview

export declare const PostReview: (new (init: ModelInit<PostReview>) => PostReview) & {
  copyOf(source: PostReview, mutator: (draft: MutableModel<PostReview>) => MutableModel<PostReview> | void): PostReview;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sub: string;
  readonly firstName: string;
  readonly lastName?: string | null;
  readonly profilePic?: string | null;
  readonly comment?: string | null;
  readonly RealtorReview?: RealtorReview | null;
  readonly PostReview?: PostReview | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userRealtorReviewId?: string | null;
  readonly userPostReviewId?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sub: string;
  readonly firstName: string;
  readonly lastName?: string | null;
  readonly profilePic?: string | null;
  readonly comment?: string | null;
  readonly RealtorReview: AsyncItem<RealtorReview | undefined>;
  readonly PostReview: AsyncItem<PostReview | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userRealtorReviewId?: string | null;
  readonly userPostReviewId?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerRealtor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Realtor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sub: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly myDescription?: string | null;
  readonly profilePic?: string | null;
  readonly email?: string | null;
  readonly address?: string | null;
  readonly phoneNumber?: string | null;
  readonly bankname?: string | null;
  readonly accountName?: string | null;
  readonly accountNumber?: string | null;
  readonly Post?: (Post | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRealtor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Realtor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sub: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly myDescription?: string | null;
  readonly profilePic?: string | null;
  readonly email?: string | null;
  readonly address?: string | null;
  readonly phoneNumber?: string | null;
  readonly bankname?: string | null;
  readonly accountName?: string | null;
  readonly accountNumber?: string | null;
  readonly Post: AsyncCollection<Post>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Realtor = LazyLoading extends LazyLoadingDisabled ? EagerRealtor : LazyRealtor

export declare const Realtor: (new (init: ModelInit<Realtor>) => Realtor) & {
  copyOf(source: Realtor, mutator: (draft: MutableModel<Realtor>) => MutableModel<Realtor> | void): Realtor;
}

type EagerPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly propertyType: string;
  readonly type: string;
  readonly availableDocs?: (string | null)[] | null;
  readonly accommodationParts?: string | null;
  readonly media?: (string | null)[] | null;
  readonly description: string;
  readonly address: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly price: number;
  readonly totalPrice: number;
  readonly bed?: number | null;
  readonly bedrooms?: number | null;
  readonly amenities?: string | null;
  readonly policies?: string | null;
  readonly country: string;
  readonly state: string;
  readonly city: string;
  readonly PostReviews?: (PostReview | null)[] | null;
  readonly realtorID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly propertyType: string;
  readonly type: string;
  readonly availableDocs?: (string | null)[] | null;
  readonly accommodationParts?: string | null;
  readonly media?: (string | null)[] | null;
  readonly description: string;
  readonly address: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly price: number;
  readonly totalPrice: number;
  readonly bed?: number | null;
  readonly bedrooms?: number | null;
  readonly amenities?: string | null;
  readonly policies?: string | null;
  readonly country: string;
  readonly state: string;
  readonly city: string;
  readonly PostReviews: AsyncCollection<PostReview>;
  readonly realtorID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}