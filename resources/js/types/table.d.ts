import { ReactNode } from "react";

export interface TableProps {
    name: string;
    header: Header[];
    data: Data;
    paginate?: ReactNode;
}

export interface Header {
    label: string;
    href?: string;
    action: "edit" | "delete" | undefined;
    "key-data": string | number;
}

export interface Data {
    current_page: number;
    data: {
        [key: string | number]: string;
    }[];
    first_page_url: string;
    from: any;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: any;
    path: string;
    per_page: number;
    prev_page_url: any;
    to: any;
    total: number;
}

export interface Link {
    url?: string;
    label: string;
    active: boolean;
}
