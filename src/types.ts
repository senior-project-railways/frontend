export interface AccountResponse {
    user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      full_name: string;
      is_active: boolean;
      is_staff: boolean;
      created: Date;
      updated: Date;
    };
    access: string;
    refresh: string;
  }