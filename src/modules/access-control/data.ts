import { UserRole } from 'src/modules/user/model';

export const accessControl = {
  organisation: {
    delete: [UserRole.ADMIN],
    editUsers: [UserRole.ADMIN],
  },
};
