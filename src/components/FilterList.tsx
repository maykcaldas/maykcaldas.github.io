import {
  Fragment,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

const useBrowserLayoutEffect =
  typeof document === 'undefined' ? useEffect : useLayoutEffect;

export function matchesFilter(
  text: string,
  itemCategory: string,
  query: string,
  category: string,
) {
  return (
    (category === 'all' || itemCategory === category) &&
    text.toLowerCase().includes(query.trim().toLowerCase())
  );
}

interface FilterListProps<T> {
  items: T[];
  label: string;
  placeholder: string;
  categories: string[];
  getKey: (item: T) => string;
  getSearch: (item: T) => string;
  getCategory: (item: T) => string;
  renderItem: (item: T, index: number, hidden: boolean) => ReactNode;
  className?: string;
  emptyMessage: string;
}

export function FilterList<T>({
  items,
  label,
  placeholder,
  categories,
  getKey,
  getSearch,
  getCategory,
  renderItem,
  className,
  emptyMessage,
}: FilterListProps<T>) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const id = useId();
  const container = useRef<HTMLDivElement>(null);
  const scrollTarget = useRef<string | null>(null);
  const visibility = items.map((item) =>
    matchesFilter(getSearch(item), getCategory(item), query, category),
  );

  useEffect(() => {
    const revealAnchor = () => {
      let anchor: string;
      try {
        anchor = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(anchor);
      if (target?.hidden && container.current?.contains(target)) {
        scrollTarget.current = anchor;
        setQuery('');
        setCategory('all');
      }
    };
    window.addEventListener('hashchange', revealAnchor);
    return () => window.removeEventListener('hashchange', revealAnchor);
  }, []);

  useBrowserLayoutEffect(() => {
    if (scrollTarget.current) {
      document.getElementById(scrollTarget.current)?.scrollIntoView();
      scrollTarget.current = null;
    }
  }, [query, category]);

  const count = visibility.filter(Boolean).length;
  return (
    <div ref={container}>
      <div className="filter-controls">
        <div className="search-field">
          <label htmlFor={`${id}-search`}>Search {label}</label>
          <input
            id={`${id}-search`}
            type="search"
            placeholder={placeholder}
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="category-field">
          <label htmlFor={`${id}-category`}>Topic</label>
          <select
            id={`${id}-category`}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">All topics</option>
            {categories.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
        <p className="result-count mono" role="status" aria-live="polite">
          {count} of {items.length} shown
        </p>
      </div>
      <div className={className}>
        {items.map((item, index) => (
          <Fragment key={getKey(item)}>
            {renderItem(item, index, !visibility[index])}
          </Fragment>
        ))}
      </div>
      <p className="empty-state" hidden={count > 0}>
        {emptyMessage}
      </p>
    </div>
  );
}
