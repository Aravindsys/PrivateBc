import {Block} from './block';
export interface BcConfig {
     id: string;
     name: string;
     admin_username: string;
     password: string;
     confirm_password: string;
     users: string;
     organisation: string;
     blocks: Block[];
     updatedAt: Date;
     createdAt: Date;
}