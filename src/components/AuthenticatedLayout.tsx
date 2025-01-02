import {Outlet, useSearch} from "@tanstack/react-router";
import styles from "@/components/Root.module.css";
import Navbar from "@/components/navbar/Navbar.tsx";
import ListingDetailContent from "@/components/listing/ListingDetailContent.tsx";
import djungelksogImg from "@/assets/images/djungelskog.png";

const AuthenticatedLayout = () => {
  const search = useSearch({
    strict: false,
  });
  const showPost = (search?.postId?.length ?? 0) > 0;
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
            <ListingDetailContent
              imageSrc={djungelksogImg}
              name={'Djungelskog'}
              price={16}
              description={'very fluffy very soft lovely'}
              sellerName={'Samuel Li'}
              podName={'Pod'}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AuthenticatedLayout;