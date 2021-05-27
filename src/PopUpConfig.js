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
    dataKey: 'distinct',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'active',
    dataValue: 'active',
    dataKey: 'active',
    optionClass: 'optionSecondary'
  },
  {
    data: 'inactive',
    dataValue: 'inactive',
    dataKey: 'inactive',
    optionClass: 'optionSecondary',
    divider: 'light'
  },
  {
    data: 'all',
    dataValue: 'all',
    dataKey: 'all',
    optionClass: 'optionSecondary',
    divider: 'light'
  },
  {
    data: 'archived',
    dataValue: 'archived',
    dataKey: 'archived',
    optionClass: 'optionSecondary',
    divider: 'light'
  },
  {
    data: 'upcoming',
    dataValue: 'upcoming',
    dataKey: 'upcoming',
    optionClass: 'optionSecondary'
  }
];
export const NOTIFICATION_REPORT_POPUP = [
  {
    data: 'distinct',
    dataValue: 'distinct',
    dataKey: 'distinct',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'all',
    dataValue: 'all',
    dataKey: 'all',
    optionClass: 'optionSecondary',
    divider: 'light'
  },
  {
    data: 'archived',
    dataValue: 'archived',
    dataKey: 'archived',
    optionClass: 'optionSecondary',
    divider: 'light'
  },
  {
    data: 'flagged',
    dataValue: 'flagged',
    dataKey: 'flagged',
    optionClass: 'optionSecondary'
  },
  {
    data: 'unflagged',
    dataValue: 'unflagged',
    dataKey: 'unflagged',
    optionClass: 'optionSecondary',
    divider: 'light'
  },
  {
    data: 'read',
    dataValue: 'read',
    dataKey: 'read',
    optionClass: 'optionSecondary'
  },
  {
    data: 'unread',
    dataValue: 'unread',
    dataKey: 'unread',
    optionClass: 'optionSecondary'
  }
];
export const ASSESSEE_CARD_POPUP_OPTIONS = [
  {
    data: 'assignments',
    dataValue: 'assesseeselfassignments',
    dataKey: 'assesseeselfassignments',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'assignment',
    permission: 'review'
  },
  {
    data: 'interviews',
    dataValue: 'interviews',
    dataKey: 'interviews',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'link',
    dataValue: 'link',
    dataKey: 'link',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'password',
    dataValue: 'password',
    dataKey: 'password',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    dataKey: 'notifications',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'reports',
    dataValue: 'reports',
    dataKey: 'reports',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'review',
    dataValue: 'review',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'revise',
    dataValue: 'revise',
    dataKey: 'revise',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'revise'
  },
  {
    data: 'sign-out',
    dataValue: 'sign-out',
    dataKey: 'sign-out',
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
    dataKey: 'distinctAPICall',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'groups',
    dataValue: 'groups',
    dataKey: 'groups',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'managers',
    dataValue: 'managers',
    dataKey: 'managers',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'nodes',
    dataValue: 'nodes',
    dataKey: 'nodes',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'roles',
    dataValue: 'roles',
    dataKey: 'roles',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'types',
    dataValue: 'types',
    dataKey: 'types',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'marketplace',
    dataValue: 'marketplace',
    dataKey: 'marketplace',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'active',
    dataValue: 'active',
    dataKey: 'active',
    optionClass: 'optionSecondary',
    disabled: false
  },
  {
    data: 'inactive',
    dataValue: 'inactive',
    dataKey: 'inactive',
    optionClass: 'optionSecondary',
    divider: 'light',
    disabled: false
  },
  {
    data: 'all',
    dataValue: 'all',
    dataKey: 'all',
    optionClass: 'optionSecondary',
    divider: 'light',
    disabled: false
  },
  {
    data: 'archived',
    dataValue: 'archived',
    dataKey: 'archived',
    optionClass: 'optionSecondary',
    disabled: false
  }
];
export const ASSOCIATE_CARD_POPUP_OPTION = [
  {
    data: 'administrators',
    dataValue: 'administrators',
    dataKey: 'administrators',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'analytics',
    dataValue: 'analytics',
    dataKey: 'analytics',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'marketplace',
    dataValue: 'marketplace',
    dataKey: 'marketplace',
    optionClass: 'optionPrimary',
    disabled: false,
    permissionArr: 'assessee',
    permission: 'review'
  },
  {
    data: 'mine',
    dataValue: 'mine',
    dataKey: 'mine',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false,
    permissionArr: 'assessee',
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
    data: 'groups',
    dataValue: 'groups',
    dataKey: 'groups',
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
    data: 'items',
    dataValue: 'items',
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
export const SELF_POPUP = [
  {
    data: 'review',
    dataValue: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  { data: 'revise', dataValue: 'revise', optionClass: 'optionPrimary', disabled: false }
];
export const ITEMS_POPUP = [
  {
    data: 'create',
    dataValue: 'create',
    optionClass: 'optionPrimary',
    disabled: true
  },
  {
    data: 'review',
    dataValue: 'review',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: true
  },
  { data: 'primary', dataValue: 'primary', optionClass: 'optionSecondary', disabled: false },
  { data: 'secondary', dataValue: 'secondary', optionClass: 'optionSecondary', disabled: false }
];
export const ANALYTICS_POPUP = [
  {
    data: 'create',
    dataValue: 'create',
    optionClass: 'optionPrimary',
    disabled: true
  },
  {
    data: 'review',
    dataValue: 'review',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: true
  },
  {
    data: 'culture profiles',
    dataValue: 'culture profiles',
    optionClass: 'optionSecondary',
    disabled: false
  },
  {
    data: 'job profiles',
    dataValue: 'job profiles',
    optionClass: 'optionSecondary',
    disabled: false
  }
];
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
  { data: 'create', dataValue: 'create', optionClass: 'optionPrimary', disabled: true },
  {
    data: 'review',
    dataValue: 'review',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: true
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    optionClass: 'optionPrimary',
    disabled: true
  },
  {
    data: 'reports',
    dataValue: 'reports',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: true
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
export const GROUP_TYPE_POPUP_OPTION = [
  { data: 'create', dataValue: 'create', optionClass: 'optionPrimary', disabled: true },
  {
    data: 'review',
    dataValue: 'review',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: true
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    optionClass: 'optionPrimary',
    disabled: true
  },
  {
    data: 'reports',
    dataValue: 'reports',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: true
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
  {
    data: 'associates',
    dataValue: 'associates',
    optionClass: 'optionSecondary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'culture profiles',
    dataValue: 'culture profiles',
    optionClass: 'optionSecondary',
    disabled: false
  },
  {
    data: 'job profiles',
    dataValue: 'job profiles',
    optionClass: 'optionSecondary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'items',
    dataValue: 'items',
    optionClass: 'optionSecondary',
    disabled: false
  }
];
export const NODE_POPUP_OPTION = [
  { data: 'create', dataValue: 'create', optionClass: 'optionPrimary', disabled: false },
  {
    data: 'review',
    dataValue: 'review',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
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
  { data: 'assessees', dataValue: 'assessees', optionClass: 'optionSecondary', disabled: true },
  {
    data: 'assessments',
    dataValue: 'assessments',
    optionClass: 'optionSecondary',
    disabled: true
  },
  {
    data: 'assignments',
    dataValue: 'assignments',
    optionClass: 'optionSecondary',
    disabled: true
  },
  { data: 'associate', dataValue: 'associate', optionClass: 'optionSecondary', disabled: false }
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
export const CREATE_INFORMATION_POPUP = [
  {
    data: 'information',
    dataValue: 'information',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'key',
    dataValue: 'key',
    optionClass: 'optionSecondary',
    disabled: false
  }
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

export const ASSESSEE_REVIEW_LIST_POPUP_OPTION = [
  {
    data: 'allocate',
    dataValue: 'allocate',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'archive',
    dataValue: 'archive',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'delete',
    dataValue: 'delete',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'flag',
    dataValue: 'flag',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'review',
    dataValue: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'revise',
    dataValue: 'revise',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'select',
    dataValue: 'select',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'share',
    dataValue: 'share',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'suspend',
    dataValue: 'suspend',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'terminate',
    dataValue: 'terminate',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'assignments',
    dataValue: 'assignments',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'reports',
    dataValue: 'reports',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const ASSESSMENT_REVIEW_LIST_POPUP_OPTION = [
  {
    data: 'allocate',
    dataValue: 'allocate',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'archive',
    dataValue: 'archive',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'delete',
    dataValue: 'delete',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'flag',
    dataValue: 'flag',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'publish',
    dataValue: 'publish',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'review',
    dataValue: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'revise',
    dataValue: 'revise',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'select',
    dataValue: 'select',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'share',
    dataValue: 'share',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'suspend',
    dataValue: 'suspend',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'terminate',
    dataValue: 'terminate',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'assignments',
    dataValue: 'assignments',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'reports',
    dataValue: 'reports',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const ASSOCIATE_REVIEW_LIST_POPUP_OPTION = [
  {
    data: 'allocate',
    dataValue: 'allocate',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'archive',
    dataValue: 'archive',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'delete',
    dataValue: 'delete',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'flag',
    dataValue: 'flag',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'review',
    dataValue: 'review',
    dataKey: 'reviewKey',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'revise',
    dataValue: 'revise',
    dataKey: 'reviewKey',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'select',
    dataValue: 'select',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'share',
    dataValue: 'share',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'suspend',
    dataValue: 'suspend',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'terminate',
    dataValue: 'terminate',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'reports',
    dataValue: 'reports',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const ASSIGNMENT_REVIEW_LIST_POPUP_OPTION = [
  {
    data: 'allocate',
    dataValue: 'allocate',
    dataKey: 'allocate',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'archive',
    dataValue: 'archive',
    dataKey: 'archive',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'delete',
    dataValue: 'delete',
    dataKey: 'delete',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'flag',
    dataValue: 'flag',
    dataKey: 'flag',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'publish',
    dataValue: 'publish',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'review',
    dataValue: 'review',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'revise',
    dataValue: 'revise',
    dataKey: 'revise',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'select',
    dataValue: 'select',
    dataKey: 'select',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'share',
    dataValue: 'share',
    dataKey: 'share',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'suspend',
    dataValue: 'suspend',
    dataKey: 'suspend',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'terminate',
    dataValue: 'terminate',
    dataKey: 'terminate',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'assessees',
    dataValue: 'assessees',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'assessments',
    dataValue: 'assessments',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'reports',
    dataValue: 'reports',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const ASSESSEE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION = [
  {
    data: 'allocate',
    dataValue: 'allocate',
    dataKey: 'allocate',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'archive',
    dataValue: 'archive',
    dataKey: 'archive',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'delete',
    dataValue: 'delete',
    dataKey: 'delete',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'flag',
    dataValue: 'flag',
    dataKey: 'flag',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'review',
    dataValue: 'review',
    dataKey: 'reviewKey',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'revise',
    dataValue: 'revise',
    dataKey: 'reviseKey',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'select',
    dataValue: 'select',
    dataKey: 'select',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'share',
    dataValue: 'share',
    dataKey: 'share',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'suspend',
    dataValue: 'suspend',
    dataKey: 'suspend',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'terminate',
    dataValue: 'terminate',
    dataKey: 'terminate',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'assessees',
    dataValue: 'assessees',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'reports',
    dataValue: 'reports',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const ASSESSMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION = [
  {
    data: 'allocate',
    dataValue: 'allocate',
    dataKey: 'allocate',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'archive',
    dataValue: 'archive',
    dataKey: 'archive',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'delete',
    dataValue: 'delete',
    dataKey: 'delete',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'flag',
    dataValue: 'flag',
    dataKey: 'flag',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'review',
    dataValue: 'review',
    dataKey: 'reviewKey',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'revise',
    dataValue: 'revise',
    dataKey: 'reviseKey',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'select',
    dataValue: 'select',
    dataKey: 'select',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'share',
    dataValue: 'share',
    dataKey: 'share',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'suspend',
    dataValue: 'suspend',
    dataKey: 'suspend',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'terminate',
    dataValue: 'terminate',
    dataKey: 'terminate',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'assessments',
    dataValue: 'assessments',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'reports',
    dataValue: 'reports',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const ASSIGNMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION = [
  {
    data: 'allocate',
    dataValue: 'allocate',
    dataKey: 'allocate',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'archive',
    dataValue: 'archive',
    dataKey: 'archive',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'delete',
    dataValue: 'delete',
    dataKey: 'delete',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'flag',
    dataValue: 'flag',
    dataKey: 'flag',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'review',
    dataValue: 'review',
    dataKey: 'reviewKey',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'revise',
    dataValue: 'revise',
    dataKey: 'reviseKey',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'select',
    dataValue: 'select',
    dataKey: 'select',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'share',
    dataValue: 'share',
    dataKey: 'share',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'suspend',
    dataValue: 'suspend',
    dataKey: 'suspend',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'terminate',
    dataValue: 'terminate',
    dataKey: 'terminate',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'assignments',
    dataValue: 'assignments',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'reports',
    dataValue: 'reports',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const ASSOCIATE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION = [
  {
    data: 'allocate',
    dataValue: 'allocate',
    dataKey: 'allocate',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'archive',
    dataValue: 'archive',
    dataKey: 'archive',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'delete',
    dataValue: 'delete',
    dataKey: 'delete',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'flag',
    dataValue: 'flag',
    dataKey: 'flag',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'review',
    dataValue: 'review',
    dataKey: 'reviewKey',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'revise',
    dataValue: 'revise',
    dataKey: 'reviseKey',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'select',
    dataValue: 'select',
    dataKey: 'select',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'share',
    dataValue: 'share',
    dataKey: 'share',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'suspend',
    dataValue: 'suspend',
    dataKey: 'suspend',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'terminate',
    dataValue: 'terminate',
    dataKey: 'terminate',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'associates',
    dataValue: 'associates',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'reports',
    dataValue: 'reports',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION = [
  {
    data: 'allocate',
    dataValue: 'allocate',
    dataKey: 'allocate',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'archive',
    dataValue: 'archive',
    dataKey: 'archive',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'delete',
    dataValue: 'delete',
    dataKey: 'delete',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'flag',
    dataValue: 'flag',
    dataKey: 'flag',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'review',
    dataValue: 'review',
    dataKey: 'reviewKey',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'revise',
    dataValue: 'revise',
    dataKey: 'reviseKey',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'select',
    dataValue: 'select',
    dataKey: 'select',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'share',
    dataValue: 'share',
    dataKey: 'share',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'suspend',
    dataValue: 'suspend',
    dataKey: 'suspend',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'terminate',
    dataValue: 'terminate',
    dataKey: 'terminate',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'reports',
    dataValue: 'reports',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const ALLOCATE_POPUP = [
  {
    data: 'assessees',
    dataValue: 'assessees',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'assessments',
    dataValue: 'assessments',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'assignments',
    dataValue: 'assignments',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'associates',
    dataValue: 'associates',
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
    disabled: false
  }
];
export const SHARE_POPUP = [
  {
    data: 'share',
    dataValue: 'shareApiCall',
    dataKey: 'SHARED',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'unshare',
    dataValue: 'unshareApiCall',
    dataKey: 'UNSHARED',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const ARCHIVE_POPUP = [
  {
    data: 'archive',
    dataValue: 'archiveApiCall',
    dataKey: 'ARCHIVED',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'unarchive',
    dataValue: 'unarchiveApiCall',
    dataKey: 'UNARCHIVED',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const DELETE_POPUP = [
  {
    data: 'no',
    dataValue: 'no',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'yes',
    dataValue: 'yesApiCall',
    dataKey: 'DELETED',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const FLAG_PUPUP = [
  {
    data: 'flag',
    dataValue: 'flagedApiCall',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'unflag',
    dataValue: 'unflagedApiCall',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const SELECT_PUPUP = [
  {
    data: 'select',
    dataValue: 'select',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'unselect',
    dataValue: 'unselect',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const SELECT_OPTION_PUPUP = [
  {
    data: 'select',
    dataValue: 'select',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'unselect',
    dataValue: 'unselect',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'all',
    dataValue: 'all',
    optionClass: 'optionSecondary',
    divider: 'light',
    disabled: false
  },
  { data: 'flaged', dataValue: 'flaged', optionClass: 'optionSecondary', disabled: false },
  {
    data: 'multiple',
    dataValue: 'multiple',
    optionClass: 'optionSecondary',
    divider: 'light',
    disabled: false
  },
  { data: 'hide', dataValue: 'hide', optionClass: 'optionSecondary', disabled: false },
  { data: 'unhide', dataValue: 'unhide', optionClass: 'optionSecondary', disabled: false }
];
export const FLAG_OPTION_PUPUP = [
  {
    data: 'flaged',
    dataValue: 'flaged',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'unflaged',
    dataValue: 'unflaged',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'all',
    dataValue: 'all',
    optionClass: 'optionSecondary',
    divider: 'light',
    disabled: false
  },
  { data: 'selected', dataValue: 'selected', optionClass: 'optionSecondary', disabled: false },
  {
    data: 'multiple',
    dataValue: 'multiple',
    optionClass: 'optionSecondary',
    divider: 'light',
    disabled: false
  },
  { data: 'hide', dataValue: 'hide', optionClass: 'optionSecondary', disabled: false },
  { data: 'unhide', dataValue: 'unhide', optionClass: 'optionSecondary', disabled: false }
];
export const SUSPEND_PUPUP = [
  {
    data: 'suspend',
    dataValue: 'suspendApiCall',
    dataKey: 'SUSPENDED',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'unsuspend',
    dataValue: 'unsuspendApiCall',
    dataKey: 'UNSUSPENDED',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const TERMINATE_PUPUP = [
  {
    data: 'terminate',
    dataValue: 'terminateApiCall',
    dataKey: 'TERMINATED',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'unterminate',
    dataValue: 'unterminateApiCall',
    dataKey: 'UNTERMINATED',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const PUBLISH_PUPUP = [
  {
    data: 'publish',
    dataValue: 'publish',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'unpublish',
    dataValue: 'unpublish',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const ASSESSEE_ASSOCIATE_TRIPPLE_DOT_POPUP_OPTION = [
  {
    data: 'allocate',
    dataValue: 'allocate',
    dataKey: 'allocate',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'archive',
    dataValue: 'archive',
    dataKey: 'archive',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'create',
    dataValue: 'create',
    dataKey: 'create',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'delete',
    dataValue: 'delete',
    dataKey: 'delete',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'flag',
    dataValue: 'flag',
    dataKey: 'flaged',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'review',
    dataValue: 'review',
    dataKey: 'reviewDistinct',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'select',
    dataValue: 'selection',
    dataKey: 'select',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'share',
    dataValue: 'share',
    dataKey: 'share',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'suspend',
    dataValue: 'suspend',
    dataKey: 'suspend',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'terminate',
    dataValue: 'terminate',
    dataKey: 'terminate',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'reports',
    dataValue: 'reports',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const ASSESSMENT_ASSIGNMENT_TRIPPLE_DOT_POPUP_OPTION = [
  {
    data: 'allocate',
    dataValue: 'allocate',
    dataKey: 'allocate',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'archive',
    dataValue: 'archive',
    dataKey: 'archive',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'create',
    dataValue: 'create',
    dataKey: 'create',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'delete',
    dataValue: 'delete',
    dataKey: 'delete',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'flag',
    dataValue: 'flag',
    dataKey: 'flaged',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'publish',
    dataValue: 'publish',
    dataKey: 'publish',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'review',
    dataValue: 'review',
    dataKey: 'reviewDistinct',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'select',
    dataValue: 'selection',
    dataKey: 'select',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'share',
    dataValue: 'share',
    dataKey: 'share',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'suspend',
    dataValue: 'suspend',
    dataKey: 'suspend',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'terminate',
    dataValue: 'terminate',
    dataKey: 'terminate',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'reports',
    dataValue: 'reports',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const TRIPPLE_DOT_POPUP_OPTION = [
  {
    data: 'allocate',
    dataValue: 'allocate',
    dataKey: 'allocate',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'archive',
    dataValue: 'archive',
    dataKey: 'archive',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'create',
    dataValue: 'create',
    dataKey: 'create',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'delete',
    dataValue: 'delete',
    dataKey: 'delete',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'flag',
    dataValue: 'flag',
    dataKey: 'flaged',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'review',
    dataValue: 'review',
    dataKey: 'reviewDistinctKey',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'select',
    dataValue: 'selection',
    dataKey: 'select',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'share',
    dataValue: 'share',
    dataKey: 'share',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'suspend',
    dataValue: 'suspend',
    dataKey: 'suspend',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'terminate',
    dataValue: 'terminate',
    dataKey: 'terminate',
    optionClass: 'optionPrimary',
    divider: 'dark',
    disabled: false
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  },
  {
    data: 'reports',
    dataValue: 'reports',
    dataKey: 'review',
    optionClass: 'optionPrimary',
    disabled: false
  }
];
export const LEFT_TRIPPLE_DOT_POPUP_OPTION = [
  {
    data: 'assent',
    dataValue: 'assent',
    optionClass: 'optionPrimary',
    disabled: true
  },
  {
    data: 'assistance',
    dataValue: 'assistance',
    optionClass: 'optionPrimary',
    disabled: true
  },
  {
    data: 'assumption',
    dataValue: 'assumption',
    optionClass: 'optionPrimary',
    disabled: true
  },
  {
    data: 'assurance',
    dataValue: 'assurance',
    optionClass: 'optionPrimary',
    disabled: true
  }
];
