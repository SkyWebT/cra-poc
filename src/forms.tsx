import React from 'react';
import { Field } from 'react-jeff';
import { Box, Text } from 'rebass';

import { Checkbox, Input, Label, Select } from '@rebass/forms';

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export function validateUsername(value: string) {
  let errs = [];
  if (value.length < 3) errs.push('Must be at least 3 characters long');
  if (!/^[a-z0-9_-]*$/i.test(value))
    errs.push(
      'Must only contain alphanumeric characters or dashes/underscores'
    );
  if (!/^[a-z0-9]/i.test(value))
    errs.push('Must start with alphanumeric character');
  if (!/[a-z0-9]$/i.test(value))
    errs.push('Must end with alphanumeric character');
  return errs;
}

export function validatePassword(value: string) {
  let errs = [];
  if (value.length < 6) errs.push('Must be at least 6 characters long');
  if (!/[a-z]/.test(value))
    errs.push('Must contain at least one lowercase letter');
  if (!/[A-Z]/.test(value))
    errs.push('Must contain at least one uppercase letter');
  if (!/[0-9]/.test(value)) errs.push('Must contain at least one number');
  return errs;
}

export interface ControlProps<Val> {
  children: React.ReactNode;
  field: Field<Val>;
}

export function Control<Val>(props: ControlProps<Val>) {
  return (
    <Box>
      {props.children}
      {props.field.dirty && (
        <>
          {props.field.errors && (
            <ul className="control-error">
              {props.field.errors.map(err => {
                return (
                  <li key={err}>
                    <Text color="red">{err}</Text>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </Box>
  );
}

export const JForm = ({ onSubmit, ...props }: any) => {
  return (
    <Box
      as="form"
      {...props}
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
      }}
      py={3}
    />
  );
};

export const JInput = ({
  id,
  label,
  onChange,
  ...props
}: Partial<Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'value'>> &
  PropType<Field<string>, 'props'>) => {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        {...props}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange && onChange(event.currentTarget.value);
        }}
      />
    </>
  );
};

export const JSelect = ({
  id,
  label,
  options,
  onChange,
  ...props
}: Partial<Omit<React.HTMLProps<HTMLSelectElement>, 'onChange' | 'value'>> &
  PropType<Field<string>, 'props'> & {
    options: { value: string; text: string }[];
  }) => {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Select
        id={id}
        {...props}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          onChange && onChange(event.currentTarget.value);
        }}
      >
        {options.map(option => (
          <option value={option.value}>{option.text}</option>
        ))}
      </Select>
    </>
  );
};

export const JCheckBox = ({
  id,
  label,
  onChange,
  ...props
}: Partial<Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'value'>> &
  PropType<Field<boolean>, 'props'>) => {
  return (
    <Label htmlFor={id} p={2}>
      <Checkbox
        id={id}
        {...props}
        checked={props.value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.currentTarget.checked);
        }}
      />
      {label}
    </Label>
  );
};
