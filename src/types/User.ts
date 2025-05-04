export enum ContactType {
  EMAIL = 'email',
  PHONE = 'phone',
  FACEBOOK = 'facebook',
  DISCORD = 'discord',
  INSTAGRAM = 'instagram',
}

export type User = {
  uid: string;
  name: string;
  avatar: string | null;
  contacts: Partial<Record<ContactType, string>>;
  pods: string[];
};
