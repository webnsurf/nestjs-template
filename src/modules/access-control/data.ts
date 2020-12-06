import { UserRole } from 'src/modules/user/model';

export const accessControl = {
  organisation: {
    editUsers: [UserRole.ADMIN],
  },
};
