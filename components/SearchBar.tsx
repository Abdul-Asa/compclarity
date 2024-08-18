'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

interface SearchBarProps {
    isCompanyPage: Boolean;
    isForJob?: Boolean;
}

export default function SearchBar({ isCompanyPage, isForJob } : SearchBarProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((searchTerm: string) => {
        searchTerm = searchTerm.trim();
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
            params.set('page', '1');
            params.set('search', searchTerm.toLowerCase());
        } else {
            params.set('page', '1');
            params.delete('search');
            params.delete("sortBy");
            params.delete("sortDir");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300)

    return (
        <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <input 
                    type="text" 
                    id="table-search" 
                    className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-64 sm:w-75 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder={isForJob ? (isCompanyPage ? "Search City or Role" : "Search Company, City or Role") : (isCompanyPage ? "Search City" : "Search Company or City")}
                    defaultValue={searchParams.get('search')?.toString()}
                    onChange={e => {
                        handleSearch(e.target.value);
                    }}/>
        </div>
    );
}