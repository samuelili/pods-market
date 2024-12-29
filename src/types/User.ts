export type User = {
  uid: string;
  name: string;
  avatar: string | null;
  contacts: {
    email?: string;
    phone?: string;
    facebook?: string;
    discord?: string;
  };
  pods: string[];
};
