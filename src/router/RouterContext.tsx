import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';

interface RouterContextValue {
  pathname: string;
  navigate: (to: string, options?: {hash?: string}) => void;
  isActive: (path: string, exact?: boolean) => boolean;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function normalizePath(path: string): string {
  const clean = path.split('?')[0].split('#')[0] || '/';
  if (clean.length > 1 && clean.endsWith('/')) {
    return clean.slice(0, -1);
  }
  return clean;
}

export const RouterProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'
  );

  useEffect(() => {
    const onPopState = () => {
      setPathname(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback(
    (to: string, options?: {hash?: string}) => {
      const [rawPath, inlineHash] = to.split('#');
      const targetPath = normalizePath(rawPath || '/');
      const targetHash = options?.hash || inlineHash;

      if (targetPath !== pathname) {
        const nextUrl = targetHash ? `${targetPath}#${targetHash}` : targetPath;
        window.history.pushState({}, '', nextUrl);
        setPathname(targetPath);
      } else if (targetHash) {
        window.history.replaceState({}, '', `${targetPath}#${targetHash}`);
      }

      if (targetHash) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const el = document.getElementById(targetHash);
            if (el) {
              el.scrollIntoView({behavior: 'smooth'});
            }
          }, 60);
        });
      } else {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    },
    [pathname]
  );

  const isActive = useCallback(
    (path: string, exact = false) => {
      const target = normalizePath(path);
      if (exact || target === '/') {
        return pathname === target;
      }
      return pathname === target || pathname.startsWith(`${target}/`);
    },
    [pathname]
  );

  return (
    <RouterContext.Provider value={{pathname, navigate, isActive}}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used inside a RouterProvider');
  }
  return ctx;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export const Link: React.FC<LinkProps> = ({to, onClick, children, ...rest}) => {
  const {navigate} = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0 ||
      rest.target === '_blank'
    ) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
