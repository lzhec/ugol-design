export interface UserLayer {
    isOrdered: boolean;
    status: UserRequestStatus;
    project_id?: number;
}

export enum UserRequestStatus {
    NEW = 'new',
    REVIEW = 'review',
    HANDLED = 'handled',
    IN_WORK = 'in_work',
    DONE = 'done',
    CANCEL = 'cancel',
}
export interface UserModel {
    id?: number;
    email?: string;
    type: UserTypes;
    alerts?: boolean;
    subscribe?: boolean;
    order: { count: number };
    contact_id?: number;
    favorite: { count: number };
    project: { count: number };
    onboarding?: {
        show_editor_welcome?: boolean;
        editorStart?: boolean;
    } | any;
    avatar?: any;
    addresses?: any[];
    email_confirm?: boolean;
    // Form fields
    phone?: any;
    last_name?: string;
    first_name?: string;
    middle_name?: string;
    password?: any;
    password_old?: any;
    confirm?: any;
    layer?: UserLayer;
    request?: {
        countDesign: number,
        countLayout: number,
        activeProjectId?: number
    };
    settings?: {
        can_edit_lookbook: boolean
    };
    is_company?: boolean;
    uuid: string | null;
}

export enum UserTypes {
    GUEST = 'guest',
    WORKER = 'worker',
    PROVIDER = 'provider',
    CLIENT = 'client',
    EXPERT = 'expert',
    DESIGNER = 'designer',
    MPK = 'mpk',
    COMPANY = 'company',
    WORK_MANAGER = 'work_manager',
}
