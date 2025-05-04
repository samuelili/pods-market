import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import Button from '@/components/buttons/Button.tsx';
import { IconChevronDown } from '@tabler/icons-react';
import styles from './Select.module.css';
import { useMemo } from 'react';

export type SelectProps<OptionType> = {
  value: OptionType | undefined | null;
  defaultValue?: OptionType | undefined | null;
  onChange: (value: OptionType | undefined | null) => void;
  options: {
    label: string;
    value: OptionType;
  }[];
  placeholder?: string;
};

const Select = <OptionType,>({
  options,
  placeholder = 'Select a value...',
  value,
  onChange,
  defaultValue,
}: SelectProps<OptionType>) => {
  const selectedLabel = useMemo(() => {
    for (const option of options) {
      if (option.value === value) return option.label;
    }

    return null;
  }, [value, options]);

  return (
    <Listbox value={value} defaultValue={defaultValue} onChange={onChange}>
      <ListboxButton as={Button} className={styles.Button}>
        {selectedLabel ?? placeholder?.toString()}
        <IconChevronDown />
      </ListboxButton>
      <ListboxOptions className={styles.Options} anchor={'bottom start'}>
        {options.map((option) => (
          <ListboxOption
            value={option.value}
            key={option.value?.toString()}
            className={styles.Option}
          >
            {option.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};

export default Select;
