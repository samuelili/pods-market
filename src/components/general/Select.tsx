import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import Button from '@/components/buttons/Button.tsx';
import { IconChevronDown } from '@tabler/icons-react';
import styles from './Select.module.css';

export type SelectProps = {
  value: string | undefined | null;
  defaultValue?: string | undefined | null;
  onChange: () => void;
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
};

const Select = ({ options, placeholder, value, defaultValue }: SelectProps) => {
  return (
    <Listbox value={value} defaultValue={defaultValue}>
      <ListboxButton as={Button}>
        {value ?? placeholder ?? 'Select a value...'} <IconChevronDown />
      </ListboxButton>
      <ListboxOptions className={styles.Options} anchor={"bottom start"}>
        {options.map((option) => (
          <ListboxOption value={option.value} key={option.value} className={styles.Option}>
            {option.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};

export default Select;
