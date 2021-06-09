export const SIGN_IN_URL = '/sign-in';
export const MANAGER_ROLE_ID = ['609a207faeeea029d5b00c25', '6083d82a5c42683849ce14d0'];
export const ADMIN_ROLE_ID = ['60952c7b1752c36c6936532b', '60952ca11752c36c69365331'];
export const ADMINISTRATOR_SECONDARY_ID = '60952cd11752c36c69365337';
export const DEFAULT_ROLE_ID = '60952cd11752c36c69365337';
// export const GET_USER_URL = 'https://run.mocky.io/v3/a8daa4c8-e6e5-4062-8d88-05f3ffdc324d';
// export const GET_USER_URL = 'https://run.mocky.io/v3/d5c8b175-f59d-44e0-ae31-84bbc425f91d';
export const GET_USER_URL = 'https://run.mocky.io/v3/221042b0-a9d2-4268-9842-958d11977630';
// export const GET_USER_URL = 'https://run.mocky.io/v3/3119b17c-6c20-413f-97f2-37eac4c10348';

export const GET_ASSESSEE_PERMISSION_URL =
  'https://run.mocky.io/v3/84117b40-3763-4fc1-89c1-d8958e5a5530'; // for admin role
// export const GET_ASSESSEE_PERMISSION_URL = 'https://run.mocky.io/v3/d6144b23-0a0d-48b9-b58d-14fbfba95890';// for assessee role
// export const GET_ASSESSEE_PERMISSION_URL = 'https://run.mocky.io/v3/c0f46922-44b6-44fc-a8d6-ff2c5ec48a81';// for assessee manager (primary) role
// export const GET_ASSESSEE_PERMISSION_URL = 'https://run.mocky.io/v3/b4ff8c35-0445-4f0c-899b-68d8281b2bd8';// for assessee manager (secondary) role

export const PLATFORM_URL = 'https://xzi74b5495.execute-api.ap-south-1.amazonaws.com';
export const ASSESSEES_URL = 'https://3pbuyvo5wk.execute-api.ap-south-1.amazonaws.com';
export const ASSOCIATES_URL = 'https://gfxqx4a5uc.execute-api.ap-south-1.amazonaws.com';
export const ASSESSMENTS_URL = 'https://2hqmad6icc.execute-api.ap-south-1.amazonaws.com';
export const ASSIGNMENTS_URL = 'https://ibmped2cm2.execute-api.ap-south-1.amazonaws.com';

export const ASSESSEE_CREATE_URL = ASSESSEES_URL + '/dev/insight-guru/api/assessee-distinct/create';
export const ASSOCIATE_CREATE_URL = ASSOCIATES_URL + '/dev/insight-guru/api/associate-sign-on';
export const ASSESSEE_REVIEW_LIST_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-distinct/review-list';
export const ASSESSEE_REVIEW_INFO_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-distinct/review';
export const ASSOCIATE_REVIEW_INFO_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-distinct/review';
export const ASSESSEE_ROLE_REVIEW_LIST_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-role-distinct/review-list';
export const ASSOCIATE_REVIEWDISTINCT_LIST_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-distinct/review-list';
export const ASSESSEE_REVIEW_ROLE_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-role/review';
export const ASSOCIATE_REVIEW_ROLE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-role/review';
export const ASSESSEE_ROLE_CREATE_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-role/create';
export const ASSOCIATE_ROLE_CREATE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-role/create';
export const ASSOCIATE_ROLE_REVIEW_LIST_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-role/review-list';
export const ASSESSEE_REVIEW_GROUP_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-group/review';
export const ASSOCIATE_REVIEW_GROUP_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-group/review';
export const ASSESSEE_GROUP_CREATE_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-group/create';
export const ASSESSMENT_GROUP_CREATE_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-group/create';
export const ASSIGNMENT_GROUP_CREATE_URL =
  ASSIGNMENTS_URL + '/dev/insight-guru/api/assignment-group/create';
export const ASSOCIATE_GROUP_CREATE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-group/create';
export const ASSESSEE_GROUP_REVIEWLIST_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-group-distinct/review-list';
export const ASSOCIATE_GROUP_REVIEWLIST_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-group/review-list';
export const ASSESSMENT_GROUP_REVIEWLIST_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-group/review-list';
export const ASSIGNMENT_GROUP_REVIEWLIST_URL =
  ASSIGNMENTS_URL + '/dev/insight-guru/api/assignment-group/review-list';
