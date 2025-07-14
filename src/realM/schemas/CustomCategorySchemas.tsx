// sourceCode/realm/schemas/UserSchema.js

export const CategoryFolderSchema = {
  name: 'CategoryFolder',
  embedded: true,
  properties: {
    Id: 'int',
    Name: 'string?',
    IconUrl: 'string?',
    IconUrlOriginal: 'string?',
    PinnedToMenu: 'bool?',
    FontAwesomeIconId: 'int?',
    FontAwesomeIconCode: 'string?',
    FontAwesomeIconName: 'string?',
    ApplicationId: 'int?',
  },
};

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
    HasLinks: 'bool',
    HasMedia: 'bool',
    Id: 'int',
    Name: 'string?',
    Description: 'string?',
    Modified: 'string?',
    Created: 'string?',
    CreatedBy: 'string?',
    IconUrl: 'string?',
    FeaturedImageUrl: 'string?',
    FeaturedOrginalImageUrl: 'string?',
    CustomCategoryMedias: 'string[]',
    CustomCategoryLinks: 'string[]',
    Address: 'string?',
    City: 'string?',
    Latitude: 'double',
    Longitude: 'double',
    SortOrder: 'int',
    ContentType: 'string?',
    ContentUrl: 'string?',
    Company: 'string?',
    IsFullImage: 'bool',
    JobTitle: 'string?',
    Group: 'string?',
    ShowFeatureImageBelowTitle: 'bool',
    CategoryFolder: 'CategoryFolder?',
    LinkedPrograms: 'LinkedProgram[]',
    LinkedParticipantsIds: 'int[]',
    ParticipantGroups: 'string[]',
    VirtualMeetingLink: 'string?',
    VirtualMeetingType: 'string?',
    VirtualMeetingCode: 'string?',
    VirtualMeetingUrl: 'string?',
    HideEndTimeDuration: 'bool',
    HasExternalZoomLink: 'bool',
    VirtualMeetingDetails: 'string?',
  },
};

export const CustomCategorySchemas = [CategoryFolderSchema, LinkedProgramSchema, CustomCategorySchema];
