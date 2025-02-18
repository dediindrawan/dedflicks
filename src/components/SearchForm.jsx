import { forwardRef } from 'react';
import { Search } from 'lucide-react';

export const SearchForm = forwardRef(({ onChange, ...props }, ref) => {
  return (
    <>
      <form {...props}>
        <label htmlFor="search-form">
          <Search size={16} />{' '}
        </label>
        <input type="search" placeholder="Search..." onChange={onChange} ref={ref} autoFocus />
      </form>
    </>
  );
});