export const ASSESSMENT_REVIEW_GROUP_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-group/review';
export const ASSESSMENT_REVISE_GROUP_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-group/revise';
export const ASSESSMENT_REVIEW_INFO_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-distinct/review';
export const ASSESSMENT_REVISE_INFO_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-distinct/revise';
export const ASSIGNMENT_REVIEW_INFO_URL =
  ASSIGNMENTS_URL + '/dev/insight-guru/api/assignment-distinct/review';
export const ASSIGNMENT_REVISE_INFO_URL =
  ASSIGNMENTS_URL + '/dev/insight-guru/api/assignment-distinct/revise';
export const ASSIGNMENT_REVIEW_GROUP_URL =
  ASSIGNMENTS_URL + '/dev/insight-guru/api/assignment-group/review';
export const ASSIGNMENT_REVISE_GROUP_URL =
  ASSIGNMENTS_URL + '/dev/insight-guru/api/assignment-group/revise';
export const ASSESSMENT_TYPE_CREATE_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-type/create';
export const ASSIGNMENT_TYPE_CREATE_URL =
  ASSIGNMENTS_URL + '/dev/insight-guru/api/assignment-type/create';
export const ASSESSMENT_TYPE_REVIEWLIST_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-type/review-list';
export const ASSIGNMENT_TYPE_REVIEWLIST_URL =
  ASSIGNMENTS_URL + '/dev/insight-guru/api/assignment-type/review-list';
export const ASSIGNMENT_REVIEW_LIST_URL =
  ASSIGNMENTS_URL + '/dev/insight-guru/api/assignment-distinct/review-list';
export const ASSESSMENT_REVIEW_LIST_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-distinct/review-list';
export const ASSESSMENT_CREATE_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-distinct/create';
export const ASSIGNMENT_CREATE_URL =
  ASSIGNMENTS_URL + '/dev/insight-guru/api/assignment-distinct/create';
export const ASSIGNMENT_REVIEW_TYPE_URL =
  ASSIGNMENTS_URL + '/dev/insight-guru/api/assignment-type/review';
export const ASSIGNMENT_REVISE_TYPE_URL =
  ASSIGNMENTS_URL + '/dev/insight-guru/api/assignment-type/revise';
export const ASSESSMENT_REVIEW_TYPE_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-type/review';
export const ASSESSMENT_REVISE_TYPE_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-type/revise';
export const ASSESSEE_REVIEW_TYPE_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-type/review';
export const ASSESSEE_REVISE_TYPE_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-type/revise';
export const ASSOCIATE_REVIEW_TYPE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-type/review';
export const ASSOCIATE_REVISE_TYPE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-type/revise';
export const ASSESSEE_SIGN_IN_URL = PLATFORM_URL + '/dev/insight-guru/api/platform/cognito-sign-in';
export const CONFIRM_ASSESSEE_URL =
  PLATFORM_URL + '/dev/insight-guru/api/platform/update-sign-in-info';
export const ASSESSEE_SIGN_IN_INFO_URL =
  PLATFORM_URL + '/dev/insight-guru/api/platform/refresh-signin-information';
export const ASSESSEE_INFO_REVISE_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-distinct/revise';
export const ASSESSEE_GROUP_INFO_REVISE_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-group/revise';
export const ASSESSEE_ROLE_INFO_REVISE_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-role/revise';
export const ASSESSEE_CHANGE_PASSWORD_URL =
  PLATFORM_URL + '/dev/insight-guru/api/platform/change-password';
export const ASSOCIATE_INFO_REVISE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-distinct/revise';
export const ASSESSEE_GROUP_ASSESSEE_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-group/assessee/review-list';
export const ASSOCIATE_GROUP_ASSOCIATE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-group/associate/review-list';
export const ASSOCIATE_GROUP_INFO_REVISE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-group/revise';
export const ASSOCIATE_ROLE_INFO_REVISE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-role/revise';
export const ASSESSEE_ROLE_ASSESSEE_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-role/assessee/review-list';
export const ASSESSEE_TYPE_ASSESSEE_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-type/assessee/review-list';
export const ASSOCIATE_ROLE_ASSOCIATE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-role/associate/review-list';
export const ASSOCIATE_TYPE_ASSOCIATE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-type/associate/review-list';
export const NODE_CREATE_URL = ASSOCIATES_URL + '/dev/insight-guru/api/associate-node/create';
export const ITEM_CREATE_URL = ASSESSMENTS_URL + '/dev/insight-guru/api/item-distinct/create';
export const ITEM_REVIEWLIST_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/item-distinct/review-list';
export const ITEM_REVIEW_URL = ASSESSMENTS_URL + '/dev/insight-guru/api/item-distinct/review';
export const ITEM_REVISE_URL = ASSESSMENTS_URL + '/dev/insight-guru/api/item-distinct/revise';
export const EXTERNAL_NODE_TREE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/iguru-node/review-list-hierarchy';
export const EXTERNAL_NODE_LIST_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/iguru-node/review-list';

