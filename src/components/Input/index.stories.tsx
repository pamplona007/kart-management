import type { Meta, StoryObj } from '@storybook/preact';

import Input from '.';

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
        },
        placeholder: {
            control: 'text',
        },
        disabled: {
            control: 'boolean',
        },
        readonly: {
            control: 'boolean',
        },
        value: {
            control: 'text',
        },
        type: {
            options: ['text', 'password', 'email', 'number', 'tel', 'url', 'date', 'time', 'datetime-local'],
            control: 'select',
        },
        highlight: {
            control: 'boolean',
        },
    },
};
export default meta;

export const Primary: Story = {
    args: {
        label: 'Name',
        placeholder: 'Enter your name',
    },
};

export const Disabled: Story = {
    args: {
        ...Primary.args,
        disabled: true,
    },
};

export const Readonly: Story = {
    args: {
        ...Primary.args,
        readonly: true,
    },
};

export const Highlight: Story = {
    args: {
        ...Primary.args,
        highlight: true,
    },
};
