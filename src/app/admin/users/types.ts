import { AdminUser } from '../../../services/adminService';

export interface EditUserFormData {
    username: string;
    email: string;
}

export interface ModalState {
    editUser: boolean;
    resetPassword: boolean;
    disableConfirm: boolean;
}

export type { AdminUser };
