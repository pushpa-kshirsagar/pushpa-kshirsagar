import CalculatorAdvancedIcon from '@material-ui/icons/KeyboardHide';
import CalculatorIcon from '@material-ui/icons/Keyboard';
import ManuscriptIcon from '@material-ui/icons/Description';
import Worksheet from '@material-ui/icons/InsertDriveFile';
import GaugeIcon from '@material-ui/icons/Dashboard';
import TemplateIcon from '@material-ui/icons/BorderClear';

export const ASSIGNMENT_DISTINCT_POPUP = [
  {
    data: 'distinct',
    dataValue: 'distinct',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'active',
    dataValue: 'active',
    optionClass: 'optionSecondary'
  },
  {
    data: 'inactive',
    dataValue: 'inactive',
    optionClass: 'optionSecondary',
    divider: 'light'
  },
  {
    data: 'all',
    dataValue: 'all',
    optionClass: 'optionSecondary',
    divider: 'light'
  },
  {
    data: 'archived',
    dataValue: 'archived',
    optionClass: 'optionSecondary',
    divider: 'light'
  },
  {
    data: 'upcoming',
    dataValue: 'upcoming',
    optionClass: 'optionSecondary'
  }
];
export const NOTIFICATION_REPORT_POPUP = [
  {
    data: 'distinct',
    dataValue: 'distinct',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'all',
    dataValue: 'all',
    optionClass: 'optionSecondary',
    divider: 'light'
  },
  {
    data: 'archived',
    dataValue: 'archived',
    optionClass: 'optionSecondary',
    divider: 'light'
  },
  {
    data: 'flagged',
    dataValue: 'flagged',
    optionClass: 'optionSecondary'
  },
  {
    data: 'unflagged',
    dataValue: 'unflagged',
    optionClass: 'optionSecondary',
    divider: 'light'
  },
  {
    data: 'read',
    dataValue: 'read',
    optionClass: 'optionSecondary'
  },
  {
    data: 'unread',
    dataValue: 'unread',
    optionClass: 'optionSecondary'
  }
];
export const ASSESSEE_CARD_POPUP_OPTIONS = [
  {
    data: 'assignments',
    dataValue: 'assesseeselfassignments',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'assignment',
    permission: 'review'
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'reports',
    dataValue: 'reports',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'password',
    dataValue: 'password',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'review',
    dataValue: 'review',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'revise',
    dataValue: 'revise',
    optionClass: 'optionPrimary',
    divider: 'light',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'revise'
  },
  {
    data: 'sign-out',
    dataValue: 'sign-out',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  }
];
export const REVIEW_POPUP_OPTIONS = [
  {
    data: 'distinct',
    dataValue: 'distinct',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'groups',
    dataValue: 'groups',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'managers',
    dataValue: 'managers',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'nodes',
    dataValue: 'nodes',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'roles',
    dataValue: 'roles',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'types',
    dataValue: 'types',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'marketplace',
    dataValue: 'marketplace',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'active',
    dataValue: 'active',
    optionClass: 'optionSecondary',
    disabled: false
  },
  {
    data: 'inactive',
    dataValue: 'inactive',
    optionClass: 'optionSecondary',
    divider: 'light',
    disabled: false
  },
  {
    data: 'all',
    dataValue: 'all',
    optionClass: 'optionSecondary',
    divider: 'light',
    disabled: false
  },
  {
    data: 'archived',
    dataValue: 'archived',
    optionClass: 'optionSecondary',
    disabled: false
  }
];
export const ASSOCIATE_CARD_POPUP_OPTION = [
  {
    data: 'administrators',
    dataValue: 'administrators',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'groups',
    dataValue: 'groups',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'managers',
    dataValue: 'managers',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'nodes',
    dataValue: 'nodes',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'roles',
    dataValue: 'roles',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'types',
    dataValue: 'types',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'marketplace',
    dataValue: 'marketplace',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'associateHierarchy',
    permission: 'review'
  },
  {
    data: 'exchange',
    dataValue: 'exchange',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'associateHierarchy',
    permission: 'review'
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'reports',
    dataValue: 'reports',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'review',
    dataValue: 'associatereview',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'associate',
    permission: 'review'
  },
  {
    data: 'revise',
    dataValue: 'associaterevise',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'associate',
    permission: 'review'
  },
  {
    data: 'switch',
    dataValue: 'switch',
    optionClass: 'optionPrimary',
    disabled: 'no'
  }
];
export const ASSESSEE_PERMISSION = {
  assessee: ['archive', 'create', 'delete', 'review', 'revise'],
  assessment: ['archive', 'create', 'delete', 'review', 'revise'],
  assessment_item: ['archive', 'create', 'delete', 'review', 'revise'],
  assignment: ['archive', 'create', 'delete', 'review', 'revise'],
  assignment_dictionary: ['archive', 'create', 'delete', 'review', 'revise'],
  associate_hierarchy: ['archive', 'create', 'delete', 'review', 'revise'],
  iGauge_culture_profile: ['archive', 'create', 'delete', 'review', 'revise'],
  iGauge_job_profile: ['archive', 'create', 'delete', 'review', 'revise']
};
//LEFT FOOTER ICON ARRAY
export const CALCULATOR_POPUP_ARR = [
  { lable: 'basic', dataValue: 'basic', Icon: CalculatorIcon },
  { lable: 'buisness', dataValue: 'buisness', Icon: CalculatorIcon },
  { lable: 'financial', dataValue: 'financial', Icon: CalculatorAdvancedIcon },
  { lable: 'scientific', dataValue: 'scientific', Icon: CalculatorAdvancedIcon }
];
export const MANUSCRIPT_POPUP_ARR = [
  { lable: 'assessment', dataValue: 'assessment', Icon: ManuscriptIcon }
];
export const WORKSHEET_POPUP_ARR = [
  { lable: 'google', labelTwo: 'spreadsheet', dataValue: 'google spreadsheet', Icon: Worksheet },
  { lable: 'google', labelTwo: 'textsheet', dataValue: 'google textsheet', Icon: Worksheet },
  {
    lable: 'microsoft',
    labelTwo: 'spreadsheet',
    dataValue: 'microsoft spreadsheet',
    Icon: Worksheet
  },
  { lable: 'microsoft', labelTwo: 'textsheet', dataValue: 'microsoft textsheet', Icon: Worksheet },
  { lable: 'spreadsheet', dataValue: 'spreadsheet', Icon: Worksheet },
  { lable: 'textsheet', dataValue: 'textsheet', Icon: Worksheet }
];
export const GAUGE_POPUP_ARR = [{ lable: 'internet', dataValue: 'internet', Icon: GaugeIcon }];
export const INTERNET_POPUP_ARR = [
  { lable: 'ookla speedtest', dataValue: 'ooklaspeedtest', Icon: GaugeIcon }
];
export const TOOLKIT_POPUP_ARR = [
  { lable: 'gauge', dataValue: 'gauge', Icon: GaugeIcon },
  {
    lable: 'template',
    dataValue: 'template',
    Icon: TemplateIcon
  }
];
export const TEMPLATE_POPUP_ARR = [
  {
    lable: 'alignment',
    dataValue: 'alignment',
    Icon: TemplateIcon
  }
];
export const ALIGNMENT_POPUP_ARR = [
  {
    id: 1,
    lable: 'one',
    labelTwo: 'column',
    dataValue: 'oneColumn',
    Icon: TemplateIcon
  },
  {
    id: 2,
    lable: 'two',
    labelTwo: 'column',
    dataValue: 'twoColumn',
    Icon: TemplateIcon
  },
  {
    id: 3,
    lable: 'three',
    labelTwo: 'column',
    dataValue: 'threeColumn',
    Icon: TemplateIcon
  },
  {
    id: 4,
    lable: 'four',
    labelTwo: 'column',
    dataValue: 'fourColumn',
    Icon: TemplateIcon
  },
  {
    id: 5,
    lable: 'five',
    labelTwo: 'column',
    dataValue: 'fiveColumn',
    Icon: TemplateIcon
  },
  {
    id: 6,
    lable: 'six',
    labelTwo: 'column',
    dataValue: 'sixColumn',
    Icon: TemplateIcon
  }
];
//review information popup option

