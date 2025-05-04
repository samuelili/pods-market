import Button from '@/components/buttons/Button.tsx';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import Select from '@/components/general/Select.tsx';
import { ContactType, User } from '@/types/User.ts';
import { useCallback, useMemo, useState } from 'react';

const ContactInformationEdit = ({
  value,
  onChange,
}: {
  value: User['contacts'];
  onChange: (value: User['contacts']) => void;
}) => {
  const [showNewField, setShowNewField] = useState(false);

  const handleContactChange = useCallback(
    ({
      contactType,
      value: contactValue,
    }: {
      contactType: ContactType;
      value: string;
    }) => {
      onChange({
        ...value,
        [contactType]: contactValue,
      });
    },
    [value, onChange],
  );

  const handleRemoveContactField = useCallback(
    (contactType: ContactType | undefined) => {
      if (!contactType) return;

      const newValue = { ...value };
      delete newValue[contactType];

      onChange(newValue);
    },
    [value, onChange],
  );

  return (
    <div className={'flex flex-col gap-2'}>
      {Object.entries(value).map(([contactType, value]) => (
        <ContactRow
          contactType={contactType as ContactType}
          value={value}
          onChange={handleContactChange}
          onRemove={handleRemoveContactField}
          existingContacts={[]}
        />
      ))}

      {showNewField && (
        <ContactRow
          contactType={undefined}
          value={''}
          onChange={(val) => {
            setShowNewField(false);
            handleContactChange(val);
          }}
          onRemove={() => {
            setShowNewField(false);
          }}
          existingContacts={[]}
        />
      )}

      <div className={'flex items-center justify-end gap-2'}></div>
      {!showNewField && (
        <Button
          type={'button'}
          className={'self-end'}
          onClick={() => setShowNewField(true)}
        >
          <IconPlus />
          Add
        </Button>
      )}
    </div>
  );
};

const ContactRow = ({
  contactType,
  value,
  onChange,
  onRemove,
  existingContacts,
}: {
  contactType: ContactType | undefined;
  value: string;
  onChange: (value: { contactType: ContactType; value: string }) => void;
  onRemove: (contactType: ContactType | undefined) => void;
  existingContacts: string[];
}) => {
  const filteredContacts = useMemo(() => {
    return [
      {
        label: 'Discord',
        value: 'discord',
      },
      {
        label: 'Instagram',
        value: 'instagram',
      },
      {
        label: 'Facebook',
        value: 'facebook',
      },
      {
        label: 'Phone Number',
        value: 'phone',
      },
      {
        label: 'Email',
        value: 'email',
      },
    ].filter((o) => existingContacts.includes(o.label));
  }, []);

  return (
    <div className={'flex items-center gap-2'}>
      <Select
        value={contactType}
        options={filteredContacts}
        onChange={(contactType) =>
          onChange({
            contactType: contactType as ContactType,
            value,
          })
        }
        placeholder={'Select a contact type'}
      />
      <input
        disabled={contactType === undefined}
        value={value}
        onChange={(e) =>
          contactType !== undefined &&
          onChange({
            contactType,
            value: e.currentTarget.value,
          })
        }
      />
      <Button type={'button'} onClick={() => onRemove(contactType)}>
        <IconTrash />
      </Button>
    </div>
  );
};

export default ContactInformationEdit;
