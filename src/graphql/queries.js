/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRealtorReview = /* GraphQL */ `
  query GetRealtorReview($id: ID!) {
    getRealtorReview(id: $id) {
      id
      rating
      review
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listRealtorReviews = /* GraphQL */ `
  query ListRealtorReviews(
    $filter: ModelRealtorReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRealtorReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        rating
        review
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncRealtorReviews = /* GraphQL */ `
  query SyncRealtorReviews(
    $filter: ModelRealtorReviewFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRealtorReviews(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        rating
        review
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getPostReview = /* GraphQL */ `
  query GetPostReview($id: ID!) {
    getPostReview(id: $id) {
      id
      rating
      review
      postID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listPostReviews = /* GraphQL */ `
  query ListPostReviews(
    $filter: ModelPostReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        rating
        review
        postID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncPostReviews = /* GraphQL */ `
  query SyncPostReviews(
    $filter: ModelPostReviewFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPostReviews(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        rating
        review
        postID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const postReviewsByPostID = /* GraphQL */ `
  query PostReviewsByPostID(
    $postID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPostReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postReviewsByPostID(
      postID: $postID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        rating
        review
        postID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      sub
      firstName
      lastName
      profilePic
      comment
      RealtorReview {
        id
        rating
        review
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      PostReview {
        id
        rating
        review
        postID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRealtorReviewId
      userPostReviewId
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sub
        firstName
        lastName
        profilePic
        comment
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userRealtorReviewId
        userPostReviewId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        sub
        firstName
        lastName
        profilePic
        comment
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userRealtorReviewId
        userPostReviewId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getRealtor = /* GraphQL */ `
  query GetRealtor($id: ID!) {
    getRealtor(id: $id) {
      id
      sub
      firstName
      lastName
      myDescription
      profilePic
      email
      address
      phoneNumber
      bankname
      accountName
      accountNumber
      Post {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listRealtors = /* GraphQL */ `
  query ListRealtors(
    $filter: ModelRealtorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRealtors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sub
        firstName
        lastName
        myDescription
        profilePic
        email
        address
        phoneNumber
        bankname
        accountName
        accountNumber
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncRealtors = /* GraphQL */ `
  query SyncRealtors(
    $filter: ModelRealtorFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRealtors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        sub
        firstName
        lastName
        myDescription
        profilePic
        email
        address
        phoneNumber
        bankname
        accountName
        accountNumber
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      propertyType
      type
      availableDocs
      accommodationParts
      media
      description
      address
      lat
      lng
      price
      totalPrice
      bed
      bedrooms
      amenities
      policies
      country
      state
      city
      PostReviews {
        nextToken
        startedAt
        __typename
      }
      realtorID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        propertyType
        type
        availableDocs
        accommodationParts
        media
        description
        address
        lat
        lng
        price
        totalPrice
        bed
        bedrooms
        amenities
        policies
        country
        state
        city
        realtorID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncPosts = /* GraphQL */ `
  query SyncPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        propertyType
        type
        availableDocs
        accommodationParts
        media
        description
        address
        lat
        lng
        price
        totalPrice
        bed
        bedrooms
        amenities
        policies
        country
        state
        city
        realtorID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const postsByRealtorID = /* GraphQL */ `
  query PostsByRealtorID(
    $realtorID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByRealtorID(
      realtorID: $realtorID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        propertyType
        type
        availableDocs
        accommodationParts
        media
        description
        address
        lat
        lng
        price
        totalPrice
        bed
        bedrooms
        amenities
        policies
        country
        state
        city
        realtorID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
