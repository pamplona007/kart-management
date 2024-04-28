export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ColSizeProp = number | { span?: number; order?: number; offset?: number };
export type RowSizeProp = number | {
    justify?: 'start' | 'end' | 'center' | 'around' | 'between';
    align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
};

export const sizes: Size[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