export const REVIEW_REVISE_POPUP = [
  {
    data: 'information',
    dataValue: 'information',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  { data: 'all', dataValue: 'all', optionClass: 'optionSecondary' },
  { data: 'key', dataValue: 'key', optionClass: 'optionSecondary' }
];
export const ASSESSEE_REVIEW_REVISE_POPUP = [
  {
    data: 'information',
    dataValue: 'information',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  { data: 'all', dataValue: 'all', optionClass: 'optionSecondary' },
  { data: 'key', dataValue: 'key', optionClass: 'optionSecondary', divider: 'dark' },
  { data: 'anonymous', dataValue: 'anonymous', optionClass: 'optionSecondary' },
  { data: 'blank', dataValue: 'blank', optionClass: 'optionSecondary' }
];
//
export const SIGN_OUT_POPUP = [
  { data: 'no', dataValue: 'no', optionClass: 'optionPrimary', disabled: false },
  { data: 'yes', dataValue: 'yes', optionClass: 'optionPrimary', disabled: false }
];
export const MODULE_POPUP_OPTION = [
  {
    data: 'create',
    dataValue: 'create',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'create'
  },
  {
    data: 'review',
    dataValue: 'review',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'reports',
    dataValue: 'reports',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  }
];
export const GROUP_NODE_ROLE_TYPE_POPUP_OPTION = [
  { data: 'create', dataValue: 'create', optionClass: 'optionPrimary', disabled: false },
  {
    data: 'review',
    dataValue: 'review',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  { data: 'notifications', dataValue: 'notifications', optionClass: 'optionPrimary' },
  {
    data: 'reports',
    dataValue: 'reports',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  { data: 'assessees', dataValue: 'assessees', optionClass: 'optionSecondary' },
  {
    data: 'assessments',
    dataValue: 'assessments',
    optionClass: 'optionSecondary',
    disabled: false
  },
  {
    data: 'assignments',
    dataValue: 'assignments',
    optionClass: 'optionSecondary',
    disabled: false
  },
  { data: 'associates', dataValue: 'associates', optionClass: 'optionSecondary', disabled: false }
];
export const EXCHANGE_POPUP_OPTION = [
  { data: 'download', dataValue: 'download', optionClass: 'optionPrimary', disabled: false },
  {
    data: 'upload',
    dataValue: 'upload',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  { data: 'assessees', dataValue: 'assessees', optionClass: 'optionSecondary', disabled: false },
  {
    data: 'assessments',
    dataValue: 'assessments',
    optionClass: 'optionSecondary',
    disabled: false
  },
  {
    data: 'assignments',
    dataValue: 'assignments',
    optionClass: 'optionSecondary',
    disabled: false
  },
  { data: 'associates', dataValue: 'associates', optionClass: 'optionSecondary', disabled: false }
];
export const MARKETPLACE_POPUP_OPTION = [
  {
    data: 'notifications',
    dataValue: 'notifications',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'reports',
    dataValue: 'reports',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  { data: 'review', dataValue: 'marketplacereview', optionClass: 'optionPrimary', disabled: false }
];
export const REVIEW_DISTINCT_POPUP_OPTION = [
  {
    data: 'distinct',
    dataValue: 'distinct',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  { data: 'active', dataValue: 'active', optionClass: 'optionSecondary' },
  {
    data: 'inactive',
    dataValue: 'inactive',
    optionClass: 'optionSecondary',
    divider: 'light',
    disabled: false
  },
  {
    data: 'all',
    dataValue: 'all',
    optionClass: 'optionSecondary',
    divider: 'loght',
    disabled: false
  },
  { data: 'archived', dataValue: 'archived', optionClass: 'optionSecondary', disabled: false }
];