export const INTERNAL_NODE_LIST_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-node/review-list';
export const INTERNAL_NODE_TREE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-node/review-list-hierarchy';
export const ASSESSEE_ROLE_GROUP_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-role-group/review-list';
export const ASSOCIATE_ROLE_GROUP_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-role-group/review-list';
export const ASSOCIATE_NODE_REVIEW_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-node/review';
export const ASSOCIATE_NODE_REVISE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-node/revise';
export const ASSESSEE_ROLE_SHARE_URL = ASSOCIATES_URL + '/dev/insight-guru/api/assessee-role/share';
export const ASSESSEE_ROLE_UNSHARE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/assessee-role/unshare';
export const ASSOCIATE_ROLE_SHARE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-role/share';
export const ASSOCIATE_ROLE_UNSHARE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-role/unshare';
export const ASSESSEE_NODE_ASSESSEE_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/associate-node/assessee/review-list';
export const ASSESSEE_LINK_URL =
  PLATFORM_URL + '/dev/insight-guru/api/platform/assessee-distinct/associate/review-list';
export const LINKED_ASSOCIATE_URL =
  PLATFORM_URL + '/dev/insight-guru/api/platform/assessee-distinct/associate/revise-list';
export const ASSESSEE_TYPE_CREATE_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-type/create';
export const ASSOCIATE_TYPE_CREATE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-type/create';
export const ASSESSEE_TYPE_REVIEWLIST_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-type/review-list';
export const ASSOCIATE_TYPE_REVIEWLIST_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-type/review-list';
export const ASSESSEE_TYPE_GROUP_URL =
  ASSESSEES_URL + '/dev/insight-guru/api/assessee-type-group/review-list';
export const ASSOCIATE_TYPE_GROUP_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-type-group/review-list';
export const ASSOCIATE_TYPE_SHARE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-type/share';
export const ASSOCIATE_TYPE_UNSHARE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-type/unshare';
export const ASSESSEE_TYPE_SHARE_URL = ASSOCIATES_URL + '/dev/insight-guru/api/assessee-type/share';
export const ASSESSEE_TYPE_UNSHARE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/assessee-type/unshare';
export const ITEM_GROUP_CREATE_URL = ASSESSMENTS_URL + '/dev/insight-guru/api/item-group/create';
export const ITEM_GROUP_REVIEWLIST_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/item-group/review-list';
export const ITEM_REVIEW_GROUP_URL = ASSESSMENTS_URL + '/dev/insight-guru/api/item-group/review';
export const ITEM_REVISE_GROUP_URL = ASSESSMENTS_URL + '/dev/insight-guru/api/item-group/revise';
export const ITEM_REVIEW_TYPE_URL = ASSESSMENTS_URL + '/dev/insight-guru/api/item-type/review';
export const ITEM_REVISE_TYPE_URL = ASSESSMENTS_URL + '/dev/insight-guru/api/item-type/revise';
export const ASSOCIATE_NODE_ASSOCIATE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/associate-node/associate/review-list';
export const ITEM_TYPE_CREATE_URL = ASSESSMENTS_URL + '/dev/insight-guru/api/item-type/create';
export const ITEM_TYPE_REVIEWLIST_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/item-type/review-list';
export const ITEMGROUPITEM_REVIEWLIST_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/item-group/item/review-list';
export const ITEMTYPEPITEM_REVIEWLIST_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/item-type/item/review-list';
export const ITEMNODEITEM_REVIEWLIST_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/associate-node/item/review-list';
export const ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-group/assessment/review-list';
export const ASSESSMENTTYPE_ASSESSMENT_REVIEWLIST_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-type/assessment/review-list';
export const ASSESSMENTNODE_ASSESSMENT_REVIEWLIST_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/associate-node/assessment/review-list';
export const ITEM_TYPE_SHARE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/assessment-item-types/share';
export const ITEM_TYPE_UNSHARE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/assessment-item-types/unshare';
export const ASSESSMENT_TYPE_SHARE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/assessment-type/share';
export const ASSESSMENT_TYPE_UNSHARE_URL =
  ASSOCIATES_URL + '/dev/insight-guru/api/assessment-type/unshare';
export const ITEM_TYPE_GROUP_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/item-type-group/review-list';
export const ASSESSMENT_TYPE_GROUP_URL =
  ASSESSMENTS_URL + '/dev/insight-guru/api/assessment-type-group/review-list';
// export const URL = '';
