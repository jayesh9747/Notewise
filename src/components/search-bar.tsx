"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SearchBar({
    placeholder = "Search...",
    param,
    fields,
}: {
    placeholder?: string;
    param: string;
    fields?: string[];
}) {
    return (
        <Suspense>
            <SearchBarContent
                placeholder={placeholder}
                param={param}
                fields={fields}
            />
        </Suspense>
    );
}

const SearchBarContent = ({
    placeholder = "Search...",
    param,
    fields,
}: {
    placeholder?: string;
    param: string;
    fields?: string[];
}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [query, setQuery] = useState(searchParams.get(param) || "");

    const handleSearch = (query: string) => {
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set(param, query);
        } else {
            params.delete(param);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2">
            {fields && fields.length && (
                <Select>
                    <SelectTrigger className="w-fit bg-white">
                        <SelectValue placeholder="Search by" />
                    </SelectTrigger>
                    <SelectContent>
                        {fields.map((field) => (
                            <SelectItem key={field} value={field}>
                                {field}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            <div className="relative w-full">
                <Input
                    placeholder={placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setQuery(e.target.value);
                        handleSearch(e.target.value);
                    }}
                    className="bg-white rounded-lg pl-7"
                    value={query}
                />
                <Search
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={14}
                />
            </div>
        </div>
    );
};
