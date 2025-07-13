// sourceCode/realm/schemas/UserSchema.js

export const LinkedProgramSchema = {
  name: 'LinkedProgram',
  embedded: true,
  properties: {
    Name: 'string?',
    Modified: 'string?',
    Longitude: 'double?',
  },
};

export const CustomCategorySchema = {
  name: 'CustomCategoryItem',
  primaryKey: 'Id',
  properties: {
    Id: 'int',
    Name: 'string?',
    Description: 'string?',
    Modified: 'string?',
    Created: 'string?',
    IconUrl: 'string?',
    FeaturedImageUrl: 'string?',
    FeaturedOrginalImageUrl: 'string?',
    Address: 'string?',
    City: 'string?',
    Latitude: 'double',
    Longitude: 'double',
    SortOrder: 'int',
    ContentType: 'string?',
    ContentUrl: 'string?',
    IsFullImage: 'bool',
    JobTitle: 'string?',
    Group: 'string?',
    ShowFeatureImageBelowTitle: 'bool',
    CategoryFolder: 'string?',
    VirtualMeetingLink: 'string?',
    VirtualMeetingType: 'string?',
    VirtualMeetingCode: 'string?',
    VirtualMeetingUrl: 'string?',
    HideEndTimeDuration: 'bool',
    HasExternalZoomLink: 'bool',
    VirtualMeetingDetails: 'string?',
    LinkedParticipantsIds: 'int[]',
    LinkedPrograms: 'LinkedProgram[]',
    ParticipantGroups: 'string[]',
    CustomCategoryMedias: 'string[]',
    CustomCategoryLinks: 'string[]',
    HasLinks: 'bool',
    HasMedia: 'bool',
  },
};

export const CustomCategorySchemas = [LinkedProgramSchema, CustomCategorySchema];
