export interface Sort {
    dir: 'asc' | 'desc' | '';
    prop: string;
}

export interface SortChange {
    column: any;
    newValue: string;
    prevValue: string;
    sorts: Sort[];
}