import React from 'react';
import { Box } from 'rebass';

import { Checkbox, Input, Label } from '@rebass/forms';

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

export const JInput = ({ id, label, onChange, ...props }: any) => {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        {...props}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.currentTarget.value);
        }}
      />
    </>
  );
};

export const JCheckBox = ({ id, label, onChange, ...props }: any) => {
  return (
    <Label htmlFor={id} p={2}>
      <Checkbox
        id={id}
        {...props}
        checked={props.value === 'true'}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.currentTarget.checked ? 'true' : 'false');
        }}
      />
      {label}
    </Label>
  );
};
