import { Outlet, useMatches, useSearch } from '@tanstack/react-router';
import styles from '@/components/Root.module.css';
import Navbar from '@/components/navbar/Navbar.tsx';
import ListingPage from './listing/ListingPage';

const AuthenticatedLayout = () => {
  const search = useSearch({
    strict: false,
  });
  const matches = useMatches();
  const isShopping =
    matches.find((match) => match.id.includes('/_authenticated/_shopping')) !==
    undefined;
  const showPost = isShopping && (search?.postId?.length ?? 0) > 0;
  const showUser = (search?.userId?.length ?? 0) > 0;
  const showAdditionalContent = showPost || showUser;

  return (
    <>
      <div className={styles.Root} data-additional={showAdditionalContent}>
        <Navbar className={styles.Navbar} />
        <div className={styles.Content}>
          <Outlet />
        </div>

        {showAdditionalContent && (
          <div className={styles.AdditionalContent}>
            <ListingPage />
          </div>
        )}
      </div>
    </>
  );
};

export default AuthenticatedLayout;
